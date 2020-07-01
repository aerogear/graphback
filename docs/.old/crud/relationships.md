---
id: relationships
title: Model Relationships
sidebar_label: Model Relationships
---

> NOTE: This document is outdated and needs more work

## Database Relationships

Graphback supports `one-to-one` and `one-to-many` relationships and provides out of the box support for the schema and resolvers accordingly.

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

"""
@model
"""
type User {
  id: ID!
  name: String
}
```

This creates a relationship via a `userId` column in the `profile` table. You can customize the key tracking the relationship with the `key` annotation:

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

"""
@model
"""
type User {
  id: ID!
  name: String
}
```

This maps `Profile.user` to `profile.user_id` in the database.

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

This creates a relationship between `Note.comments` and `Comment.note` and maps to `comment.noteId` in the database. If `Comment.note` does not exist it will be generated for you.

With the `key` annotation you can customise the database column to map to.

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

This maps to `comment.note_id` in the database.