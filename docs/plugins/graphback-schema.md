---
id: crud-schema
title: Graphback CRUD Schema Plugin
sidebar_label: CRUD Schema
---

## Graphback CRUD Schema plugin

Schema plugin generates GraphQL Schema which contain additional Queries, Mutations and Subscriptions
that follow Graphback CRUD specification. Input GraphQL schema is perserved.
Plugin will only process GraphQL Types annotated with `@model`.

## Installation

```bash
npm install @graphback/codegen-schema
```

## Plugin Config

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

Example YML: 
```yml
 plugins:
  graphback-schema:
    format: 'graphql'
    outputPath: ./server/src/schema
```

## Extending schema using other plugins

Schema Plugin is responsibile for saving schema however any other plugin can modify 
schema that will be later saved to the output file.
You can also choose to create multiple schema files that will be later merged together.