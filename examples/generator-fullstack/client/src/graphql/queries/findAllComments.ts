import gql from "graphql-tag"
import { CommentFragment } from "../fragments/Comment"

export const findAllComments = gql`
  query findAllComments {
    findAllComments {
      ...CommentFields
    }
  }

  ${CommentFragment}
`
