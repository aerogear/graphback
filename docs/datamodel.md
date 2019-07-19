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

All types of database relationships - `1:1, 1:m and n:m` - are supported by the generator.

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
This creates a column `noteId` in table `comment` to track the relationship. You can similarily customize the column name as follows:
```graphql
type Note {
  comment: [Comment!]! @OneToMany(field: "yourCustomField")
}
```

### Many To Many

The `n:m` relation requires you to define it using directives as default.
```graphql
type Note {
  users: [User!]! @ManyToMany //array syntax required  
}
```
This will create a separate table `user_note` to track the relationship using columns `userId` and `noteId`. You can customize the table name as such:
```graphql
type Note {
  users: [User!]! @ManyToMany(tablename: "yourCustomTable")  
}
```
