
import ava, { ExecutionContext } from 'ava';
import { buildSchema, GraphQLSchema } from "graphql";
import { SchemaCRUDPlugin } from '../src/plugin/SchemaCRUDPlugin';
import { printSortedSchema } from '../src/writer/schemaPrinter';


const schemaText = `
scalar DateTime

directive @flagDeprecated(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE

interface Node {
  id: ID!
}

"""
@model 
@crud.delete: true
"""
type Note implements Node{
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

ava('Test snapshot Schema Plugin', async (t: ExecutionContext) => {
  const globalCRUDMethods = {
  }

  const schema: GraphQLSchema = buildSchema(schemaText);


  const plugin = new SchemaCRUDPlugin({ globalCRUDMethods })

  t.snapshot(printSortedSchema(plugin.transformSchema(schema)));
});


ava('Test snapshot Schema Plugin no queries and subscriptions', async (t: ExecutionContext) => {
  const globalCRUDMethods = {
    "findAll": false,
    "find": false,
    "delete": false,
    "subCreate": false,
    "subUpdate": false,
    "subDelete": false
  }

  const simpleSchema = `
    """
    @model 
    @crud.delete: true
    """
    type Note {
      id: ID!
      title: String!
    }
  `

  const schema: GraphQLSchema = buildSchema(simpleSchema);
  const plugin = new SchemaCRUDPlugin({ globalCRUDMethods })

  t.snapshot(printSortedSchema(plugin.transformSchema(schema)));
});