// tslint:disable

import { buildSchema, GraphQLSchema } from "graphql";
import { GraphbackEngine } from './GraphbackEngine';

export const globalCRUDMethods = {
  "create": true,
  "update": true,
  "findAll": true,
  "find": true,
  "delete": true,
  "subCreate": true,
  "subUpdate": true,
  "subDelete": true
}

export const schemaText = `
scalar DateTime

directive @texample(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE

interface aestInterface {
  id: ID!
}


  """
  @model 
  @crud.delete: true
  """
  type Note {
    id: ID!
    title: String!
    description: String!
    ## Relationship
    """
    @db.oneToMany: 'noteComment'
    """
    comment: [Comment]!
  }
  
  """
  @model
  """
  type Comment {
    id: ID!
    title: String!
    description: String!
    noteComment: Note!
  }
  
  type Query {
    getLikedNote(id: ID!, names: [String]!): Note!
    getLikedNotes(id: ID!, names: [String]!): [Note!]
  }

  type Subscription {
    commentAdded(repoFullName: String!): Comment
  }
  
  type Mutation {
    likeNote(id: ID!): Note!
  }
`

export const schema: GraphQLSchema = buildSchema(schemaText);

const engine = new GraphbackEngine(schema, {
  global: {
    crudMethods: globalCRUDMethods
  },
  plugins: {
    ApolloResolversCRUD: {
      format: 'ts',
      resolverPath: `./examples/generator-fullstack/server/src/resolvers`
    }
  }
})
const backend = engine.buildServer();
console.info(backend.schema);