---
id: annotations
title: Annotations
sidebar_label: Annotations
---

### @model

The `@model` annotation is at the core of the Graphback's model definition syntax. It tells Graphback if a type should be considered part of the data model i.e. a table in a relational database or a collection in MongoDB.

It also tells Graphback about what queries and mutations it needs to generate for a type. For Graphback to autogenerate type definitions and resolvers, there must be at least one type annotated with `@model`.

Let's have a look at a simple `Note` data model.

```graphql
"""
@model
"""
type Note {
  id: ID!
  text: String
  description: String
}
```

This will generate all the API definitions, resolvers, services and data providers.

```graphql
"""
@model
"""
type Note {
  id: ID!
  text: String
  description: String
}

// highlight-start
type Query {
  getNote(id: ID!): Note
  findNotes(filter: NoteFilter, page: PageRequest, orderBy: OrderByInput): NoteResultList!
}

type Mutation {
  createNote(input: CreateNoteInput!): Note
  updateNote(input: MutateNoteInput!): Note
  deleteNote(input: MutateNoteInput!): Note
}

type Subscription {
  newNote(filter: NoteSubscriptionFilter): Note!
  updatedNote(filter: NoteSubscriptionFilter): Note!
  deletedNote(filter: NoteSubscriptionFilter): Note!
}
// highlight-end
```

You can customise what gets generated per model by adding [arguments](#arguments). This example tells Graphback to generate all resolvers _except_ the `deleteNote` mutation and `deletedNote`.

```graphql
"""
@model(
  delete: false
)
"""
type Note {
  id: ID!
  text: String
  description: String
}
```

#### Arguments

| Argument | Description | Example |
|-|-|-|
| `create` | Optionally specifies whether a `create` mutation is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(create: false)` |
| `delete` | Optionally specifies whether a `delete` mutation is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(delete: true)` |
| `find` | Optionally specifies whether a `find` query is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(find: false)` |
| `findOne` | Optionally specifies whether a `findOne` query is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(findOne: false)` |
| `update` | Optionally specifies whether a `update` mutation is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(update: true)` |
| `subCreate` | Optionally specifies whether a `new` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subCreate: false)` |
| `subUpdate` | Optionally specifies whether an `updated` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subUpdate: false)` |
| `subDelete` | Optionally specifies whether a `deleted` subscription is to be generated. Supported values: `true`, `false`. Defaults to `true` | `@model(subDelete: false)` |

### @oneToMany

`@oneToMany` is used to define a One To Many relationship.

```graphql
"""model"""
type User {
  id: ID!
  """@oneToMany(field: 'author')"""
  posts: [Post]!
}

"""@model"""
type Post {
  id:ID!
  text: String!
}
```

This will generate the an `author` field on the `Post` to model to enable bidirectional querying.

```graphql
"""@model"""
type Post {
  id: ID!
  text: String!
  // highlight-next-line
  author: User
}
```

#### Arguments

| Argument | Description | Example |
|-|-|-|
|`field`| Specifies the name of resolver field on the foreign object. **Required**. Accepts a string value | `@oneToMany(field: 'user'`)|
|`key`| Optionally specifies the name of foreign key field on the foreign object. Accepts a string value. Defaults to `<typeName>Id` | `@oneToMany(field: 'user', key: 'user_key')`|

### @oneToOne

`@oneToOne` is used to define a One To One relationship.

```graphql
"""@model"""
type Character {
  id:ID!
  name: String!
  """@oneToOne"""
  cast_actor: Actor!
}

"""@model"""
type Actor { ... }
```

This example generates an `character` field on the `Actor` type with a `Character` resolver as well as a `characterId` field internally which can be used to query across relationships.

#### Arguments

| Argument | Description | Example |
|-|-|-|
|`field`| Specifies the name of resolver field on the foreign object. **Required**. Accepts a string value | `@oneToOne(field: 'user'`)|
|`key`| Optionally specifies the name of foreign key field on the foreign object. Accepts a string value. Defaults to `<typeName>Id` | `@oneToOne(field: 'user', key: 'user_key')`|

### @index

The `@index` annotation can be used to create an index on a specific field or a set of fields at runtime. The supported arguments are different between the different databases. See the variations for [PostgreSQL](#index-1) and [MongoDB](#index-2).

## PostgreSQL

### @id

You can customise the default primary key field with the `@id` annotation.

```graphql
"""@model"""
type User {
  id: ID!
  """@id"""
  username: String!
}
```

### @index

The `@index` annotation can be used with [GraphQL Migrations](../graphql-migrations/db-design#index) to create indexes on your PostgreSQL database tables.

You can create one or multiple indexes per table.

```graphql
"""@model"""
type User {
  id: ID!
  """
  @index
  """
  name: String!
  """
  @index(name: 'userEmail_Idx', type: 'hash')
  """
  email: String!
}
```

This creates two custom indexes on the `user` table:

```
"user_name_index" btree (name)
"userEmail_index" hash (email)
 ```

You can also create a composite index.

```graphql
"""@model"""
type User {
  id: ID!
  """
  @index(name: 'user_unique_index')
  """
  email: String!
  """
  @index(name: 'user_unique_index')
  """
  name: String!
}
```

This creates the following composite index:

```
"user_unique_index" btree (email, name)
```

#### Arguments

| Argument | Description | Example |
|-|-|-|
|`name`| Specifies the name of index. **Optional**. Defaults to `<tablename>_<columnname>_index`. Accepts a string value | `@index(name: 'myIndex')`|
|`type`| Specifies the index type. **Optional**. Accepts a string value. Supported values: `btree` (default), `hash`, `gist`, `spgist`, `gin` and `brin` | `@index(type: 'hash')`|

> If you have relationships in your models, the relevant foreign keys are automatically indexed by Graphback, so you do not have to index them using `@index`. Similarly, custom primary keys marked with `@id` are also automatically indexed by Graphback.

### @db

GraphQL Migrations is a library to perform database migrations tables for PostgreSQL using a GraphQL schema. Most of the migration operations can be specified with the `@db` annotation. Check out the documentation for [GraphQL Migrations](../graphql-migrations/db-design) to learn more.

### @default

The `@default` annotation is used to specify a default value. This is currently only supported for PostgreSQL through the [GraphQL Migrations](../graphql-migrations/db-design#default-field-value) package.

```graphql
"""@model"""
type User {
  id: ID!
  """@default(value: false)"""
  verified: Boolean!
}
```

#### Arguments

| Argument | Description | Example |
|-|-|-|
|`value`| Specifies the default value for the field. **Required**. | `@default(value: 1)`|

## MongoDB

### @index

The `@index` annotation can be used to create an index on a specific field or a set of fields at runtime.

You can create one or multiple indexes per collection.

```graphql
"""
@model
"""
type Comment {
  id: ID!
  """
  Add an index with a generated name
  @index
  """
  text: String
  """
  Creating a custom named index
  @index(
    name: 'descriptionIndex'
  )
  """
  description: String
}
```

You can also create a compound index with they `key` property (see [Arguments](#arguments-1) for an explanation of how to use it).

```graphql
"""@model"""
type User {
  id: ID!
  """
  @index(
    name: 'user_unique_index',
    key: {
      email: 1,
      name: 1
    }
  )
  """
  email: String!
  name: String!
}
```

Graphback creates the following indexes on the `user` collection in the Mongo database `users`:

```json
{
  "v" : 2,
  "key" : {
    "email" : 1,
    "name" : 1
  },
  "name" : "user_unique_index",
  "ns" : "users.user"
}
```

#### Arguments

| Argument | Description | Type |
|-|-|-|
| `key` | Specifies the index’s fields. For each field, specify a key-value pair in which the key is the name of the field to index and the value is either the index direction or index type. If specifying direction, specify **1** for ascending or **-1** for descending. For example: `{ text: 1, description: 1 }`
| `name` | Optional. A name that uniquely identifies the index. | string |
| `unique` | Optional. Creates a unique index so that the collection will not accept insertion or update of documents where the index key value matches an existing value in the index. <br/><br/> Specify true to create a unique index. The default value is false. | boolean |

> If you have relationships in your models, the relevant foreign keys are automatically indexed by Graphback, so you do not have to index them using `@index`. Similarly, custom primary keys marked with `@id` are also automatically indexed by Graphback.

### @versioned

The `@versioned` annotation adds two fields to a model: `updatedAt` and `createdAt` to track the documents's last updated and created at timestamps. The fields are then automatically managed and updated by Graphback.

```graphql
"""
@model
@versioned
"""
type Comment {
  id: ID!
  text: String
  description: String
}
```

This generates the following GraphQL type:

```graphql
"""
@model
@versioned
"""
type Comment {
  id: ID!
  text: String
  description: String
  // highlight-start
  createdAt: GraphbackDateTime
  updatedAt: GraphbackDateTime
  // highlight-end
}
```