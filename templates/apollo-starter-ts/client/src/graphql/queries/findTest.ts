import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const findTest = gql`
  query findTest($id: ID, $name: String) {
    findTest(fields: {id: $id, name: $name}) {
      ...TestFields
    }
  }

  ${TestFragment}
`
