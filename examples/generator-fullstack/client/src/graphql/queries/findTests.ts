import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const findTests = gql`
  query findTests($id: ID, $name: String) {
    findTests(fields: {id: $id, name: $name}) {
      ...TestFields
    }
  }

  ${TestFragment}
`
