import { buildSchema, GraphQLSchema } from "graphql";
import { printSchemaWithDirectives } from '@graphql-toolkit/common';
import { SchemaCRUDPlugin } from './SchemaCRUDPlugin';

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

export const schema: GraphQLSchema = buildSchema(schemaText);

const plugin = new SchemaCRUDPlugin({ globalCRUDMethods })
console.log(printSchemaWithDirectives(plugin.transformSchema(schema)))