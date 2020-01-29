import gql from "graphql-tag"
import { NoteFragment } from "../fragments/Note"

export const updateNote = gql`
  mutation updateNote($id: ID!, $title: String!, $description: String) {
    updateNote(id: $id, input: {title: $title, description: $description}) {
      ...NoteFields
    }
  }


  ${NoteFragment}
`
