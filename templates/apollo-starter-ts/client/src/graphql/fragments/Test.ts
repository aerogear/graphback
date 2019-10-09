import gql from "graphql-tag"

export const TestFragment = gql`
  fragment TestFields on Test {
    id
    name
  }
`
