---
title: Database Schema Migrations
id: database-schema-migrations
---

## Database Schema Migrations

Graphback uses [graphql-migrations](../packages/graphql-migrations) to automatically create and update tables from a GraphQL schema.

### CLI

To create or update your database from the CLI, run:

```bash
graphback db
```

### Usage

The `migrateDB` method creates and updates your tables and columns to match your GraphQL schema.

All the database operations are wrapped in a single transaction, so your database will be fully rolled back to its initial state if an error occurs.

```ts
import * as jsonConfig from '../graphback.json'
import { schemaText } from './schema';
import { migrateDB } from 'graphql-migrations';
import { GraphQLBackendCreator, PgKnexDBDataProvider } from 'graphback';

const backend = new GraphQLBackendCreator(schemaText, jsonConfig.graphqlCRUD);
const dbClientProvider = new PgKnexDBDataProvider(client);

const dbConfig = {
  client: jsonConfig.db.database,
  connection: jsonConfig.db.dbConfig
};

migrateDB(dbConfig, schemaText, {
  // Additional options
}).then((ops) => {
    console.log(ops);
});

const pubSub = new PubSub();

const runtime = await backend.createRuntime(dbClientProvider, pubSub);
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
  - `removeDirectivesFromSchema`: removes all directives from the GraphQL schema.
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

> NOTE: The field name must match that of the related type. Support for custom field names is coming soon.

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

### Compatibility

The following database providers support full database schema migrations.

- PostgreSQL

SQLite is not yet fully supported but will be soon.

### Migrations in Production

`migrateDBUsingSchema` can be used to perform migrations in a controlled/production environment.

Options:

- `schemaText`: GraphQL schema text.
- `strategy`: Database initialization strategy. Options: `UpdateDatabaseIfChanges`, `DropCreateDatabaseAlways`.
  
#### Strategies

**UpdateDatabaseIfChanges** - Only update the database when your input schema has been changed.

Options:

- `client`: [knex](http://knexjs.org/) configuration object.
- `migrationsDir`: Folder to save/read local migration data.

**DropCreateDatabaseAlways** - Wipe and recreate a new database every time.

Options:

- `client`: Database provider type (e.g: `pg`, `sqlite3`)
- `db`: [knex](http://knexjs.org/) configuration object.

#### Configuration

Here is an example of how to configure database initialization strategies.

```ts
import * as jsonConfig from '../graphback.json'
import { schemaText } from './schema';
import { migrateDBUsingSchema, UpdateDatabaseIfChanges } from 'graphql-migrations';

const db = new Knex(...);

const backend = new GraphQLBackendCreator(schemaText, jsonConfig.graphqlCRUD);
const dbClientProvider = new PgKnexDBDataProvider(client);

const dbInitialization = new UpdateDatabaseIfChanges(client, jsonConfig.folders.migrations);

await migrateDBUsingSchema(schemaText, dbInitialization)

const pubSub = new PubSub();
const runtime = await backend.createRuntime(dbClientProvider, pubSub);
```

#### Limitations

Schema migrations are in a very early phase. At present the change types that are allowed is limited to the following:

- **TYPE_ADDED** - Adding a new GraphQL type to your model will create an associated database table.
- **FIELD_ADDED** - Adding a field to an existing model will create a new column in your database table.