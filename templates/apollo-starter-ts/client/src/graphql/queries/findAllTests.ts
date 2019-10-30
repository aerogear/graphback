import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const findAllTests = gql`
  query findAllTests {
    findAllTests {
      ...TestFields
    }
  }

  ${TestFragment}
`
