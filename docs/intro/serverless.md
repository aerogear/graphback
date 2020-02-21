---
id: serverless
title: Serve GraphQL API without code
sidebar_label: Serverless
---

Graphback allows you to add GraphQL API without code generation.
Graphback package can be imported and used directly from your code or serverless handlers. 
Schema and resolvers can be created when your application code is executed and used to create instance of Apollo or GraphQL-js server

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

See [`./runtime.ts`](https://github.com/aerogear/graphback/blob/master/templates/ts-apollo-runtime-backend/src/runtime.ts) for a fully functional example.

### GraphbackDataProvider

Graphback provides following implementations of GraphbackDataProvider

- KnexDBDataProvider (`@graphback/runtime-knex`)
- PgKnexDBDataProvider (PostgreSQL version from `@graphback/runtime-knex`)
- MongoDBDataProvider (`@graphback/runtime-mongodb`)

Your resolvers can use different data providers thanks to swapping implementation in resolver context

## Using different DataSource

Runtime is created using default CRUDService instance and KnexDBDataProvider db layer to retrieve the data. 
Developers can override implementations for those when different datasource is used. 



See [`runtime example application`](https://github.com/aerogear/graphback/tree/master/templates/ts-apollo-runtime-backend)
for more information.

