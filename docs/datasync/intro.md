---
id: intro
title: Introduction to Data Synchronization
sidebar_label: What is Data Synchronization?
---

The `@graphback/datasync` package consists of the [Data Synchronization Schema plugin](../api/graphback-datasync/classes/_datasyncplugin_.datasyncplugin.md) and [compatible data sources](../api/graphback-datasync/classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md), provides out of the box Data Synchronization strategies for GraphQL clients with offline functionality e.g. [Offix](https://offix.dev). 

:::note
Currently this plugin **only** supports MongoDB data sources, with support for other kinds of data sources coming in a future release.
:::

## Motivation

The `@graphback/datasync` package is meant to be naturally extend [Offix](https://offix.dev) with a GraphQLCRUD compliant API:

- Fetch data that was changed based on the client side timestamp
- Ensure data consistency using timestamp provided
 
It achieves this by:

- **Providing Delta Queries**: Delta queries can be used by GraphQL clients to refresh changes in data between periods of connectivity outages. 
- **Providing server-side Conflict Resolution capabilities**: For mutations that are applied offline, this provides the server with the ability to resolve conflicts between server and client.

## Installation

The Graphback Data Synchronization package provides schema plugins as well as data sources for all supported data synchronization features.

```bash
npm install @graphback/datasync
```

## Usage

Add annotations to your data models:

```graphql
"""
@model
// highlight-next-line
@datasync
"""
type User {
  id: _GraphbackObjectID
  name: String
}
```

The preferred and simpest way to add data sync functionality is to use the `createDataSyncAPI` function which wraps `buildGraphbackAPI`:

```ts
import { createDataSyncAPI } from '@graphback/datasync'

const { typeDefs, resolvers, contextCreator } = createDataSyncAPI(modelDefs, { db });
```

Alternatively, you can use the default [`buildGraphbackAPI`](../getting-started/adding-graphback-to-your-project.md#configure-graphback) and add the `DataSyncPlugin` plugin directly:

```ts
import { buildGraphbackAPI } from 'graphback';
import { DataSyncPlugin } from '@graphback/datasync'

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema, {
  ...,
  plugins: [
    new DataSyncPlugin({
      enabled: true
    })
  ]
});
```

Or if you are invoking the plugin with `graphback generate`:

```yaml title=".graphqlrc"
schema: './src/schema.graphql'
documents: './client/src/graphql/**/*.graphql'
extensions:
  graphback:
    # path to data mode file(s)
    model: './model/datamodel.graphql'
    plugins:
      ...
      graphback-datasync:
        packageName: '@graphback/datasync' # required to dynamically load
        conflictConfig: 
          models:
            Note:
              enabled: true
```

For a more in-depth guide to setting up data synchronization features, check [this](delta-queries.md) page.