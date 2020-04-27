---
title: Defining your Data Model
id: datamodel
---

## Model

The Data model file is written in GraphQL syntax where you define your data types.

## Example

```graphql
type Note {
  id: ID!
  title: String!
  description: String!
  ## Relationship
  comment: [Comment!]!
}

type Comment {
  id: ID!
  title: String!
  description: String!
  note: Note!
}
```

Every data model needs to have `id: ID!` field that will be used to uniquely represent every object in the database. Objects can also reference each other using relationships.

For more information please refer to [`migrations`](/docs/database-schema-migrations) documentation 
