---
id: keycloak
title: Authentication with Keycloak
sidebar_label: Keycloak
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
    subCreate: {},
    subUpdate: { roles: ['admin'] },
    subDelete: { roles: ['admin'] },
  },
  Report: {
    create: { roles: ['admin'] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
};
```

:::info
`CrudServiceAuthConfig` interface defines all possible keys that each model can define.
When key is not defined engine will assume that no roles are required.
:::

With this configuration the following rules are in place.

- All users can create and read `Task` types but only admins can update and delete them.
- Admin users can create, update and delete `Report` types, and all users can read them.

## Relationships Autorization

Developers can also add authorization rules on sepecific relationships for data fetching purposes.
Relationship rules will be added on top of the existing rules that are defined for the individual objects.

```ts
const authConfig = {
  Task: {
    relations: {
        taskUsers: { roles: ['admin'] }
        allTasksComments: { roles: ['commenter'] }
    },

  },
```

With this configuration the following rules are in place.

- Tasks `taskUsers` field has `admin` role applied. Fetching User object will require `admin` role for any user field fetched
- Tasks `allTasksComments` field has `commenter` role applied. Fetching `Comment` object will require `commenter` role for any user field fetched

:::info
Due to limitations of the Graphback `relations` authorization works only on `OneToMany` relationships.
`OneToOne` relationships will utilize `read` config of the relationship target.
:::

## Field Updates Authorization

Developers can prevent from unautorized updates of the certain fields for `create` and `update` operations.
`updateFields` configuration can be used to restrict what fields can be updated.

```ts
const authConfig = {
  Task: {
    updateFields: {
       secret: { roles: ['admin'] }
    },
  },
```

With this configuration the following rules are in place.

- Tasks `secret` field has `admin` role applied. `createTask` and `updateTask` will require `admin` role if
  secret field was provided as part of the input type.

:::info
When designing your schema you need to consider impact of the authorization rules on your types.
Any field that is required
:::

:::info
Current implementation doesn't allow developers to handle `create` and `update` operations separately.
If you would like to handle those separately please consider extending `KeycloakCRUDService`.
:::

## Query Field-Level authorization

Developers can prevent from unautorized queries of the certain fields for `find` and `get` operations.
`returnFields` configuration can be used to restrict what fields can be fetched.

```ts
const authConfig = {
  Task: {
    returnFields: {
       secretReturnField: { roles: ['admin'] }
    },
  }
```

With this configuration the following rules are in place.

- Tasks `secretReturnField` field has `admin` role applied. `findTask` operation will fail with
  unauthorized error if non admin user requests `secretReturnField`

## Dynamic Filtering

In many ocassions developers want to restrict certain resources only for their respective owners.
Specifying user ID on the client is not secure as it can be altered to request resource that user
is not authorized to see. Solution for this problem is to apply specific filtering rules on the
server based on the currently logged user information:

`Keycloak-authz` library allows to provide dynamic filter for each individual model object.

```ts
const authConfig = {
  Task: {
    filterUsingAuthInfo: myAuthFilter,
  },
};

/**
 * @param filter - filter object that can be extended to add extra query
 * @param profileInfo - profile information hidden in token (req.kauth.grant.access_token.content)
 * @return filter - new filter field for your specific database
 */
const myAuthFilter = (filter: any, profileInfo: any) => {
  filter.ownerEmail = {
    profileInfo: {
      eq: profileInfo.email
    }
  };

  return filter;
};
```

:::info
Dynamic filtering is an **experimental** feature due to lack of strong typings on `profileInfo` and `filter`.
Please review Graphback `QueryFilter` definitions and Keycloak profile information objects before building filters.
:::

## Your own Resolvers

`keycloak-authz` package provides out of the box handlers for the graphback generated resolvers.
Developers can utilize authorization in their own resolvers and custom code.
For more information please reffer to the https://github.com/aerogear/keycloak-connect-graphql library documentation

## Using authorization with Graphback

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

## Running example

If you wish to use authorization mechanism you can try it on [DataSync starter](https://github.com/aerogear/datasync-starter) project