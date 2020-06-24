---
id: keycloak
title: Out of the box Keycloak based authentication
sidebar_label: Keycloak Auth
---

## Graphback Keycloak Authz

Graphback Keycloak Authz enables [Keycloak](https://www.keycloak.org/) integration in [Graphback](https://graphback.dev) based applications. This enables you to declaratively add authorization capabilities like role based access on top of the CRUD model that is used within Graphback.


This package is designed to work with [`keycloak-connect`](https://www.npmjs.com/package/keycloak-connect) and [`keycloak-connect-graphql`](https://www.npmjs.com/package/keycloak-connect-graphql). `keycloak-connect` is the official Keycloak middleware for Express applications. `keycloak-connect-graphql` provides deeper Keycloak integration into GraphQL servers.

> NOTE: This package is an early alpha and not officially supported by Graphback

## Getting Started

This module requires you to install the following dependencies into your application.

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
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  Report: {
    create: { roles: ['admin'] },
    read: {},
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
};
```

With this configuration the following rules are in place.

- All users can create and read `Task` types but only admins can update and delete them.
- Admin users can create, update and delete `Report` types, and all users can read them.

## Example with Graphback Runtime

During server initialization, use the `createKeycloakCRUDService` function to initialize the KeycloakCrudService instances for each model.

The following example shows just the necessary parts to set up the runtime services in Graphback.

```ts
import { ApolloServer } from 'apollo-server-express'
import { createKeycloakCRUDService } from '@graphback/keycloak-authz'
import { KnexDbDataProvider } from '@graphback/runtime-knex'
import { PubSub } from 'graphql-subscriptions'
import * as Knex from 'knex'
import { buildGraphbackAPI, createCRUDService } from 'graphback'

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

const keycloakService = createKeycloakCRUDService(authConfig, createCRUDService({
  pubSub: new PubSub()
}));
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  serviceCreator: keycloakService,
  dataProviderCreator: createKnexDbProvider(db)
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    return {
      ...contextCreator(context),
      kauth: new KeycloakContext({ req: context.req })
    }
  }
})
```

The above example shows runtime set up using the KnexDbDataProvider, but other data providers such as the `MongoDBDataProvider` can also be passed.
