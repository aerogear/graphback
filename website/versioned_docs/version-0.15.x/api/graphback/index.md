---
id: "index"
title: "graphback"
sidebar_label: "README"
---

## Graphback

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"/>
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

## Motivation 

Graphback helps you to kickstart your experience with any existing GraphQL implementation
by generating backend and client side CRUD layer using your GraphQL data model.

**Documentation**: https://graphback.dev

**Repository**: https://github.com/aerogear/graphback/

## Graphback usage

Graphback package provides programatic API for the Graphback ecosystem.
In most of the cases you can use graphback by utilizing graphback-cli package that will expose all useful commands and cover most of the use cases.

Graphback package provides two ways to initialize entire ecosystem from the code

- GraphbackRuntime
- GraphbackGenerator

## GraphbackGenerator

Graphback generator can be used to initialize Graphback plugins that will transform schema and generate source code.
Graphback Generator will utilize GraphQL-Config with underlying plugins

```ts
  const config = await loadConfig({
    rootDir: process.cwd(),
    extensions: [graphbackConfigExtension]
  });
  const project = config.getProject('default')
  const graphbackConfig = project.extension('graphback');

  const generator = new GraphbackGenerator(schemaDocument, graphbackConfig)
  generator.generateSourceCode();
```

For full usage please check: 
https://github.com/aerogear/graphback/blob/master/packages/graphback-cli/src/components/generate.ts#L42-L43

## Graphback Runtime

Runtime class allows to initialize Graphback CRUD layer without code generation. 
All resolvers and schema are created in-memory

For full usage and examples please check runtime example application
https://github.com/aerogear/graphback/tree/master/templates/ts-apollo-runtime-backend
