
export const schemaString = `


type Note {
  id: ID!
  title: String!
  description: String
  comments: [Comment!]!
}

type Comment {
  id: ID!
  description: String
  commentNote: Note!
}

type Test {
  id: ID
  name: String
}

input NoteInput {
  title: String!
  description: String
}

input CommentInput {
  description: String
  commentNoteId: ID!
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
    description: String
    commentNoteId: ID
}

input TestFilter {
    id: ID
    name: String
}

type Query {
  findNotes(fields: NoteFilter!): [Note!]!
  findTests(fields: TestFilter!): [Test!]!
  findAllNotes: [Note!]!
  findAllTests: [Test!]!
}

type Mutation {
  createNote(input: NoteInput!): Note!
  createTest(input: TestInput!): Test!
  updateNote(id: ID!, input: NoteInput!): Note!
  updateTest(id: ID!, input: TestInput!): Test!
}

`;
