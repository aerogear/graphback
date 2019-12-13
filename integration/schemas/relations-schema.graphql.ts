
export const schema =
  `type Item {
    id: ID!
    name: String
    title: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    description: String
    item: Item
  }
`

