---
id: datamodel
title: Defining your Data Model
---

## Model

The Data model file is written in GraphQL syntax where you define your data types.

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
```

Every data model needs to have `id: ID!` field that will be used to uniquely represent every object in the database. Objects can also reference each other using relationships.

For more information please refer to [`migrations`](/docs/database-schema-migrations) documentation 
