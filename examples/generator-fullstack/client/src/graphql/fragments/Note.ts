import gql from "graphql-tag"

export const NoteFragment = gql`
  fragment NoteFields on Note {
    id
    title
    description
  }
`
