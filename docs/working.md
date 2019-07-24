---
id: working
title: How Graphback works
---

## Introduction

The target of GraphBack is to bind industry templates and sample applications with business logic.
GraphBack making prototyping applications very easy. You can think about your business objects that will be represented as GraphQL schema and objects you want to map and what kind of stack and requirements you want to from set of the predefined base templates and databases we support. 

Graphback generates Node.js application with an entire codebase that is editable and can be later deployed to your own server.  By default, GraphBack will follow the best patterns of the writing database schema and allow users to benefit from the rich environment of GraphQL modules that can be applied out of the box giving developers Authentication, Logging and Monitoring features out of the box.

## GraphQL Schema Input

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

## Templates

Graphback provides users with the choice of setting up a custom environment with features with the help of templates. We plan to provide
templates with multiple use cases including various server frameworks like GraphQL server frameworks like Apollo GraphQL, GraphQL-js and others.

#### [apollo-typescript-starter](https://github.com/aerogear/graphback/tree/master/templates/apollo-starter-ts)
Production ready typescript implementation of GraphQL server using apollo-express framework. Uses knex.js library for database access.

#### [apollo-rest-starter](https://github.com/aerogear/graphback/tree/master/templates/apollo-rest-starter)
Production ready typescript implementation of GraphQL server using apollo-express framework and Sofa library. Sofa enables exposing REST API along with GraphQL based endpoint. 
Uses knex.js library for database access.

## Generated source code

Generated server side code will consist of the template together with additional elements:

`./model` folder will contain input schema
`./resolvers` folder will contain generated and custom GraphQL resolvers for the project.

## Databases
Graphback allows you to configure your database according to your needs. Graphback provides support to multiple databases(MySQL, MongoDB etc).
Currently, we are supporting `PostgreSQL`.


## GraphQL Modules

GraphQL modules provide way to extract common functionalities and decorate existing templates and generated source code. 
For example authentication module will introduce new set of directives that can be used directly in the schema to authorize specific users and roles. Modules integration is currently in progress.

## Commands
### Init
  ```bash
  graphback init <project-name>
  ```
  The command will guide you through a series of questions - choosing a template, bootstraping model - and setup your project for you.

  ![](/img/init.gif)

  You can also provide the template name as argument which will skip the template selection part.
  ```bash
  graphback init <project-name> [template-name]
  ```
### Generate
  ```bash
  graphback generate
  ```
  Generate command will generate schema and resolvers for your GraphQL server based on your datamodel.

### DB
  ```bash
  graphback db
  ```
  Create databases resources based on your datamodel. Currently supports PostgreSQL only
### Watch
  ```bash
  graphback watch
  ```
  Watches for changes in your datamodel and regenerates your schema and resolvers. The watch commands drops your database and recreates it with everty change to datamodel.
