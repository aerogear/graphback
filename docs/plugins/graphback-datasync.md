---
id: dataSync-plugin
title: Graphback Data Synchronization plugin
sidebar_label: Data Synchronization plugin
---

# Graphback Data Synchronization plugin

The Graphback Data Synchronization package consisting of the Data Synchronization Schema plugin, provides out of the box Data Synchronization strategies for GraphQL clients with offline functionality e.g. [Offix](https://offix.dev).

# Installation

The Graphback Data Synchronization package provides schema plugins as well as data sources for all supported data synchronization patterns.

```bash
npm install @graphback/datasync
```

# Usage

There are two steps to implementing a data synchronization strategy:

- Add metadata to schema
- Use the relevant plugin and data source

Currently the supported strategies are:

- Soft deletes with delta queries for MongoDB

## Soft Deletes with delta queries

- ### Sprinkle metadata on your schema

Add the `versioned` and `delta` markers to your model(s) in your GraphQL SDL:

```graphql
""" 
@model
@versioned
@delta 
"""
type Comment {
  id: ID!
  text: String
  description: String
}
```

The `versioned` marker ensures consistency of your data and `delta` marker gives you delta queries. Note that while `versioned` marker can be used without the `@graphback/datasync` package, both `versioned` and `delta` are required for implementing data synchronization on a given type.

This transforms your schema to the following:

```graphql
""" 
@model
@versioned
@delta 
"""
type Comment {
  id: ID!
  text: String
  description: String
  createdAt: String
  updatedAt: String
}


type CommentDelta {
  id: ID!
  text: String
  description: String
  createdAt: String
  updatedAt: String
  _deleted: Boolean
}

type CommentDeltaList {
  items: [CommentDelta]!
  lastSync: String
}
```

It also adds a `sync` query or a delta query:

```graphql
type Query {
  ...
  syncComments(lastSync: String): CommentDeltaList!
}
```

This allows you to get all the changes(updates and deletes) to your data that happened since the `lastSync` timestamp.

- ### Use the plugin and the data sources

In order to get this functionality, you also need to pass the plugin and the data sources to the `buildGraphbackAPI` method:

```typescript
import { createDataSyncMongoDbProvider, createDataSyncCRUDService, DataSyncPlugin } from '@graphback/datasync'
.
.
.
const { typeDefs, resolvers, services } = buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createDataSyncMongoDbProvider(db),
    serviceCreator: createDataSyncCRUDService({ pubSub: new PubSub() }),
    plugins: [
      new DataSyncPlugin()
    ]
  });
```

Done! You now have data synchronization!
