import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const createComment = gql`
  mutation createComment($description: String) {
    createComment(input: {description: $description}) {
      ...CommentFields
    }
  }


  ${CommentFragment}
`
