## Graphback

<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: <https://graphback.dev>
**Repository**: <https://github.com/aerogear/graphback/>

## Graphback-DB-Manager

Runtime and CLI database schema manager.

- Creates database schema.
- Performs schema migrations.

## Usage

### CLI

There are two database CLI commands:

- `graphback db` - this will drop and create a database schema from your input model.
- `graphback update-db` - this will update your database schema by comparing what has changed between the current and previous schema and applying those changes.

## Runtime

In runtime, there are two database initialization strategies which are defined in the client application.

### Strategies

- `DropCreateDatabaseAlways` - Drops and creates the database every time the application is run.
- `UpdateDatabaseIfChanges` - Only update the database when your input schema has been changed.

### Configuration

Here is an example of how to configure database initialization strategies.

```ts
import * as jsonConfig from '../graphback.json'

const db = new Knex(...);

const schemaProvider = new InputModelProvider(jsonConfig.folders.model)

const migrationProvider = new KnexMigrationProvider(db, jsonConfig.folders.migrations);

const databaseInitializationStrategy = new UpdateDatabaseIfChanges({
  db,
  schemaProvider,
  migrationProvider
});

// execute the database initialization strategy
await backend.initializeDatabase(databaseInitializationStrategy);

const pubSub = new PubSub();
const runtime = await backend.createRuntime(dbClientProvider, pubSub);
```

## Limitations

Schema migrations are in a very early phase. At present the change types that are allowed is limited to the following:

- **TYPE_ADDED** - Adding a new GraphQL type to your model will create an associated database table.
- **FIELD_ADDED** - Adding a field to an existing model will create a new column in your database table.

Relationships are not yet supported and will be added very soon.
