---
id: clientqueries
title: Graphback client
---

Graphback client plugin allows users to generate client-side queries based on the model. A
Developers can embeed generated queries into their client side applications.
Generated queries are compatible with all major graphql plugins like Apollo and URQL

## Config


## How it works

Graphback asks whether you want to generate client-side queries in the `graphback config` command. Answering 'yes' will set `client` in `graphback.json` to `true`.

For a data model having
```
type Note {
  id: ID!
  title: String!
  description: String!
}
```
running `graphback generate` will generate all operations which are enabled in `graphback.json` or using `annotations`.

## Examples
### Fragment
```
import gql from "graphql-tag"

export const NoteFragment = gql`
  fragment NoteFields on Note {
    id
    title
    description
    published
  }
`
```

### Query
```
import gql from "graphql-tag"
import { NoteFragment } from "../fragments/Note"

export const findAllNotes = gql`
  query findAllNotes {
    findAllNotes {
      ...NoteFields
    }
  }

  ${NoteFragment}
`
```

### Mutation
```
import gql from "graphql-tag"
import { NoteFragment } from "../fragments/Note"

export const updateNote = gql`
  mutation updateNote($id: ID!, title: String!, description: String!, published: Boolean!) {
    updateNote(id: $id, input: {title: $title, description: $description, published: $published}) {
      ...NoteFields
    }
  }

  ${NoteFragment}
`
```

### Subscription
```
import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const newComment = gql`
  subscription newComment {
    newComment {
      ...CommentFields
    }
  }

  ${CommentFragment}
`

```