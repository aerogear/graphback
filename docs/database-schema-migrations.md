---
id: database-schema-migrations
title: Database Schema Migrations
---

## Database Schema Migrations

Graphback currently has limited database schema migration support built in and available to both runtime and CLI.

### CLI

There are two database CLI commands:

- `graphback db` - this will drop and create a database schema from your input model.
- `graphback update-db` - this will update your database schema by comparing what has changed between the current and previous schema and applying those changes.

## Runtime

In runtime, there are 4 database initialization strategies which are defined in the client application.

### Strategies

- `DropCreateDatabaseAlways` - Drops and creates the database every time the application is run.
- `CreateDatabaseIfNotExists` - Only creates the database if it doesn't exist.
- `DropCreateDatabaseIfChanges` - Drop and recreate the database if there are changes in your schema.
- `UpdateDatabaseIfChanges` - Only update the database when your input schema has been changed.

### Configuration

Here is an example of how to configure database initialization strategies.

```ts
import * as jsonConfig from '../graphback.json'

const databaseInitializationStrategy = new UpdateDatabaseIfChanges({
  client: jsonConfig.db.database,
  connectionOptions: jsonConfig.db.dbConfig
});

const pubSub = new PubSub();
const runtime = await backend.createRuntime(dbClientProvider, pubSub, databaseInitializationStrategy);
```

## Limitations

Schema migrations are in a very early phase. At present the change types that are allowed is limited to the following:

- **TYPE_ADDED** - Adding a new GraphQL type to your model will create an associated database table.
- **FIELD_ADDED** - Adding a field to an existing model will create a new column in your database table.
