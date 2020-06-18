---
id: datasync-soft-delete
title: Soft Deletes with delta queries
sidebar_label: Setting up Soft Deletion
---

This is the simplest strategy for Data Synchronization that is also quite straightforward to set up.

## Setup

Start off with the official Graphback template for MongoDB [*here*](https://GitHub.com/aerogear/graphback/tree/master/templates/ts-apollo-mongodb-backend) to follow along. Adding this strategy is relatively simple, consisting of the following two steps:

### Annotate the required models

Add the `versioned` and `delta` annotations to your model(s) in your GraphQL SDL found in the `model` folder:

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

The `versioned` annotation ensures consistency of your data and `delta` marker gives you delta queries. 

> **NOTE**: While the `versioned` annotation can be used without the `@graphback/datasync` package, both `versioned` and `delta` are required for implementing data synchronization on a given type.

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

type Query {
  ...
  syncComments(lastSync: String!, filter: CommentFilter): CommentDeltaList!
}
```

 The `@delta` annotation adds a `sync` query or a delta query as shown above. This allows you to get all the changed(updates and deletes) documents in a collection since the `lastSync` timestamp. Internally this uses the `updatedAt` database field to check if any documents in the database have been modified, by comparing client provided `lastSync` timestamp value. The documents to be returned in a `sync` query may also be filtered, so you can, for example, only `sync` comments on a specific post.

The `@delta` annotation also adds a `_deleted` field to the `delta` type that tracks if a document has been deleted. Thus `delete` mutations only mark documents with `_deleted: true` instead of actually removing them.

> **NOTE**: `Soft Deletes` strategy can only get you the latest version of changed documents ignoring any in-between states that may have transpired between `lastSync` and now.

### Modify the template to support Data Synchronization

In the [`src/index.ts`]() file of the template, use  `DataSyncPlugin` and compliant data sources in `buildGraphbackAPI`:

```typescript
import { createDataSyncMongoDbProvider, createDataSyncCRUDService, DataSyncPlugin } from '@graphback/datasync'


const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createDataSyncMongoDbProvider(db),
    serviceCreator: createDataSyncCRUDService({ pubSub: new PubSub() }),
    plugins: [
        new DataSyncPlugin()
    ]
});
```
The data sources provided by `@graphback/datasync` ensure that the documents are only marked with `_deleted: true` instead of being removed from the database, meaning that a compatible client can issue a `sync` query to be get info about this deletion.

## Issuing Delta/Sync queries from client

As an example consider the usecase when your application has stayed offline for a while. You can then use the `syncX` query to get only the changed documents rather than having to refetch all of the documents.

```graphql
query {
  syncComments(lastSync: "1590679886048") {
      id
      text
      description
      createdAt
      updatedAt
      _deleted
  }
}
```

As an example response you might get:

```json
{
  "data": {
    "syncComments": {
      "items": [
        {
          "id": "5ee0a1da7f1f39313744185a",
          "text": "First!",
          "description": null,
          "createdAt": "1591779802551",
          "updatedAt": "1591852693075",
          "_deleted": true
        },
        {
          "id": "5ee0a67345beff3862220be4",
          "text": "Second!",
          "description": null,
          "createdAt": "1591780979988",
          "updatedAt": "1591780979988",
          "_deleted": false
        }
      ],
      "lastSync": "1591852700920"
    }
  }
}
```

The response is a list of the latest versions of the changed  documents along with a `_deleted` flag that is set to `true` if the document has been deleted since `lastSync` and `false` otherwise. The response also contains a `lastSync` timestamp which can be used in the next `syncX` query.

In the example response, we get that the "First!" comment has been deleted, while a new comment "Second!" has been created.

> **NOTE**: There is no support for querying relationships through a delta query, all relationship fields are removed when constructing a delta Type.
