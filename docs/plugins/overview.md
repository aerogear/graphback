---
id: overview
title: Plugins Overview
sidebar_label: Overview
---

With Graphback plugins you can customise the generation of the GraphQL schema, automate the generation of resolvers, and create file resources such as client-side queries.

Plugins are executed in the order that are defined in the `plugins` array. Each plugin passes its modified version of the GraphQL schema to the next, making incremental changes to the schema and outputs the final schema once the plugin chain is complete.

Graphback offers a standard suite of plugins you can use to generate a [GraphQLCRUD](https://graphqlcrud.org/) compliant schema, resolvers and client documents.

## Using a plugin in your GraphQL Application

There are two ways that a Graphback plugin can be invoked in your application - the method you choose depends on the capabilities of the plugin and/or what you need to use the plugin for.

### At application startup

If you don't want the plugin to create files in your project, or if it is not capable of doing so, you can invoke your plugins programatically in [`buildGraphbackAPI`](../api/graphback/interfaces/_buildgraphbackapi_.graphbackapiconfig#optional-plugins).

```ts
// highlight-start
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';
// highlight-end


// creates a schema, CRUD resolvers, services and data providers
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db),
  // highlight-start
  plugins: [
    new SchemaCRUDPlugin()
  ]
  // highlight-end
});
```

Invoking `DataSyncPlugin` like this will update the in-memory schema and resolvers and return them as `typeDefs` and `resolvers`. 

### File generation with CLI

Some plugins can also create files in your project through the [`createResources`](../api/graphback-core/classes/_plugin_graphbackcoremetadata_.graphbackcoremetadata) hook. Please refer to the plugin documentation to see if this is enabled.

