import gql from "graphql-tag"
import { TestFragment } from "../fragments/Test"

export const updateTest = gql`
  
  mutation updateTest($id: ID!, $name: String) {
    updateTest(id: $id, input: {name: $name}) {
      ...TestFields
    }
  }


  ${TestFragment}
`
