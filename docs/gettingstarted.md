---
id: gettingstarted
title: Introduction to Graphback
sidebar_label: What is Graphback
---

Graphback is a package and CLI tool that can help you bootstrap a GraphQL server and client.
Graphback can help you to focus on your data and remove all boilerplate related with the wider adoption of GraphQL.

The target of Graphback is to provide tooling for generating fully functional backend and client side code on top of your existing application and widely available starter applications. Graphback makes prototyping applications very easy by generating source code and reducing the number of GraphQL related boilerplate on the server and the client. With Graphback developers can focus more on delivering business value and business model that will be represented as a GraphQL schema. Developers can use their existing projects or choose one of production ready templates we provide. 
Graphback enables developersto build their production ready backend in a very short amount of time with out of the box CRUD support.
Developers have freedom of creating their own Queries and Mutations that are compatibile with GraphQL spec. 

All you need to do with Graphback is to specify your data as GraphQL Types:

<img src="/img/d1.png" width="30%" height="30%"></img>


GraphQL Types annotated with `@model` will be processed by Graphback to give you fully functional backend and client side 
queries that support our CRUD specification. 
Graphback will work with your current GraphQL enabled Node.js application or can help you to create new one.

![](/img/diagramsmall.png)

## What Graphback can do for you?

- Generate CRUD based client side queries, schema and Node.JS resolvers for your input model
- Support additional use cases by variety of community plugins
- Migrate your database to work with your data model and changes in schema
- Create your backend with CRUD API without code thanks to graphql-serve

![](/img/sourcecode.png)

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

## How can I start using Graphback

Graphback can be used in 3 different flavours depending on your use cases.

1. Using Graphback with Node.js GraphQL boilerplates by utilizing `graphql init`
2. Adding Graphback to your existing project using `graphback config`
3. Initializing Graphback in your code without code generation
