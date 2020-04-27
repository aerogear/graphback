---

title: Relationships
id: relationships
---

## Database Relationships

Graphback supports `one-to-one`, `one-to-many` and `many-to-one` relationships and provides out of the box support for the schema and resolvers accordingly.

### OneToOne

The `1:1` relation can be declared by:

```graphql
type Profile {
  user: User!
}

type User {
  profile: Profile!
}
```

which will create the relationship via a `userId` column in the `profile` table and a `profileId` column in the `user` table. You can customize the field which tracks the relationship using annotations:

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

### ManyToOne

The `m:1` relation is declared like so:

```graphql
type Comment {
  note: Note!
}
```

This creates a `noteId` column in the `comment` table to track the relationship.

You can also customise the field name:

```graphql
type Comment {
  customNote: Note
}
```

This creates `customNoteId` in the `comment` table.

You can track to custom field names in the relation table using the `@db.manyToOne` annotation.

```gql
type Comment {
  """
  @db.manyToOne: 'noteComments'
  """
  note: Note
}
```

This tracks to `Note.noteComments`.

### OneToMany

The `1:m` relationship does not alter the database structure, but can be used to track relationships for querying and subscriptions.

```gql
type Note {
  comments: [Comment]
}
```

To create the foreign key in the relation table, see [ManyToOne](#ManyToOne).

This tracks the relationship at the resolver level, so you can query `1:m` data like so:

```gql
query allNotes {
  findAllNotes {
    id
    title
    description
    comments {
      id
      title
      description
    }
  }
}
```

It is possible to track `1:m` relations that use custom field names with the `@db.oneToMany` annotation:

```gql
type Note {
  """
  @db.oneToMany: 'customNote'
  """
  comments: [Comment]
}
```

This tracks to the `Comment.customNote` GraphQL type.

