
export const schemaString = `



  type Test {
    id: ID
    name: String
  }

  input TestInput {
    name: String
  }

  input TestFilter {
    id: ID
    name: String
  }


  type Query {
    findTests(fields: TestFilter!): [Test!]!
    findAllTests: [Test!]!
  }

  type Mutation {
    createTest(input: TestInput!): Test!
    updateTest(id: ID!, input: TestInput!): Test!
  }

`;
