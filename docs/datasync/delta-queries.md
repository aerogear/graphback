---
id: delta-queries
title: Setting up Delta Queries
sidebar_label: Setting up Delta Queries
---

It is quite straightforward to setup Delta Queries with an existing Graphback template, by following the steps outlined below:

## Setup

Create a new Graphback project using:
```bash
npx create-graphback datasync-project
```
When asked, choose the `apollo-mongo-datasync-server-ts` template and proceed to the next step when the CLI has finished bootstrapping the project.

### Annotate the required models

Add the `@datasync` annotation to your model(s) in your GraphQL SDL found in the `model` folder:

```graphql {3}
""" 
@model
@datasync(
  ttl: 5184000
)
"""
type Comment {
  _id: GraphbackObjectID!
  text: String
  description: String
}
```

The `@datasync` annotation is used infer if a given model requires Delta Queries. If your business logic requires delete mutations, `@datasync` also ensures that deleted objects are maintained in the database for a given amount of time. This can either be specified by the *optional* `ttl` argument (given in seconds) otherwise defaults to a duration of 2 days (or 172800 seconds) This is done so clients can be informed about deletions in a delta query. The items are eventually deleted using a MongoDB TTL Index.

In the default configuration, `@datasync` transforms your model by adding a `_lastUpdatedAt` field to it:

```graphql {9}
""" 
@model
@datasync(
  ttl: 5184000
)
"""
type Comment {
  _id: GraphbackObjectID!
  text: String
  description: String
  _lastUpdatedAt: GraphbackTimestamp
}
```

:::note
The `_lastUpdatedAt` field is automatically indexed by Graphback for faster delta queries.
:::

The `@datasync` annotation adds a `sync` query or the delta query:
```graphql
type Query {
  syncComments(lastSync: GraphbackTimestamp!, filter: CommentFilter, limit: Int): CommentDeltaList!
}
```

This allows you to get all the changed documents (updated and deleted) in a collection since the `lastSync` timestamp. Internally this uses the `_lastUpdatedAt` database field to check if any documents in the database have been modified, by comparing client provided `lastSync` timestamp value.

:::note
The `sync` query also accepts a filter argument for filtering as well as a limit argument for limiting the number of items retrieved.
:::

The `@datasync` annotation also adds a `Delta` type and a `DeltaList` type:
```graphql
type CommentDelta {
  _id: GraphbackObjectID!
  text: String
  description: String
  _lastUpdatedAt: GraphbackTimestamp
  _deleted: Boolean
}

type CommentDeltaList {
  items: [CommentDelta]!
  lastSync: GraphbackTimestamp!
  limit: Int
}
```

The `Delta` type for a model consists of all of the model's transformed properties, as well as a `_deleted` field which is used internally to mark documents as deleted in the database. Thus `delete` mutations only mark documents with `_deleted: true` instead of actually removing them.

The `DeltaList` is a container for `Delta` type, which also returns a `lastSync` timestamp, that can be used in a subsequent `sync` query.

### Modify the template to use `createDataSyncAPI`

In the [`src/index.ts`](https://github.com/aerogear/graphback/blob/templates-release/templates/ts-apollo-mongodb-backend/src/index.ts) file of the template, use  `createDataSyncAPI` instead of `buildGraphbackAPI`:

```typescript
import { createDataSyncAPI } from '@graphback/datasync'


const { typeDefs, resolvers, contextCreator } = createDataSyncAPI(modelDefs, { db });;
```
The data sources provided by `createDataSyncAPI` ensure that:
- The documents are always soft deleted
- In the current configuration, provides out of the box delta queries for models that are annotated with `@datasync`

## Issuing Delta/Sync queries from client

As an example consider the usecase when your application has stayed offline for a while. You can then use the `sync<Type>s` query to retrieve only the changed documents rather than having to re-fetch all of the documents.

```graphql
query {
  syncComments(lastSync: 1590679886048) {
      items {
        _id
        text
        description
        _lastUpdatedAt
        _deleted
      },
      lastSync,
      limit
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
          "_lastUpdatedAt": 1591852693075,
          "_deleted": true
        },
        {
          "id": "5ee0a67345beff3862220be4",
          "text": "Second!",
          "description": null,
          "_lastUpdatedAt": 1591780979988,
          "_deleted": false
        }
      ],
      "lastSync": "1591852700920",
      "limit": null
    }
  }
}
```

The response is a list of the latest versions of the changed  documents along with a `_deleted` flag that is set to `true` if the document has been deleted since `lastSync` and `false` otherwise. The response also contains a `lastSync` timestamp which can be used in the next `syncX` query.

In the example response, we get that the "First!" comment has been deleted, while another comment "Second!" has been updated.

:::note
There is no support for querying relationships through a delta query, all relationship fields are removed when constructing a delta Type.
:::

Taking an example model definition with a `oneToMany` relationship from the `Note` type to the `Comment` type:

```graphql
""" @model """
type Note {
  _id: GraphbackObjectID!
  title: String!
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]!
}

""" 
@model
@datasync
"""
type Comment {
  _id: GraphbackObjectID!
  text: String
}
```

Since the `Comment` type has a `@datasync` annotation, Graphback will construct a `CommentDelta` type as follows:

```graphql
type CommentDelta {
  _id: GraphbackObjectID!
  text: String
  description: String
  _lastUpdatedAt: GraphbackTimestamp
  _deleted: Boolean
}
```

Notice that there are is no relationship field in the `CommentDelta` type.
