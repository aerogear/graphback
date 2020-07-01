---
id: serverless
title: Runtime API
sidebar_label: Runtime API
---

Graphback allows you to add a GraphQL API to your application without generating any code.
Graphback package can be imported and used directly from your code or serverless handlers. 
Schema and resolvers are created in-code and are passed to an Apollo GraphQL or GraphQL.js server instance.

## Adding runtime layer to your application

The `buildGraphbackAPI` method creates a schema, resolvers and CRUD services at runtime using your data model and some minimal configuration. The example below shows how you can use Graphback with Apollo and a Postgres database.

```ts
import { ApolloServer } from "apollo-server-express"
import { buildGraphbackAPI } from 'graphback'
import Knex from 'knex'
import { createKnexDbProvider } from '@graphback/runtime-knex'

const typeDefs = `
"""
@model
"""
type User {
  id: ID
  name: String
}
`

const db = Knex(...)

// Creates in memory type definitions, resolvers and CRUD services
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db)
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextCreator
});
```

If you prefer to use MongoDb:

```ts
import { createMongoDbProvider } from '@graphback/runtime-mongo'

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createMongoDbProvider(db)
});
```

By default, Graphback will create a CRUDService with default configuration for each model. You can customise at runtime:

```ts
import { createMongoDbProvider, createCRUDService } from '@graphback/runtime-mongo'
import { MyCustomLogger } from './util'

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  serviceCreator: createCRUDService({
    pubSub: new PubSub(),
    logger: MyCustomLogger
  }),
  dataProviderCreator: createMongoDbProvider(db)
});
```

### buildGraphbackAPI(model, config) ⇒ <code>GraphbackAPI</code>

`buildGraphbackAPI`

| Param | Type | Description |
| --- | --- | --- |
| model | <code>GraphQLSchema</code> \| <code>string</code> | Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database |
| [config.serviceCreator] | <code>function</code> | Creator class specifying which default CRUD service should be created for each model. |
| config.dataProviderCreator | <code>function</code> | Creator class specifying which default database provider should be created for each model. |
| [config.crud] | <code>GraphbackCRUDGeneratorConfig</code> | Global CRUD configuration for the Graphback API. |
| [config.plugins] | <code>Array.&lt;GraphbackPlugin&gt;</code> | Schema plugins to perform automatic changes to the generated schema |

## Next steps

1. To change the default application configuration see [Graphback Config](./config.md).

2. See [Defining your Data model](./datamodel.md) for how to design your data model.

3. Graphback provides a number of different data sources which can be configured at application runtime. See [Data Sources](../db/datasources).

4. You can migrate your database to match your schema. See [Database Migrations](../db/migrations.md) for more.*

4. Run your application! 🚀

> **NOTE**: Database migrations only supports PostgreSQL databases.