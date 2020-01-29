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
