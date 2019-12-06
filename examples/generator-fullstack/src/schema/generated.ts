
export const schemaString = `


type Note {
  id: ID!
  title: String!
  description: String!
  comments: [Comment!]
}

type Comment {
  id: ID!
  title: String!
  description: String!
  note: Note
}

type Test {
  id: ID
  name: String
}

input NoteInput {
  title: String!
  description: String!
}

input CommentInput {
  title: String!
  description: String!
  noteId: Int!
}

input TestInput {
  name: String
}

input NoteFilter {
    id: ID
    title: String
    description: String
}

input CommentFilter {
    id: ID
    title: String
    description: String
    noteId: Int
}

input TestFilter {
    id: ID
    name: String
}

type Query {
  findNotes(fields: NoteFilter!): [Note!]!
  findComments(fields: CommentFilter!): [Comment!]!
  findTests(fields: TestFilter!): [Test!]!
  findAllNotes: [Note!]!
  findAllComments: [Comment!]!
  findAllTests: [Test!]!
  ## Custom queries
  getLikedNotes(id: ID!, names: [String]!): Note!
}

type Mutation {
  createNote(input: NoteInput!): Note!
  createComment(input: CommentInput!): Comment!
  createTest(input: TestInput!): Test!
  updateNote(id: ID!, input: NoteInput!): Note!
  updateComment(id: ID!, input: CommentInput!): Comment!
  updateTest(id: ID!, input: TestInput!): Test!
  ## Custom mutations
  likeNote(id: ID!): Note!
}

`;
