import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const findComments = gql`
  query findComments($id: ID!, $description: String) {
    findComments(fields: {id: $id, description: $description}) {
      ...CommentFields
    }
  }

  ${CommentFragment}
`
