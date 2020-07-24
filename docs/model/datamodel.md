---
id: datamodel
title: Data Model
sidebar_label: Data Model
---

Graphback generates a GraphQL API and client-side documents using your data models. The data models are represented in the GraphQL Schema language as GraphQL types.

In this section you will learn how to design and configure your data models for use with Graphback and how they can be used for multiple datasources.

## Model

Graphback processes GraphQL Schema types annotated with `@model`.
Adding this annotation to your type will generate CRUD resolvers, services, data providers and client queries following the [GraphQLCRUD](https://graphqlcrud.org) format. For the full annotation definition see [`@model`](./annotations#model).

```graphql
"""
@model
"""
type Note {
  ...
}
```

:::info
Check out the [Graphback Scalars](./scalars.md) chapter to see the list of scalars supported out of the box. 
:::

## Primary key

Graphback requires each data model to have one primary key field which is used to uniquely represent every object in the database.

### PostgreSQL

For PostgreSQL, the default primary key format is `id: ID!`.

```graphql
"""
@model
"""
type Note {
  """Default primary key format for PostgreSQL"""
  id: ID!
  ...
}
```

You can also use the [`@id`](./annotations#id) annotation to set a custom primary field.

```graphql
"""
@model
"""
type Note {
  id: ID!
  """
  This becomes the primary key
  @id
  """
  title: String
  ...
}
```

### MongoDB

If you are using MongoDB you should use `_id: ObjectID`, as `_id` in MongoDB documents is reserved for the primary key.

```graphql
"""
@model
"""
type Note {
  """Primary key format for MongoDB"""
  _id: ObjectID!
  ...
}

scalar ObjectID
```

## Relationships

Graphback provides support for one-to-many, one-to-one and many-to-many relationships.

### OneToMany

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]
}
```

This creates a one-to-many relationship from `Note.comments` to `Comment.note`. If `Comment.note` does not exist Graphback will create it for you, otherwise you can define it yourself.

For more on creating one-to-many relationships see the [`@oneToMany`](./annotations#onetomany) annotation reference guide.

### OneToOne

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne
  """
  user: User!
}
```

This creates a one-sided relationship between the `Profile` and `User` models.

For more on creating one-to-one relationships see the [`@oneToOne`](./annotations#onetoone) annotation reference guide.

### ManyToMany

To create a many-to-many relationship, add a model for your join table and use two one-to-many relationships.

```graphql
""" 
@model 
"""
type Note {
  id: ID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  authors: [NoteAuthor]
}

"""
@model
"""
type NoteAuthor {
  id: ID!
}

"""
@model
"""
type User {
  id: ID!
  name: String
  """
  @oneToMany(field: 'author')
  """
  notes: [NoteAuthor]
}
```

For more on creating many-to-many relationships see the [`@oneToMany`](./annotations#onetomany) annotation reference guide.

## Type fields

You can use GraphQL types to get strongly-typed fields which maps to a JSON column in PostgreSQL or an embedded/nested document in MongoDB.

```graphql
"""
@model
"""
type Note {
  id: ID!
  """
  @db(type: 'json')
  """
  comments: [Comment]
}

"""
A custom type that does 
not have a database table
"""
type Comment {
  id: ID!
  text: String
}
```

> NOTE: The `@db(type: 'json')` annotation is only required for PostgreSQL.
