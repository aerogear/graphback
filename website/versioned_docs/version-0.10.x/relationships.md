---
title: Relationships
id: relationships
---

## Database Relationships

Graphback supports `one-to-one`, `one-to-many` and `many-to-one` relationships and provides out of the box support for the schema and resolvers accordingly.

### OneToOne

```graphql
type Profile {
  user: User!
}

type User {
  profile: Profile!
}
```

This creates a relationship via a `userId` column in the `profile` table and a `profileId` column in the `user` table. You can customize the field which tracks the relationship using annotations:

```graphql
type Profile {
  profileUser: User!
}

type User {
  """
  @db.oneToOne: 'profileUser'
  """
  profile: Profile!
}
```

This creates a `1:1` relationship between `profile.profileUserId` and `user.profileId`.

### OneToMany

```gql
type Note {
  comments: [Comment]
}
```

This creates a `noteId` column in the `comment` table. You can also customise the field name:

```gql
type Note {
  """
  @db.oneToMany: 'commentNote'
  """
  comments: [Comment]
}
```

This will create a `commentNoteId` foreign key column in the `comment` table.

### ManyToOne

```graphql
type Comment {
  note: Note!
}
```

This creates a `noteId` foreign key column in the `comment` table which tracks to `note.commentId`.

You can also customise the field name:

```graphql
type Comment {
  commentNote: Note
}
```

This will create a `commentNoteId` foreign key column in the `comment` table.

You can track to custom field names in the relation table using the `@db.manyToOne` annotation.

```gql
type Comment {
  """
  @db.manyToOne: 'noteComments'
  """
  note: Note
}
```

This tracks to the GraphQL `Note.noteComments` field.