---
id: crud-schema
title: SchemaCRUD Plugin
sidebar_label: SchemaCRUD
---

The [`SchemaCRUDPlugin`](../api/graphback-codegen-schema/classes/_schemacrudplugin_.schemacrudplugin.md) plugin creates your GraphQL schema with all input types, Query, Mutation and Subscription fields following recommended patterns from [GraphQL CRUD](https://graphqlcrud.org/).
The plugin also creates your CRUD resolvers to use with your GraphQL schema.

## Installation

```bash
yarn add @graphback/codegen-schema
```

## Usage

To use the plugin, add it to the `plugins` array in [`buildGraphbackAPI`](../api/build-graphback-api#plugins).

```ts
const { schema, resolvers } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db),
  plugins: [
    // highlight-start
    new SchemaCRUDPlugin({
      outputPath: './src/schema/schema.graphql'
    })
    // highlight-end
  ]
});
```

:::info
Unless you need the schema to be output to a file you don't need to install or configure it as Graphback will automatically execute it as the default plugin.
:::

## Configuration

Below is a full list of the available configuration options for this plugin.

| Argument                    	| Description                                                                 	| Type     	| Default 	|
|---------------------------	|-----------------------------------------------------------------------------	|----------	|---------------	|
| `pluginConfig.outputPath` 	| Optional relative path to the schema file.<br/> Example: `"/path/to/schema/schema.graphql"` 	| `string` 	| `undefined`   	|
