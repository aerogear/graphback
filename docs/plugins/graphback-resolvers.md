---
id: crud-resolvers
title: Graphback CRUD Resolvers Plugin
sidebar_label: CRUD Resolvers
---

## Graphback CRUD Resolvers plugin

Graphback resolvers plugin gives developers opinionated way to generate Node.js server compatible set of the GraphQL resolvels
that will work with the Graphback Schema and Client side generated queries.

Resolvers plugin using Graphback Runtime Abstraction that gives developers ability to dynamically connect them to many datasources.
Please refer to [`Runtime Abstraction`](/docs/crudruntime) documentation for more information.

## Installation

```
npm install @graphback/codegen-resolvers
```

## Usage

Resolvers plugin will generate single resolver file that needs to be imported and
used to create GraphQL server. Developers can merge generated resolvers with their own by
passing their resolver definitions as array.

Resolvers plugin also requires developers to setup [`Services`](/docs/crudruntime) for
each model that will be mounted into the context. Graphback will generate helper method that
can be used to create all required services.

Minimalistic example of the Apollo Server based GraphQL server will look as follows:

```ts
import resolvers from './resolvers/resolvers';
import schema from './schema/schema';

const context = createCRUDResolversRuntimeContext({ schema, db, pubSub });
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
});
```

Please refer to ts-apollo-fullstack app for fully functional example:
https://github.com/aerogear/graphback/tree/master/templates/ts-apollo-fullstack

## Plugin Config

```ts
  /**
   * Extension of the generated files
   */
  format: 'ts' | 'js'

  /**
   * RelativePath for the output files created by generator
   */
  outputPath: string

  /**
   * Name of the generated resolvers file (default: resolvers.(format))
   */
  resolversFileName?: string

  /**
   * Layout of the of the resolvers object.
   * Supports Apollo (GraphQL-Tools) or GraphQL reference spec format
   */
  layout?: 'apollo' | 'graphql'

```

Example minimal YML:

```yml
plugins:
  graphback-resolvers:
    format: ts
    outputPath: ./server/src/resolvers
```
