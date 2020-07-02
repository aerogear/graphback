---
id: introduction
title: Why use Graphback?
sidebar_label: Why use Graphback?
---

Graphback simplifies application development by generating a ready-to-use API from data models to access data from one or more data sources. Graphback uses [GraphQL](https://graphql.org) and [GraphQLCRUD](https://graphqlcrud.org/) to make it easy get the data you need, and follows the convention over configuration paradigm to to reduce the amount of setup and boilerplate costs associated with creating GraphQL applications.

Graphback provides a number of independent, interoperable libraries and tools to create and develop modern applications. 
With Graphback you can build and deploy a scalable data-driven GraphQL API, complete with real-time updates and data synchronization capabilities, using either a MongoDB or PostgreSQL database which is automatically created from your GraphQL schema. 
Graphback can also create client-side GraphQL documents for your mobile or web app, bootstrapping your entire application instantly.

## Benefits

### Focus on your data

Graphback bootstraps your entire application using the types described in your GraphQL schema to instantly create an API with data sources and a ready-to-use CRUD implementation of [GraphQLCRUD](https://graphqlcrud.org/).

This enables you to spend more time focusing on your data to deliver the core business value of your application or service.

### Database migrations

For PostgreSQL users, GraphQL Migrations can migrate your database schema to match the data described in your GraphQL schema.

### Easy to extend

Graphback was designed to work with your existing GraphQL API as well as for greenfield projects. Graphback also has its own plugin system, so you can create your own plugins or use some of the community plugins that are available.

## How it works

![](/img/diagramsmall.png)

1. Graphback uses your data models, written as GraphQL types, to instantly build a GraphQL CRUD API.

```graphql
"""
@model
"""
type User {
  id: ID!
  name: String!
}
```

2. Next, choose one of the Graphback supported data sources.

3. Start your application.