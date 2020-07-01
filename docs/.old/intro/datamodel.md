---
id: datamodel
title: Data Model
---
Graphback processes your data model to generate a server and client side using best patterns for production ready applications and reduces amount of boilerplate code needed to be added by you. Developers can focus on data and application requirements by modeling them using a GraphQL SDL.

1. [Model](##Model)
2. [Primary key](##Primary_key)
3. [Relationships](##Relationships)

For more information on getting started with Graphback, please https://graphback.dev/


## Model

Graphback operates on GraphQL Schema types annotated with `@model`. Refer to [this](../metadata.md) page for complete documentation of `@model` and other annotations.
Adding this annotation to your type will enable Graphback to add additional elements to the schema and generate related code in JavaScript or TypeScript.

```graphql
"""
@model
"""
type Note {
  ...
}
```

## Primary key

Graphback requires your data models to have one primary key field which is used to uniquely represent every object in the database.

By default Graphback will use `id: ID` as the primary key.

```graphql
"""
@model
"""
type Note {
  id: ID!
  ...
}
```

You can set a custom primary key field using the `@id` field annotation.

```graphql
"""
@model
"""
type Note {
  id: ID!
  """
  @id
  """
  email: String
}
```

Your data models can also contain custom types that are not Graphback models as shown below. 
However, it is expected that you provide the custom resolvers for your custom type as Graphback will not generate one for you.
```graphql
"""
@model
"""
type Note {
  id: ID!
  """
  @id
  """
  email: String

  """
  Field from a custom type that is not a Graphback model
  """
  comments: [Comment]
}

"""
A custom type
"""
type Comment {
  id: ID!
  text: String
}
```

## Relationships

Graphback provides support for one-to-many and one-to-one relationships.

### OneToMany

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany field: 'note'
  """
  comments: [Comment]
}
```

This creates a one-to-many relationship between `Note.comments` and `Comment.note`. If `Comment.note` does not exist Graphback will generate it for you, otherwise you can define it yourself.

By default this maps to `comment.noteId` in the underlying data source. Yon can customise this by adding `key` to the `@oneToMany` annotation:

```graphql
"""
@model
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany field: 'note', key: 'note_id'
  """
  comments: [Comment]
}
```

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

By default this maps to `profile.userId` in the underlying data source. Yon can customise this by adding `key` to the `@oneToOne` annotation:

```graphql
"""
@model
"""
type Profile {
  id: ID!
  """
  @oneToOne key: 'user_id'
  """
  user: User!
}
```

### ManyToMany

To create a many-to-many relationship, add a model for your join table and use two one-to-many relationship mappings to create the relationship.

```graphql
""" 
@model 
"""
type Note {
  id: ID!
  title: String!
  description: String
  """
  @oneToMany field: 'note'
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
  @oneToMany field: 'author'
  """
  notes: [NoteAuthor]
}
```
