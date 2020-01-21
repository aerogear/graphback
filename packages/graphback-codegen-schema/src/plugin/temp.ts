import { buildSchema, GraphQLSchema, printSchema } from "graphql";
import { SchemaCRUDPlugin } from './SchemaCRUDPlugin';
import { printSortedSchema } from '../writter/schemaPrinter';


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
console.log(printSortedSchema(plugin.transformSchema(schema)))