---
id: datamodel
title: Data Model
---

## Model

Graphback is processing GraphQL Schema Language to generate server and client side artifacts to 
introduce best patterns for production ready applications and reduce amount of boilerplate related with GraphQL usage.
Developers can focus on data and application requirements by modeling them using GraphQL DSL.

Graphback operates on GraphQL Schema types that are annotated with `""" @model """`.
Adding this annotation to your type will enable Graphback Plugins to add additional elements to the schema
and generate related code in language of your choice. 

Graphback will work with any GraphQL compatible DSL schema even with already defined Queries and Mutations etc.

## Example

```graphql
""" @model """
type Note {
  id: ID!
  title: String!
  description: String!
  comment: [Comment!]!
}

""" @model """
type Comment {
  id: ID!
  title: String!
  description: String!
  note: Note!
}

type Query {
  getNoteWithBigestNumberOfComments: Note!
}

```

Graphback requires your data models to have at least one field with `ID` type that will be used to uniquely represent every object in the database. 
When your type has multiple `ID` scalars defined you can use `db.primary` annotation to define which one should be used as primary key.
Objects can also reference each other using relationships.