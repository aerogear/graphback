---
id: "index"
title: "graphql-migrations"
sidebar_label: "README"
---

## Graphback

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"/>
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## graphql-migrations

Automatically create and update your database tables from a GraphQL schema.

### Usage

The `migrateDB` method creates and updates your tables and columns to match your GraphQL schema.

All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.

```ts
import { migrateDB } from 'graphql-migrations';

const dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'your-user',
    password: 'secret-password',
    database: 'note-db',
  },
};

const schema = `
type Note {
  id: ID!
  title: String!
  description: String
  comments: [Comment]!
}

type Comment {
  id: ID!
  description: String
  note: Note!
}
`;

migrateDB(dbConfig, schema, {
  // Additional options
}).then(() => {
  console.log('Database updated');
});
```

### Migration Options

- `config`: database configuration options.
- `schema`: a GraphQL schema object.
- `options`:
  - `dbSchemaName` (default: `'public'`): table schema: `<schemaName>.<tableName>`.
  - `dbTablePrefix` (default: ''): table name prefix: `<prefix><tableName>`.
  - `dbColumnPrefix` (default: `''`): column name prefix: `<prefix><columnName>`.
  - `updateComments`: overwrite comments on table and columns.
  - `scalarMap` (default: `null`): Custom scalar mapping..
  - `mapListToJson` (default: `true`): Map scalar lists to JSON column type by default.
  - `plugins` (default: `[]`): List of graphql-migrations plugins.
  - `debug` (default: `false`): display debugging information and SQL queries.

### Model Definition

```gql
"""
Notes table
"""
type Note {
  """
  Primary key
  """
  id: ID!
  """
  The note title
  """
  title: String!
}
```

### Skip table or field

```gql
"""
@db.skip
"""
type Error {
  code: Int!
  message: String!
}

type Note {
  id: ID!
  title: String
  """
  @db.skip: true
  """
  computedField: Boolean
}
```

### Rename

```gql
@db.oldNames: ['task']
type Note {
  id: ID!
  """
  @db.oldNames: ['text']
  """
  title: String!
}
```

### Nullable and non-nullable field

```gql
type Note {
  id: ID!
  title: String! # not null
}
```

```gql
type Note {
  id: ID!
  title: String # nullable
}
```

### Default value

```gql
type Note {
  id: ID!
  """
  default(value: 'Note title')
  """
  title: String
}
```

### Primary key

Each type must have a primary key. The primary key field must be `id` and the type must be `ID`.

```gql
type Note {
  id: ID!
  title: String!
}
```

### Foreign key

To set a foreign key, set a field reference to the related type.

```gql
type Comment {
  id: ID!
  note: Note! # this creates a `noteId` column in the `comment` table.
}

type Note {
  id: ID!
  title: String!
}
```

### Many-to-many

```gql
type User {
  id: ID!
  """
  @db.manyToMany: 'users'
  """
  messages: [Message]
}

type Message {
  id: ID!
  """
  @db.manyToMany: 'messages'
  """
  users: [User]
}
```

### Many-to-many on same type

```gql
type User {
  id: ID!
  friends: [User]
}
```

### Simple index

```gql
type User {
  id: ID!
  """
  @db.index
  """
  email: String!
}
```

### Multiple index

```gql
type User {
  """
  @db.index
  """
  id: String!

  """
  @db.index
  """
  email: String!
}
```

### Named index

```gql
type User {
  """
  @db.index: 'myIndex'
  """
  email: String!

  """
  @db.index: 'myIndex'
  """
  name: String!
}
```

You can specify the index type on PostgreSQL.

```gql
type User {
  """
  @db.index: { name: 'myIndex', type: 'hash' }
  """
  email: String!

  """
  You don't need to specify the type again.
  @db.index: 'myIndex'
  """
  name: String!
}
```

### Unique constraint

```gql
type User {
  id: ID!
  """
  @db.unique
  """
  email: String!
}
```

### Custom name

```gql
"""
@db.name: 'people'
"""
type Note {
  id: ID!
  """
  @db.name: 'noteTitle'
  """
  title: String!
}
```

### Custom column type

```gql
type Note {
  id: ID!
  """
  @db.type: 'string'
  @db.length: 100
  """
  title: String!
}
```

### List

```gql
type Note {
  id: ID!
  title: String!
  """
  @db.types: 'json'
  """
  comments: [String]
}
```

You can also set `mapListToJson` to `true` in the migrate options to automatically map scalar and enum lists to JSON.
