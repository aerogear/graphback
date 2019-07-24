---
id: concepts
title: Introduction
---

## Introduction

The target of GraphBack is to provide tooling for generating fully functional backend and client side code based on different templates and proven server side technologies.
GraphBack making prototyping applications very easy. 
With Graphback developers can focus more on delivering business value and their business model that will be represented as GraphQL schema. Developers can choose different starting stack database and extensions (called GraphQL-Modules) to build their production ready backend in very short amount of time.

Graphback generates Node.js application with an entire codebase that can be edited and customized.
Server side code will follow the best patterns of the writing database schema and allow users to benefit from the rich environment of GraphQL modules that can be applied out of the box.
Modules can include Authentication, Logging and Monitoring features without any effort.

## Input Model - GraphQL Schema 

Graphback is processing GraphQL Schema DSL language to generate server and client side artifacts to speed up development.
Developers can focus on data and application requirements by modeling them using GraphQL DSL.
For example:

```
type Note {
  id: ID!
  title: String!
}

type Query {
  customOperation(): String
}
```

GraphBack provides set of the GraphQL directives that allow to provide hints for generation process to customize output source code. Based on provided model GraphBack will generate set of queries, mutations and subscriptions together with resolvers that will by default conenct with database of your choice. 

Input model can contain custom queries and mutations that can be implemented manually by developers at later stage.

## Generated source code

Generated server side code will consist of the template together with additional elements:

- `./model` folder will contain input schema
- `./resolvers` folder will contain generated and custom GraphQL resolvers for the project.
