---
id: conflict-resolution-intro
title: Setting up Conflict Resolution
sidebar_label: Setting up server-side Conflict Resolution
---

Server-side conflict resolution is an additional feature which is meant to be used alongisde Delta Queries. 

## Setup

Create a new Graphback Project with:
```shell
npx create-graphback datasync-project
```

When the CLI asks you to pick a template, you may either:

1. Pick the `apollo-mongo-datasync-server-ts` template which has out-of-the-box delta queries and server-side conflict resolution
2. Pick the `apollo-mongo-server-ts` template and follow along with the rest of the tutorial

When the CLI has finished bootstrapping your project, you may follow along with the rest of the tutorial (if you picked `apollo-mongo-server-ts`) or you may skip to the end of the tutorial.

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

This configuration transforms your model for Delta Queries (adding `_lastUpdatedAt`) as well as the following for Conflict resolution:

1. A `_version` field in the model type used for fetching base document in conflict resolution.
2. A `_version` field in the corresponding Mutation Input Type.

The model type then becomes:
```graphql {9,10}
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
  _version: Int
}
```

And the Mutation Input type for it would be:
```graphql {5}
input MutateCommentInput {
  _id: GraphbackObjectID!
  text: String
  description: String
  _version: Int!
}
```

An example mutation can be found at the end of this page.

### Modify the template to use `createDataSyncAPI`

In the [`src/index.ts`](https://github.com/aerogear/graphback/blob/templates-release/templates/ts-apollo-mongodb-backend/src/index.ts) file of the template, use  `createDataSyncAPI` instead of `buildGraphbackAPI`:

```typescript
import { createDataSyncAPI } from '@graphback/datasync'


const {
  typeDefs,
  resolvers,
  contextCreator
} = createDataSyncAPI(
  modelDefs,
  {
    db,
    conflictConfig: {
      enabled: true
    }
  }
);
```

The `conflictConfig` argument is used to either configure conflicts for all `@datasync` enabled models by directly setting global conflict parameters like `enabled` or configuring specific models via a `models` property. When conflicts are enabled for a specific model, a delta table is maintained for that model.

An example entry in the delta table would look as follows:
```json
{
    "_id": {
        "$oid": "5f3b87ffcb1377481c391046"
    },
    "docId": {
        "$oid": "5f3b87ffcb1377481c391045"
    },
    "_version": 1,
    "document": {
        "text": "Bizarre",
        "description": "Who merged this stuff?",
        "_version": 1,
        "_deleted": false,
        "_lastUpdatedAt": 1597736959165,
        "_id": {
            "$oid": "5f3b87ffcb1377481c391045"
        }
    },
    "_ttl": {
        "$date": "2020-08-25T07:49:19.181Z"
    }
}
```

To improve efficiency of queries on the `delta` table, a `deltaTTL` argument (in seconds) is used along with a MongoDB TTL Index to prune older entries from the delta table. In the current configuration, a default strategy of `ClientSideWins` is used. Please check the [Conflict Resolution Strategies](conflict-resolution-strategies.md) documentation for more information on using different strategies as well as implementing custom Conflict Resolution strategies.

:::note
You may only have delta queries for one model while having both delta queries and server-side conflict resolution for another model without them interfering with each other.
:::

## Example of Issuing a Delta Query

Delta Queries remain the same but with the addition of a `_version` field as outlined in the above sections:

```graphql
query {
  syncComments(lastSync: 1590679886048) {
      items {
        _id
        text
        description
        _lastUpdatedAt
        _deleted
        _version
      },
      lastSync,
      limit
  }
}
```

An example response may be:

```json
{
  "data": {
    "syncComments": {
      "items": [
        {
          "_id": "5f350f33c6656579a104057e",
          "text": "Bizarre",
          "description": "Who merged this stuff?",
          "_lastUpdatedAt": 1597312819010,
          "_deleted": false,
          "_version": 1
        }
      ],
      "lastSync": 1597312854109,
      "limit": null
    }
  }
}
```


## Example Mutations

Both updates and deletes are implemented with a default server-side Conflict Resolution strategy when it is enabled i.e. The `ClientWins` strategy, this means that in the event of an update or delete conflict, the client side always wins. Taking an example, suppose the `comment` collection consists of the following document:

```json
{
  "_id": { "$oid": "5f350f33c6656579a104057e" },
  "text": "Note 0",
  "description": "Updated Placeholder",
  "_version": 2,
  "_deleted": false,
  "_lastUpdatedAt": 1597313915015
}
```

In order to update this document one has to issue a mutation as follows:

```graphql {6}
mutation {
  updateComment(input: { 
    _id: "5f350f33c6656579a104057e", 
    description: "Another Update", 
    _version: 2
  }) {
    text
    description,
    _lastUpdatedAt
    _version
  }
}
```

And receive a response like so:
```json
{
  "data": {
    "updateComment": {
      "text": "Note 0",
      "description": "Another Update",
      "_lastUpdatedAt": 1597320268347,
      "_version": 3
    }
  }
}
```

:::note
To issue mutations for a model with server-side Conflict resolution, the current value of the `_version` field must be passed in the input argument as is required by the corresponding Mutation Input Type.
:::

Conflicts usually happen when a client does not have the most recent version of the data and tries to issue mutations. The server detects this using the aforementioned `_version` field and checks to see if fields that the client is trying to update have changed since the client last fetched the data.

In case they have, the server calls upon the conflict resolution strategy to resolve the conflict. See [Conflict Resolution Strategies](conflict-resolution-strategies.md) for more info on these strategies.

Following the previous example, if another client did not receive the above update, and tries to issue another update like so:
```graphql {6}
mutation {
  updateComment(input: { 
    _id: "5f350f33c6656579a104057e", 
    title: "Newer Title", 
    _version: 2
  }) {
    text
    description,
    _lastUpdatedAt
    _version
  }
}
```
No conflict will occur, even if the version field is out-of-date because the `title` field has not changed since this client fetched the document. Therefore, it may receive a response as such:
```json
{
  "data": {
    "updateComment": {
      "text": "Newer Title",
      "description": "Another Update",
      "_lastUpdatedAt": 1597321969016,
      "_version": 4
    }
  }
}
```

