---
id: crud-client
title: ClientCRUD Plugin
sidebar_label: ClientCRUD
---

The `ClientCRUDPlugin` plugin creates your GraphQL schema with all input types, Query, Mutation and Subscription fields following recommended patterns from [GraphQL CRUD](https://graphqlcrud.org/).
The plugin also creates your CRUD resolvers to use with your GraphQL schema.

## Installation

```bash
yarn add @graphback/codegen-schema
```

To execute this plugin on-demand, you will use the [Graphback CLI](../graphback-cli). Install it as a devDependency in your project.

```bash
yarn add -D graphback-cli
```

## Usage

It is recommended to use the Graphback CLI for certain Graphback plugins, such as those that can modify files which your application depends on. This will prevent hidden oraccidental file modifications that would otherwise happen during start-up, which might cause issues in your application.

To load the `ClientCRUDPlugin` plugin, it should be configuration in a `.graphqlrc` [GraphQL Config](https://graphql-config.com) file. The Grahback CLI can dynamically load and execute plugins from a `.graphqlrc` file.

```yaml title=".graphqlrc"
schema: './src/schema.graphql'
documents: './client/src/graphql/**/*.graphql'
extensions:
  graphback:
    # path to data mode file(s)
    model: './model/datamodel.graphql'
    plugins:
      graphback-schema:
        outputPath: './src/schema/schema.graphql'
      graphback-client:
        outputFile: './client/src/graphql/graphback.graphql'
```

The `SchemaCRUDPlugin` should be defined before `ClientCRUDPlugin` as `graphback-schema` to ensure the latest schema is used to generate client documents.

See [SchemaCRUDPlugin](./schema-crud-plugin) for an installation and configuration guide.

Run [`yarn graphback generate`](../graphback-cli#generate) to execute plugins from the `.graphqlrc` config file on-demand.

```bash
$ yarn graphback generate
Generation successful!
Done in 0.74s.
```

The client documents will be created in a file called `./client/src/graphql/graphback.graphql`.

## Configuration

Below is a full list of the available configuration options for this plugin.

| Argument                    	| Description                                                                 	| Type     	|
|---------------------------	|-----------------------------------------------------------------------------	|----------	|
| `pluginConfig.outputFile` 	| Relative path to the GraphQL documents to be created.<br/><br/> Example: `"/path/to/documents.graphql"`. <br/><br/>Supported file extensions: `.ts`, `.graphql` | `string` 	|
