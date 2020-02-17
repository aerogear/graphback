## Graphback Runtime Example

Template that showcases Graphback runtime generation capabilities using
resolver layer generated in memory.

### Example

To create GraphQL Layer at runtime developers need to initialize `GraphbackRuntime` instance as follows:

```ts

    import { GraphbackRuntime, ModelDefinition, PgKnexDBDataProvider } from 'graphback'
    import { PubSub } from 'graphql-subscriptions';

    const client = new Knex(...);
    const graphbackOptions = {...}
    const schemaText = `type Test ...`

    const pubSub = new PubSub();
    const serviceOverrides = {}
    const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);
    const runtime = runtimeEngine.buildRuntime(db, pubSub, {});

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(runtime.schema),
    resolvers: runtime.resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
```

See [`./runtime.ts`](https://github.com/aerogear/graphback/blob/master/examples/runtime-example/src/runtime.ts#L32) for a fully functional example.

## Using different DataSource

Runtime is created using default CRUDService instance and KnexDBDataProvider db layer to retrieve the data. 
Developers can override implementations for those when different datasource is used. 

Currently 2 data providers are supported:

- KnexDBDataProvider
- PgKnexDBDataProvider

### Running example using Postgres database

The project has been created using `graphback`. Run the project using the following steps.

- Start the database

```
docker-compose up -d
```

- Define your schema in the `model/runtime.graphql` file. Or use the default:

```
type User {
  id: ID!
  name: String
}
```

- Start the server

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

### Running example using SQLite database

The project has been created using `graphback`. Run the project using the following steps.

- Modify the db json object in the `graphback.json` config file. For an in-memory database, use the below config as-is, alternatively replace `:in-memory:` with the desired filename.

```
"db": {
  "dbConfig": {
    "filename": ":in-memory:"
  },
  "database": "sqlite3"
},
```

- Next modify the `runtime.ts` file and change the `PGKnexDataProvider` to `KnexDBDataProvider`.

```
...

import {
  ...
  KnexDBDataProvider
} from 'graphback'

...

const dbClientProvider = new KnexDBDataProvider(client);

...
```

- Define your schema in the `model/runtime.graphql` file. Or use the default:

```
type User {
  id: ID!
  name: String
}
```

- Start the server (for the first time)

```
npm run develop
```

Or, if using yarn

```
yarn develop
```

If the server is being re-run, modify the `src/runtime.ts` and comment out the `migrateDb` function, since it will not be possible to re-migrate the database with SQLite3.

Enjoy the runtime app
