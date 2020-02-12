---
id: introduction
title: What is Graphback
sidebar_label: What is Graphback
---

Graphback is a package and CLI tool that can help you bootstrap a GraphQL server and client.
Graphback can help you to focus on your data and remove all boilerplate related with the wider adoption of GraphQL.
All you need to do with Graphback is to specify GraphQL types with `@model` annotation that 
will be then processed by Graphback to give you fully functional backend and client side queries that support CRUD specification. 

![](https://graphback.dev/img/diagram.png)


## What Graphback can do for you?

- Generate CRUD based client side queries, schema and Node.JS resolvers for your input model
- Support various use cases by generator plugins
- Create your backend with CRUD API without code thanks to graphql-serve and graphback-runtime

## Graphback Code generation

Graphback plugins can be used to modify schema and generate various resources that can be included into your existing project or one of the maintained Graphback templates.
Currently we support multiple formats of data including:
    - Typescript
    - JavaScript
    - GQL (for Schema and client side documents)

## Graphback CRUD Runtime

Runtime layer allows you to dynamically swap datasource for different models without code generation. 
By default Graphback will assume that all your data comes from underlying database layer and even create tables for you,
but you can also point out any individual method or model to different data source. 
Abstraction for Services and DB layer gives developers flexibility to support many sources of the data.

## Database migrations

To give you full experience of the out of the box backend graphback provides option for automatic database migrations.
Database migrations are based on your model with various options for table mapping. 
Currently we support many relational databases by utilizing Knex.js library for performing migrations.

## Integration with existing GraphQL Ecosystem

Graphback integrates with various libraries like:

- GraphbQL-Codegen
- GraphQL-Config
