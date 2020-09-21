---
id: graphback-cli
title: Graphback CLI
sidebar_label: Graphback CLI
---

Graphback helps you to kickstart your experience with any existing GraphQL implementation by generating backend and client side CRUD layer using your [GraphQL data model](../model/datamodel.md). The CLI exposes a single `generate` command.  

## Installation

You can add `Graphback CLI` on your existing GraphQL project using either of the following commands. 

With npm:

```bash
npm install --save-dev graphback-cli
```

Or with yarn: 

```bash
yarn add --dev graphback-cli
```

## Configuration

You project must contain the configuration file that follows the format described by the [graphql-config](https://graphql-config.com/introduction).

Taking a `.graphqlrc.yml` configuration file for example, your configuration should have the following minimum required entry:

```yaml
## Please review configuration and adjust it for your own project
schema: ./src/schema/schema.graphql
extensions:
  graphback:
    model: ./model/**/*.graphql
    ## You can add as many Graphback plugins as you wish
    ## Here we are only adding the Schema and Client plugin
    plugins:
      graphback-schema:
        format: graphql
        outputPath: ./src/schema/schema.graphql
      graphback-client:
        format: 'graphql'
        outputFile: ./src/graphql/graphback.graphql
      graphback-datasync:
        format: 'graphql'
        packageName: '@graphback/datasync'
        outputPath: ./src/schema/schema.graphql
```

:::note
If you used [graphql-cli](https://github.com/Urigo/graphql-cli) to initialize
 the project, this file will be automatic setup for you. Otherwise, you can still use the `init` command from the CLI to initialize this configuration setup.
:::

## Commands

### generate

The `generate` command will invoke the plugins defined in your `.graphqlrc` (see [Configuration](#Configuration)). Check out our [Plugin Overview](../plugins/overview.md) for information on what Graphback plugins can do.

The `generate` command can be executed by running `graphback generate` (if installed globally) or `yarn graphback generate`. 

For simplicity you can add it to the `package.json` `scripts` config:

```json
"generate": "graphback generate"
```

And finally, use npm or yarn to run it:

With yarn:

```bash
yarn generate
```

With npm:

```bash
npm run generate
```

:::note
Graphback CLI is now part of the [graphql-cli](https://github.com/Urigo/graphql-cli) command line tool. Please consider installing it for wider set of features
::: 
