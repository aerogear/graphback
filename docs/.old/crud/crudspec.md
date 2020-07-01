---
id: crudspec
title: Graphback CRUD Specification
sidebar_label: CRUD Specification
---

GraphQL is a flexible query language supporting many different data access patterns. 
In practice, simple CRUD operations turn out to be a very common pattern. 
Standardising this very common pattern enables the community to build tooling specific to the common CRUD style API.

Graphback uses https://graphqlcrud.org specification for defining standard data access methods for your model. 
For every model object in your schema we can provide 
GraphQL Queries, Mutations and Subscriptions compatibile with 
GraphQLCRUD spec.

Target of Graphback is to prevent anemic mutations and locking developers into CRUD model. 

Each features are mapped differently depending on the underlying database.

Every Query or Mutation included in the schema will be ignored by Graphback, but also supplied in the result schema giving developers flexibility to provide their own implementations on the server. Graphback tries to avoid adding extra types to your schema that you might not use in your application.

When specifying a single object as input GraphQL Schema as follows:

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  description: String
  likes: Int
}
```

Graphback will decorate it with additional Queries, Mutations and Subscriptions along with InputTypes and other wrapper types that are needed.

Each Graphback plugin will follow this specification and base on it when creating resolvers or client side queries.