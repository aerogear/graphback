---

title: Runtime API
sidebar_label: Runtime API
id: serverless
---

Graphback allows you to add a GraphQL API to your application without generating any code.
Graphback package can be imported and used directly from your code or serverless handlers. 
Schema and resolvers are created in-code and are passed to an Apollo GraphQL or GraphQL.js server instance.

## Adding runtime layer to your application

To create GraphQL Layer at runtime developers need to initialize `GraphbackRuntime` instance as follows:

```ts

    import { GraphbackRuntime, ModelDefinition, PgKnexDBDataProvider } from 'graphback'
    import { PubSub } from 'graphql-subscriptions';

    // Create provider using knex
    class PostgreSQLRuntime extends GraphbackRuntime {
      db: Knex<any, any[]>;

      constructor(schema: string, config: GraphbackGeneratorConfig, db: Knex) {
        super(schema, config);
        this.db = db;
      }

      protected createDBProvider(model: ModelDefinition) {
        return new PgKnexDBDataProvider(model.graphqlType, this.db);
      }
    }

    const client = new Knex(...);
    const graphbackOptions = {...}
    const schemaText = `type Test ...`

    const pubSub = new PubSub();
    const serviceOverrides = {}
    const runtimeEngine = new PostgreSQLRuntime(schemaText, graphbackConfig, client);
    const runtime = runtimeEngine.buildRuntime(pubSub, {});

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(runtime.schema),
    resolvers: runtime.resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
```

See our [TypeScript Apollo Runtime](https://github.com/aerogear/graphback/blob/master/templates/ts-apollo-runtime-backend/src/runtime.ts) template for a fully functional example.

## Next steps

1. To change the default application configuration see [Graphback Config](./config.md).

2. See [Defining your Data model](./datamodel.md) for how to design your data model.

3. Graphback provides a number of different data sources which can be configured at application runtime. See [Data Sources](../db/datasources).

4. You can migrate your database to match your schema by running `graphback db`. See [Database Migrations](../db/migrations.md) for more.*

4. Run your application! 🚀

> **NOTE**: Database migrations only supports PostgreSQL databases.