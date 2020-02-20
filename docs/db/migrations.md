---
id: dbmigrations
title: Database Schema Migrations
sidebar_label:  Database Schema Migrations
---

## Database Schema Migrations

Graphback uses [graphql-migrations](https://www.npmjs.com/package/graphql-migrations) to automatically create and update tables from a GraphQL schema.

### CLI

To create or update your database from the CLI, run:

```sh
graphback db
```

### Usage

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
  - All other options are not currently supported by Graphback.

### Defining your data model

#### Primary key

Each type must have a primary key. The primary key field must be `id` and the type must be `ID`.

```gql
type Note {
  id: ID!
  title: String!
}
```

#### Foreign key

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

> NOTE: See [relationships](./relationships) for how to customise foreign key field names.

#### Default field value

```gql
type Note {
  id: ID!
  title: String!
  """
  @db.default: false
  """
  complete: Boolean
}
```

#### Custom column type

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

#### Changing column names in graphback

When working with database migration library it is possible to change individual database columns.
Using custom column will require manual mapping in resolver or database layer. 

```gql
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

> NOTE: database migration logic require objects to have `id: ID!` field defined. 
Renaming `id` field to anything else will break Graphback data resolution logic

### Compatibility

The following database providers support full database schema migrations.

- PostgreSQL
- SQLLite
