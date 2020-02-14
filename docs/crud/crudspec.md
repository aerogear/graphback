---
id: crudspec
title: Graphback CRUD Specification
sidebar_label: CRUD Specification
---

## Graphback CRUD specification

GraphQL is a flexible query language supporting many different data access patterns. 
In practice, simple CRUD operations turn out to be a very common pattern. 
Standardising this very common pattern enables the community to build tooling specific to the common CRUD style API.

Graphback uses CRUD format for defining standard data access methods for your model. 
For every model object in your schema we can provide folowing operations:

- CREATE
- UPDATE
- DELETE
- READ
- FIND_ALL (all dataset - flavours with Pagination, Delta etc.)
- FIND (filtering - flavours with Pagination, Delta etc.)
- SUBSCRIBE TO CREATE
- SUBSCRIBE TO UPDATE
- SUBSCRIBE TO DELETE

Target of the Graphback is to prevent anemic mutations and locking developers into CRUD model. 
That is why we provide only basic filtering on the GraphQL level as we believe that business model 
needs to be implemented and hidden behind resolvers. 

That is why every Query or Mutation included in the schema will be ignored by Graphback, but also supplied in the result schema giving developers 
flexibility to provide their own implementations on the server. Graphback tries to minimize amount of the extra types 

## Example

When specifying single object as input GraphQL Schema as follows:

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


```graphql
input NoteInput {
  id: ID
  title: String
  description: String
}

type Query {
  findAllNotes: [Note]!
  findNotes(fields: NoteInput): [Note]!
} 

type Mutation {
  createNote(input: NoteInput): Note!
  updateNote(input: NoteInput): Note!
  deleteNote(input: NoteInput): Note!
} 

type Subscription {
  newNote(input: NoteInput): Note!
  updatedNote(input: NoteInput): Note!
  deletedNote(input: NoteInput): Note!
} 
```

Each Graphback plugin will follow this specification and base on it when creating resolvers or client side queries.