---
id: database-schema-migrations
title: Database Schema Migrations
---

## Database Schema Migrations

Graphback uses [graphql-migrations](../packages/graphql-migrations) to automatically create and update tables from a GraphQL schema.

### CLI

To create or update your database from the CLI, run:

```sh
graphback db
```

### Usage

The `migrate` method creates and updates your tables and columns to match your GraphQL schema.

All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.

```ts
import * as jsonConfig from '../graphback.json'
import { schemaText } from './schema';
import { migrate } from 'graphql-migrations';
import { GraphQLBackendCreator, PgKnexDBDataProvider } from 'graphback';

const backend = new GraphQLBackendCreator(schemaText, jsonConfig.graphqlCRUD);
const dbClientProvider = new PgKnexDBDataProvider(client);

const dbConfig = {
  client: jsonConfig.db.database,
  connection: jsonConfig.db.dbConfig
};

migrate(dbConfig, schemaText, {
  // Additional options
}).then((ops) => {
    console.log(ops);
});

const pubSub = new PubSub();

const runtime = await backend.createRuntime(dbClientProvider, pubSub);
...
```
