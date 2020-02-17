---
id: gettingstarted
title: Introduction to Graphback
sidebar_label: What is Graphback
---

Graphback is a package and CLI tool that can help you bootstrap a GraphQL server and client.
Graphback can help you to focus on your data and remove all boilerplate related with the wider adoption of GraphQL.

The target of Graphback is to provide tooling for generating fully functional backend and client side code on top of your existing application or widely available starter applications. Graphback makes prototyping applications very easy by generating source code and reducing the number of GraphQL related boilerplate on the server and the client. With Graphback developers can focus more on delivering business value and business model that will be represented as a GraphQL schema. 

All you need to do with Graphback is to specify your data as GraphQL Types:

<img src="/img/d1.png" width="50%" height="50%"></img>


GraphQL Types annotated with `@model` will be processed by Graphback to give you fully functional backend and client side 
queries that follow CRUD specification. 
Graphback will work with your current GraphQL enabled Node.js application or can help you to create new one.

![](/img/diagramsmall.png)

## What Graphback can do for you?

- Generate CRUD based client side queries, schema and Node.JS resolvers for your input model
- Support additional use cases by variety of community plugins
- Migrate your database to work with your data model and changes in schema
- Create your backend with CRUD API without code thanks to graphql-serve

![](/img/sourcecode.png)

