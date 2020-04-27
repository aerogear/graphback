---
title: Graphback CRUD Client Queries Plugin
sidebar_label: CRUD Client Queries
id: crud-client
---

## Graphback CRUD Client plugin

Graphback client plugin allows users to generate client-side queries based on the model and CRUD settings.
Developers can embed generated queries into their client-side applications.
Generated queries are compatible with all major GraphQL plugins like Apollo and URQL.

## Installation

```
npm install @graphback/codegen-client
```

## Usage

Client-side queries can be consumed inside any application. 
When using any GraphQL Clients queries can be compiled and passed to the client methods. 
For example:

```ts
apolloClient.mutate(createUserQuery)
```

Plugin allows to create files in many formats to suit the needs of your application.

Please refer to ts-apollo-fullstack app for fully functional example:
https://github.com/aerogear/graphback/tree/master/templates/ts-apollo-fullstack

## Plugin Config

```ts
  /**
   * Output language that will be supported
   * Our plugin supports multiple languages for simplicity
   *
   * - ts - typescript file output (backwards compatibility)
   * - graphql - .graphql file
   * - gqlwithfragment - complete graphql queries containing fragments for redundancy
   */
  format: 'ts' | 'graphql' | 'gqlwithfragment'

  /**
   * RelativePath for the output files created by generator
   */
  outputPath: string
```

Example plugin configuration in YAML: 
```yml
 plugins:
  graphback-client:
    format: 'graphql'
    outputPath: ./client/src/graphql
```

> Note: Plugin require `crud` configuration specified as part of the `graphback` extension 


## How it works

Graphback asks whether you want to generate client-side queries in the `graphback config` command. Answering 'yes' will setup client generator plugin in your config.

For a data model having
```
type Note {
  id: ID!
  title: String!
  description: String!
}
```
running `graphback generate` will generate queries and mutations that are enabled in crud config section.
