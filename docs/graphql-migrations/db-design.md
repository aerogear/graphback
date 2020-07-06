---
id: db-design
title: Database Design
sidebar_label: Database Design
---

GraphQL Migrations operates on business models defined in your schema: These are GraphQL types decorated with a [`@model`](../model/datamodel#model) annotation. 


### Primary key

Each type must have a primary key. You can specify one are one using the [`@id`](../model/annotations#id) annotation on a field.

```graphql
type Note {
  """
  custom primary key on a note
  @id  
  """
  reference: String!
  
  title: String!
}
```

Alternatively, you can use auto-incremented primary keys by having an `id` field which mus be of type `ID`.

```graphql
type Note {
  id: ID!
  title: String!
}
```

### Nullability

GraphQL Migrations packages automatically adds a `NOT NULL` constraint to all non null fields defined in the business model. 
All primary keys are not nullable, irrespective of whether they are defined as non null or not. 

```graphql
type Note {
  """
  custom primary key on a note
  @id  
  """
  reference: String!
  
  title: String!
}
```

The above model definition will result in the following table being created: 
```sql
\d note
              Table "public.note"
  Column   |          Type          | Modifiers 
-----------+------------------------+-----------
 reference | character varying(255) | not null
 title     | character varying(255) | not null
Indexes:
    "note_pkey" PRIMARY KEY, btree (reference)
```

### Foreign keys

GraphQL Migrations will automatically create and index foreign keys once it sees relationships between business models.

#### OneToOne

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne
  """
  user: User!
}

"""
@model
"""
type User {
  id: ID!
  name: String
}
```

This creates a relationship via a `userId` column in the `profile` table. You can customize the key tracking the relationship with the `key` annotation:

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne(key: 'user_id')
  """
  user: User!
}

"""
@model
"""
type User {
  id: ID!
  name: String
}
```

This maps `Profile.user` to `profile.user_id` in the database.

#### OneToMany

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]
}
```

This specifies a relationship between `Note.comments` and `Comment.note` and maps to `comment.noteId` in the database. 

With the `key` annotation you can customise the database column to map to.

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany(field: 'note', key: 'note_id')
  """
  comments: [Comment]
}
```

This maps to `comment.note_id` in the database.

#### ManyToMany

To create a many-to-many relationship, add a model for your join table and use two one-to-many relationship mappings to create the relationship.

```graphql
""" 
@model 
"""
type Note {
  id: ID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  authors: [NoteAuthor]
}

"""
@model
"""
type NoteAuthor {
  id: ID!
}

"""
@model
"""
type User {
  id: ID!
  name: String
  """
  @oneToMany(field: 'author')
  """
  notes: [NoteAuthor]
}
```

Let's see all of these in an example code below ran agains the PostgreSQL database:

```ts
import { migrateDB } from 'graphql-migrations';

const schemaText = ```
""" @model """
type Note {
  id: ID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]!
}

""" @model """
type Comment {
  """
  @id
  """
  text: String
  description: String
}
```;

const dbConfig = {
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: "localhost",
      port: 5432
    },
    pool: { min: 5, max: 30 }
};

migrateDB(dbConfig, schemaText, {
  // Additional options
}).then((ops) => {
    console.log(ops);
});
...
```

This is a classic business model containing two types: `Note` and `Comment`, having a `oneToMany` relationship between them.
From the relationship definition we can deduce that a `Note` can have zero or many comments, inversely a `Comment` can be about
one `Note`.

Upon successfuly completion, the above migration will create the following layout in your database schema.

```sql
              List of relations
 Schema |    Name     |   Type   |   Owner    
--------+-------------+----------+------------
 public | comment     | table    | postgresql
 public | note        | table    | postgresql
 public | note_id_seq | sequence | postgresql
(3 rows)
```

We can see notice that we have the `note_id_seq` but not `comment_id_seq`, this is because we are using auto-incremented 
primary key for the `Note` model and a custom primary key for the `Comment` model. We will see how these looks like in details 
for each model below:

```sql
\d comment
              Table "public.comment"
   Column    |          Type          | Modifiers 
-------------+------------------------+-----------
 text        | character varying(255) | not null
 description | character varying(255) | 
 noteId      | integer                | 
Indexes:
    "comment_pkey" PRIMARY KEY, btree (text)
Foreign-key constraints:
    "comment_noteid_foreign" FOREIGN KEY ("noteId") REFERENCES note(id)
```

Table details for the `Comment` type shows that we have a `text` as the primary key and `noteId` as a foreign key on the `Note` type because of the relationship we defined. 

Here is how the `Note` table looks like:

```sql
\d note
                                   Table "public.note"
   Column    |          Type          |                     Modifiers                     
-------------+------------------------+---------------------------------------------------
 title       | character varying(255) | not null
 description | character varying(255) | 
 id          | integer                | not null default nextval('note_id_seq'::regclass)
Indexes:
    "note_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "comment" CONSTRAINT "comment_noteid_foreign" FOREIGN KEY ("noteId") REFERENCES note(id)
```

GraphQL Migrations created the auto-incremented primary key by inferring the usage of `id: ID!` field on the `Note` model.
Additionally we can see that this primary key is referenced by the `comment` table because of the relationship.


### Default field value

You can specify a default value using the `@default` field annotation as shown below.

```graphql
type Note {
  id: ID!
  title: String!
  """
  Define a default value
  @default(value: false)
  """
  complete: Boolean
}
```

### Custom column type

You can specify a custom type usig the `@db` field annotation as shown below:

```graphql
type Note {
  id: ID!
  """
  Define a custom json type
  @db(type: 'json')
  """
  comments: [Comment]
}

type Comment {
  text: String
  description: String
}
```

### Column length

By default string columns will be created as `varchar` with a column length of `255`. 
This can be configured to any length using the `@db` field annnotation and the `length` argument:

```graphql
type Note {
  id: ID!
  """
  Define custom column length
  @db(length: 100)
  """
  title: String!
}
```

### Ignore a field 

Sometimes our business model can contain more fields and some of these fields may only be there for representation purposes.
We can safely ignore generating columns for these fields using the `@db(skip: true)` annotation on the corresponding field. 

```graphql
type Note {
  id: ID!
  """
  Define custom column length
  @db(skip: true)
  """
  title: String!
}
```
:::caution
This annotation is not supported by Graphback CRUD.
:::

### Column name

When working with database migration library it is possible to change individual database columns.

```graphql
type Note {
  id: ID!
  """
  @db(name: 'note_title')
  """
  title: String!
}
```

:::caution
This annotation is not supported by Graphback CRUD.
When using custom name in database we need to map it directly inside resolver or db layer.

```ts
      // In your data provider
      data.title = data['note_title']
      return data;
    }
```
:::


### Index

The `@index` annotation can be used to create an index on a specific field. This annotation takes `name` as argument representing 
the name of the created index. If the name argument is left out, GraphQL Migrations will create one for you using the `<tablename>_<columnName>_index` format.

For example:

```graphql
"""
@model
"""
type Comment {
  id: ID!
  """
  @index(name: "title-index")
  """
  text: String!
  """
  @index
  """
  description: String
}
```

The above model will result in the following indexes being created

```sql
\d comment
                                   Table "public.comment"
   Column    |          Type          |                       Modifiers                       
-------------+------------------------+-------------------------------------------------------
 text        | character varying(255) | not null
 description | character varying(255) | 
 id          | integer                | not null default nextval('comment_id_seq'::regclass)
Indexes:
    "comment_pkey" PRIMARY KEY, btree (id)
    "comment_description_index" btree (description)
    "title-index" btree (text)
```


### Unique

The `@unique` annotation can be used to create an unique constraint on a specific field. GraphQL Migrations will create the constraint name
using the `<tablename>_<columnName>_unique` format.

For example:

```graphql
"""
@model
"""
type Comment {
  id: ID!
  """
  @unique
  """
  text: String
}
```

The above model will result in the following constraint being created

```sql
\d comment
                                   Table "public.comment"
   Column    |          Type          |                       Modifiers                       
-------------+------------------------+-------------------------------------------------------
 text        | character varying(255) | 
 id          | integer                | not null default nextval('comment_id_seq'::regclass)
Indexes:
    "comment_pkey" PRIMARY KEY, btree (id)
    "comment_text_unique" UNIQUE CONSTRAINT, btree (text)
```
