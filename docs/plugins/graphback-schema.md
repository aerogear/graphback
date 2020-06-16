---
id: crud-schema
title: Graphback CRUD Schema Plugin
sidebar_label: CRUD Schema
---

## Graphback CRUD Schema plugin

`SchemaCRUDPlugin` creates your GraphQL schema with all input types, Query, Mutation and Subscription fields following recommended patters in [GraphQL CRUD](https://graphqlcrud.org/).
The plugin also creates your CRUD resolvers that can be used with your GraphQL schema.

### Installation

This is the default plugin used by Graphback, so you do not need to install it to your GraphQL API. `SchemaCRUDPlugin` allows you to write your generated schema to a `.ts`, `.js` or `.graphql` file, so if you want to avail of this feature you will need to install the plugin.

Installing with npm:

```bash
npm install @graphback/codegen-schema
```

### Configuration

`SchemaCRUDPlugin` can be configured to write your generated schema to a file:


```ts
  /**
   * Output format for schema
   */
  format: 'ts' | 'js' | 'graphql',

  /**
   * RelativePath for the output files created by generator
   */
  outputPath: string

  /**
   * Name of the output file (by default `schema`)
   */
  outputFileName?: string
```


### Usage

```ts
  const schemaPlugin = new SchemaCRUDPlugin({
    format: 'graphql',
    outputPath: './src/schema'
  });

  buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createKnexDbProvider(db),
    plugins: [
      schemaPlugin
    ]
  });
```

## Extending schema using other plugins

You can extend `SchemaCRUDPlugin` if you want to alter the customise the schema or resolver generation.