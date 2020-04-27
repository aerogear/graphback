---
title: Introduction
id: concepts
---

## Introduction

The target of Graphback is to provide tooling for generating fully functional backend and client side code on top of your existing application and widely available starter applications.
Graphback making prototyping applications very easy by generating source code and reducing number of boilerplate components. With Graphback developers can focus more on delivering business value and their business model that will be represented as GraphQL schema. Developers can choose different starting stack database and extensions to build their production ready backend in a very short amount of time.

Graphback generates codebase that can be edited and customized.
Server side code will follow the best patterns of the writing database schema and allow users to benefit from the rich environment of GraphQL modules that can be applied out of the box.

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

Graphback provides a set of the GraphQL annotations that allow providing hints for the generation process to customize output source code. Based on provided model Graphback will generate a set of queries, mutations, and subscriptions together with resolvers that will by default connect with a database of your choice. 

Input model can contain custom queries and mutations that can be implemented manually by developers at a later stage.

## Generated source code

Generated server side code will consist of the template together with additional elements:

- `./model` folder will contain input schema
- `./resolvers` folder will contain generated and custom GraphQL resolvers for the project.
- `./client` folder will contain client side queries

All locations can be changed in `graphback.json` configuration file in your project root

## Runtime CRUD layer

Code generators produce a large amount of the code that needs to be maintained later.
Having generator code diverging from original form will prevent developers to utilize generators at later stage. 
Additionally writing your custom handlers is hard as you will always need to start from scratch and benefit from the existing layers that provide support for subscriptions and data access. 
Graphback utilizes runtime layer that provide data access methods with support for extensibility.

For more information please refer to [`runtime`](/docs/runtime) documentation

## Database migrations

To offer fully comprehensive getting started experience Graphback provides database migration capabilities. 
For more information please refer to [`migrations`](/docs/database-schema-migrations) documentation 
