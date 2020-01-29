import gql from "graphql-tag"

export const CommentFragment = gql`
  fragment CommentFields on Comment {
    id
    description
  }
`
