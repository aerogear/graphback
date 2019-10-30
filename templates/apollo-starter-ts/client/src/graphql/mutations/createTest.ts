import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const createTest = gql`
  mutation createTest($id: ID, $name: String) {
    createTest(input: {name: $name}) {
      ...TestFields
    }
  }

  ${TestFragment}
`
