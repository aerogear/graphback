---
id: datamodel
title: Defining your Data Model
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

## Database Relationships

Graphback supports `one-to-one` and `one-to-many` relationships and provides out of the box support for the schema and resolvers accordingly.

### One To One

The `1:1` relation can be simply declared by:
```graphql
type Profile {
  user: User!
}
```
which will create the relationship via a column in the `user` table using column `profileId`. You can customize the field which tracks the relationship using directives.
```graphql
type Profile {
  user: User! @OneToOne(field: "yourCustomField")
}
```

### One To Many

The `1:m` relation is declared with array syntax.
```graphql
type Note {
  comment: [Comment!]!
}
```
This creates a column `noteId` in table `comment` to track the relationship. You can similarily customize the column name as follows
```graphql
type Note {
  comment: [Comment!]! @OneToMany(field: "yourCustomField")
}
```
which creates `yourCustomField` in table `comment`.