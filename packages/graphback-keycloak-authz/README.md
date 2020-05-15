## Graphback Keycloak Authz
<p align="center">
  <img width="400" src="https://github.com/aerogear/graphback/raw/master/website/static/img/graphback.png">
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

**Documentation**: https://graphback.dev
**Repository**: https://github.com/aerogear/graphback/

## Graphback Keycloak Authz

This module enables [Keycloak](https://www.keycloak.org/) integration in [Graphback](https://graphback.dev) based applications. This enables you to declaratively add authorization capabilities like role bassed access on top of the CRUD model that is used within Graphback.

The `KeycloakCrudService` extends Graphback's default `CrudService` class which provides the authorization capabilities. See [the docs](https://graphback.dev/docs/crud/crudruntime) for more information about the Crud model in Graphback.

This package is designed to work with [`keycloak-connect`](https://www.npmjs.com/package/keycloak-connect) and [`keycloak-connect-graphql`](https://www.npmjs.com/package/keycloak-connect-graphql). `keycloak-connect` is the official Keycloak middleware for Express applications. `keycloak-connect-graphql` provides deeper Keycloak integration into GraphQL servers.

> NOTE: This package is an early alpha and not officially supported by Graphback

## Getting Started

This module requires you to install the following dependecies into your application.

```bash
npm install keycloak-connect
npm install keycloak-connect-graphql
```

Then follow the [Getting started instructions for `keycloak-connect-graphql`](https://github.com/aerogear/keycloak-connect-graphql#getting-started)

Once the getting started instructions are covered, you must create a configuration that defines the authorization rules for each model within your Graphback application.

Here is an example configuration.

```ts
const authConfig = {
  Task: {
    create: {},
    read: {},
    update: { roles: ["admin"] },
    delete: { roles: ["admin"] }
  },
  Report: {
    create: { roles: ["admin"] },
    read: {},
    update: { roles: ["admin"] },
    delete: { roles: ["admin"] }
  }
}
```

With this configuration the following rules are in place.

* All users can create and read `Task` types but only admins can update and delete them.
* Admin users can create, update and delete `Report` types, and all users can read them.

## Example with Graphback Runtime

During server initialization, use the `createKeycloakRuntimeContext` function to initialize the KeycloakCrudService instances for each model.

The following example shows just the necessary parts to set up the runtime services in Graphback.

```ts
import { ApolloServer } from 'apollo-server-express'
import { createKeycloakRuntimeContext } from '@graphback/keycloak-authz'
import { GraphbackRuntime } from 'graphback'
import { KnexDbDataProvider } from '@graphback/runtime-knex'
import { PubSub } from 'graphql-subscriptions'
import * as Knex from 'knex'
import { printSchema } from 'graphql'

// the application model
const model = `
""" 
@model
"""
type Task {
  id: ID!
  title: String!
  description: String!
}`

// the auth rules for the application
const authConfig = {
  Task: {
    create: {},
    read: {},
    update: { roles: ["admin"] },
    delete: { roles: ["admin"] }
  }
}

// set up the Knex database client
const db = Knex({...})

// standard Graphback runtime setup
const pubSub = new PubSub()
const runtimeEngine = new GraphbackRuntime(model, graphbackConfig)
const models = runtimeEngine.getDataSourceModels()

// create runtime services integrated with Keycloak
// Note that the knex database client and the KnexDBDataProvider class are passed
// Other data providers can be passed too
// Under the hood this creates KeycloakCrudService instances
const services = createKeycloakRuntimeContext({ 
  models,
  schema: model,
  db,
  pubSub,
  authConfig,
  dataProvider: KnexDBDataProvider
})

const { schema, resolvers } = runtimeEngine.buildRuntime(services);

const server = new ApolloServer({
  typeDefs: printSchema(schema),
  resolvers,
  context: (req) => {
    return {
      kauth: new KeycloakContext({ req })
    }
  }
})
```

The above example shows runtime set up using the KnexDbDataProvider, but other data providers such as the `MongoDBDataProvider` can also be passed.

## Extending the KeycloakCrudService

Under the hood, the `createKeycloakRuntimeContext` initializes `KeycloakCrudService` instances. The `KeycloakCrudService` extends the standard `CrudService` in Graphback and adds additional checks for various auth rules.

It is possible to create a custom CrudService that extends the KeycloakCrudService and pass it to `createKeycloakRuntimeContext`.

```ts
import { KeycloakCrudService } from '@graphback/keycloak-authz'

class CustomCrudService extends KeycloakCrudService {
  // custom implementation
}

const services = createKeycloakRuntimeContext({ 
  models,
  schema: model,
  db,
  pubSub,
  authConfig,
  dataProvider: KnexDBDataProvider,
  crudService: CustomCrudService
})
```

## Full Example showing Keycloak integration in apollo-server-express

The following example is a full that shows how to set up a Graphback runtime application that uses Keycloak authentication and authorization.

```ts
import * as http from 'http'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import * as session from 'express-session'
import * as Keycloak from 'keycloak-connect'
import { KeycloakContext, KeycloakSubscriptionHandler, KeycloakSubscriptionContext } from 'keycloak-connect-graphql'
import { createKeycloakRuntimeContext } from '@graphback/keycloak-authz'
import { GraphbackRuntime } from 'graphback'
import { KnexDBDataProvider } from '@graphback/runtime-knex'
import { PubSub } from 'graphql-subscriptions'
import * as Knex from 'knex'
import { printSchema, buildSchema } from 'graphql'
import { loadConfigSync } from 'graphql-config'

// load the graphback config
const graphbackConfig = loadConfigSync({
  extensions: [
    () => ({ name: 'graphback' })
  ]
}).getDefault().extension('graphback')

// express setup
const app = express()

// keycloak middleware setup
const memoryStore = new session.MemoryStore()

app.use(session({	
  secret: process.env.SESSION_SECRET_STRING || 'this should be a long secret',	
  resave: false,	
  saveUninitialized: true,	
  store: memoryStore	
}))	

const keycloak = new Keycloak({	store: memoryStore })
const keycloakSubscriptionHandler = new KeycloakSubscriptionHandler({ keycloak })

app.use(keycloak.middleware())

// protect the /graphql endpoint with keycloak authentication
app.use('/graphql', keycloak.protect())

// graphback model
const model = buildSchema(`
""" 
@model
"""
type Task {
  id: ID!
  title: String!
  description: String!
}`)

// the auth rules for the application
const authConfig = {
  Task: {
    update: { roles: ["admin"] },
    delete: { roles: ["admin"] }
  }
}

// set up the Knex database client
const db = Knex({
  client: 'pg',
  connection: {
    user: 'postgresql',
    password: 'postgres',
    database: 'users',
    host: 'localhost',
    port: 5432
  }
})

// standard Graphback runtime setup
const pubSub = new PubSub()
const runtimeEngine = new GraphbackRuntime(model, graphbackConfig)
const models = runtimeEngine.getDataSourceModels()

// create runtime services integrated with Keycloak
// Note that the knex database client and the KnexDBDataProvider class are passed
// Other data providers can be passed too
// Under the hood this creates KeycloakCrudService instances
const services = createKeycloakRuntimeContext({ 
  models,
  schema: model,
  db,
  pubSub,
  authConfig,
  dataProvider: KnexDBDataProvider
})

const { schema, resolvers } = runtimeEngine.buildRuntime(services)

const apolloConfig = {
  typeDefs: printSchema(schema),
  resolvers: resolvers,
  path: '/graphql',
  context: ({ req }) => {
    return {
      kauth: new KeycloakContext({ req }) // 3. add the KeycloakContext to `kauth`
    }
  },
  subscriptions: {
    onConnect: async (connectionParams) => {
      const token = await keycloakSubscriptionHandler.onSubscriptionConnect(connectionParams)
      if (!token) {
        throw new Error("Cannot build keycloak token. Connection will be terminated")
      }
      return {
        kauth: new KeycloakSubscriptionContext(token)
      }
    }
  }
}
// create the apollo server
const apolloServer = new ApolloServer(apolloConfig)

// apply apollo server middleware to express
apolloServer.applyMiddleware({ app })

// create the http server
const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

// listen
httpServer.listen(4000, () => {
  console.log(`🚀 application available at http://localhost:4000/graphql`)
})
```
