---
id: relationships
title: Relationships
---

## Database Relationships

Graphback supports `one-to-one` and `one-to-many` relationships and provides out of the box support for the schema and resolvers accordingly.

### OneToOne

The `1:1` relation can be simply declared by:
```graphql
type Profile {
  user: User!
}
```
which will create the relationship via a column in the `profile` table using column `userId`. You can customize the field which tracks the relationship using directives.
```graphql
type Profile {
  """
  @db.oneToOne: 'yourCustomField'
  """
  user: User!
}
```

This creates a `yourCustomFieldId` in the `profile` table.

### ManyToOne

The `m:1` relation is declared like so:

```graphql
type Comment {
  note: Note!
}
```

This creates a column `noteId` in table `comment` to track the relationship. You can customise the field name by using the `@db.manyToOne` annotation which tracks the relationship field.

```graphql
type Comment {
  """
  @db.manyToOne: 'comments'
  """
  customNote: Note
}

type Note {
  comments: [Comment]
}
```
This creates a `customNoteId` column in the `comment` table.

### OneToMany

The `1:m` relationship does not alter the database structure, but can be used to track relationships for querying and subscriptions.

```gql
type Note {
  comments: [Comment]
}
```

This tracks the relationship at the resolver layer so you can query `1:m` data like this:

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

type Comment {
  customNote: Note
}
```

