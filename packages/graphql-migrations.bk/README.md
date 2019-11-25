## graphql-migrations-bk

Automatically updates your database structure from a GraphQL schema.

## Usage

### Strategies

- `DropCreateDatabaseAlways` - Drops and creates the database every time the application is run.
- `UpdateDatabaseIfChanges` - Only update the database when your input schema has been changed.

### Configuration

Here is an example of how to configure database initialization strategies.

#### Performing automatic migrations

```ts
import { migrate, UpdateDatabaseIfChanges } from 'graphql-migrations-bk';
import { migrationsDir } from './config';
import { schemaText } from './schema';

const db = Knex(...);

const databaseInitializationStrategy = new UpdateDatabaseIfChanges(db, migrationsDir);

await migrate(schemaText, dbInitialization);

const pubSub = new PubSub();
const runtime = await backend.createRuntime(dbClientProvider, pubSub);
```

#### Drop and recreate database every time

This mode is useful for when you are in development mode and don't care about saving migrations.

```ts
import { migrate, DropCreateDatabaseAlways } from 'graphql-migrations-bk';
import { migrationsDir } from './config';
import { schemaText } from './schema';

const db = Knex(...);

const databaseInitializationStrategy = new DropCreateDatabaseAlways('pg', db);

await migrate(schemaText, dbInitialization);

const pubSub = new PubSub();
const runtime = await backend.createRuntime(dbClientProvider, pubSub);
```

## Limitations

Schema migrations are in a very early phase. At present the change types that are allowed is limited to the following:

- **TYPE_ADDED** - Adding a new GraphQL type to your model will create an associated database table.
- **FIELD_ADDED** - Adding a field to an existing model will create a new column in your database table.

- Relationships are not yet supported and will be added very soon.
- Fields cannot be set to `NOT NULL` in the database.
