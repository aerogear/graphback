import { buildSchema } from "graphql";

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
  
  type Comment {
    id: ID!
    title: String!
    description: String!
    noteComment: Note!
  }
  
  type Query {
    getLikedNotes(id: ID!, names: [String]!): Note!
  }
  
  type Mutation {
    likeNote(id: ID!): Note!
  }
`

export const schema = buildSchema(schemaText);