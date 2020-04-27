---

title: Client-side Queries
id: clientqueries
---

Graphback allows users to generate client-side queries based on the data model. All the queries/mutations/subscriptions
which are generated through `graphback generate` for the user can also be generated as client-side queries. Users may follow up with `create-react-app` or `apollo-client` to create client.

## How it works
Graphback asks whether you want to generate client-side queries in the `graphback init` command. Answering it yes,
will set `client` in `config.json` to `true`.

For a data model having
```
type Note {
  id: ID!
  title: String!
  description: String!
}
```
running `graphback generate` will generate all operations which are enabled in `config.json` or using `directives`.

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

## Autogenerating forms based on server-side schema

For react based applications developers can use [uniform.tools](https://uniforms.tools).
Uniforms can be used along with generated client queries to automatically build dynamic forms with labales and validation.
