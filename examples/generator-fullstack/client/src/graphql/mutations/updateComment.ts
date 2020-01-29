import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const updateComment = gql`
  mutation updateComment($id: ID!, $description: String) {
    updateComment(id: $id, input: {description: $description}) {
      ...CommentFields
    }
  }


  ${CommentFragment}
`
