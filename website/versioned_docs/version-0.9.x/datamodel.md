---

title: Defining your Data Model
id: datamodel
---

## Model
The Data model file is written in GraphQL syntax where you define your types along with custom directives for additional use cases.

## Example

```graphql
type Note {
  id: ID!
  title: String!
  description: String!
  ## Relationship
  comment: [Comment]!
}

type Comment {
  id: ID!
  title: String!
  description: String!
}
```