import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const createTest = gql`
  mutation createTest($name: String) {
    createTest(input: {name: $name}) {
      ...TestFields
    }
  }


  ${TestFragment}
`
