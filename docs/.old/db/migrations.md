---
id: dbmigrations
title: Database Migrations
sidebar_label: Migrations
---

Graphback uses [graphql-migrations](https://www.npmjs.com/package/graphql-migrations) to automatically create and update tables from a GraphQL schema.

## Compatibility

- PostgreSQL (create and update database)
- SQLite (create database only)

## Usage

### API

The `migrateDB` method creates and updates your tables and columns to match your GraphQL schema.

All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.

```ts
import { migrateDB } from 'graphql-migrations';

const dbConfig = {
  // Knex.js based configuration
};

migrateDB(dbConfig, schemaText, {
  // Additional options
}).then((ops) => {
    console.log(ops);
});
...
```

### Migration Options

- `config`: database configuration options.
- `schemaText`: GraphQL schema text.
- `options`:
  - `updateComments`: overwrite comments on table and columns.
  - `scalarMap`: Custom scalar mapping. Default: `null`.
  - `mapListToJson`: Map scalar lists to JSON column type by default.
  - `debug`: display debugging information and SQL queries.
  - `removeDirectivesFromSchema`: Strips all directives from schema before processing.
  - `operationFilter`: Filter out database operations that we don't want, e.g. prevent table deletion.
  - All other options are not currently supported by Graphback.

## Defining your data model

#### Primary key

Each type must have a primary key. The primary key field must be `id` and the type must be `ID`.

```gql
type Note {
  id: ID!
  title: String!
}
```

#### Foreign keys

##### OneToOne

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
  @oneToOne key: 'user_id'
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

##### OneToMany

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany field: 'note'
  """
  comments: [Comment]
}
```

This creates a relationship between `Note.comments` and `Comment.note` and maps to `comment.noteId` in the database. If `Comment.note` does not exist it will be generated for you.

With the `key` annotation you can customise the database column to map to.

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany field: 'note', key: 'note_id'
  """
  comments: [Comment]
}
```

This maps to `comment.note_id` in the database.

##### ManyToMany

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
  @oneToMany field: 'note'
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
  @oneToMany field: 'author'
  """
  notes: [NoteAuthor]
}
```

#### Default field value

You can specify a default value using the `@default` field annotation as shown below.

```graphql
type Note {
  id: ID!
  title: String!
  """
  @default(value: false)
  """
  complete: Boolean
}
```

#### Custom column type

```graphql
type Note {
  id: ID!
  """
  @db(type: 'string', length: 100)
  """
  title: String!
}
```

#### Changing column names in Graphback

When working with database migration library it is possible to change individual database columns.
Using custom column will require manual mapping in resolver or database layer. 

```graphql
type Note {
  id: ID!
  """
  @db.name: 'note_title'
  """
  title: String!
}
```

When using custom name in database we need to map it directly inside resolver or db layer.

```ts
      // In your data provider
      data.title = data['note_title']
      return data;
    }
```

> NOTE: To be able to fully use Graphback, it is recommended that your data models objects to have `id: ID!` field 
or a primary key field specified with the `@id` annotation.