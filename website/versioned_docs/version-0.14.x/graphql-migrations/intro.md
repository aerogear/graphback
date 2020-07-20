---
id: intro
title: GraphQL Migrations
sidebar_label: Introduction
---

Graphback uses [graphql-migrations](https://www.npmjs.com/package/graphql-migrations) to automatically create and update tables from a GraphQL schema.
The library compares your database schema to your GraphQL schema and executes the required changes to keep the database structure synchronised with the GraphQL schema.

## Compatibility

- PostgreSQL (create and update database)
- SQLite (create database only)

## Installation

You can install `graphql-migrations` on your existing project using the following commmands:

With npm: 

```bash
npm i graphql-serve
```

or with yarn:

```bash
yarn add graphql-serve
```

## Usage

GraphQL Migrations operates on business models defined in your schema: These are GraphQL types decorated with a [`@model`](../model/datamodel#model) annotation. 
The package expose an API which you can programmatically set up in your source code and have it perform the migrations. 

The package exposes a `migrateDB` method which creates and updates your tables and columns to match your GraphQL schema.
All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.
The method takes three arguments as described in [migrations options](#options) section.

```ts
import { migrateDB } from 'graphql-migrations';

const schemaText = ```
"""
@model
"""
type Note {
  id: ID!
  title: String!
}
```;

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

Assuming the above code is ran against a PostgreSQL database, the following relations will be created:
```sql
\d
              List of relations
 Schema |    Name     |   Type   |   Owner    
--------+-------------+----------+------------
 public | note        | table    | postgresql
 public | note_id_seq | sequence | postgresql
```

And the `note` table:

```sql
 \d note
                                 Table "public.note"
 Column |          Type          |                     Modifiers                     
--------+------------------------+---------------------------------------------------
 title  | character varying(255) | not null
 id     | integer                | not null default nextval('note_id_seq'::regclass)
Indexes:
    "note_pkey" PRIMARY KEY, btree (id)
```

## Advanced usage

For more advanced usage, visit the below pages:
- [Database Design](db-design)
- [API Reference](api)