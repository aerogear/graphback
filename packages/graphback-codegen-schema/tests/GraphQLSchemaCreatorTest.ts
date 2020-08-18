/* eslint-disable max-lines */
import { readFileSync } from 'fs';
import { buildSchema, printSchema, GraphQLObjectType, GraphQLID } from 'graphql';
import { GraphbackCoreMetadata, printSchemaWithDirectives, GraphbackPluginEngine, ModelDefinition, FieldRelationshipMetadata } from '@graphback/core';
import { SchemaCRUDPlugin } from '../src/SchemaCRUDPlugin';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test snapshot config gql', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(schemaText))
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchemaWithDirectives(schema)).toMatchSnapshot();
});


test('Test snapshot config ts', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(schemaText))
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});


test('Test snapshot config js', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(schemaText))
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});

test('Test one side relationship schema query type generation', async () => {
  const defautConfig = {
    "create": false,
    "update": false,
    "findOne": true,
    "find": true,
    "delete": false,
    "subCreate": false,
    "subUpdate": false,
    "subDelete": false
  }

  const modelText = `""" @model """
  type Note {
    id: ID!
    title: String!
    description: String!
    """
    @oneToMany(field: 'note', key: 'test_id')
    """
    tests: [Test]!
  }

  """
  @model
  """
  type Test {
    id: ID!
    name: String
  }
  `;

  const oneSidedSchema = buildSchema(modelText);
  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, oneSidedSchema)

  const transformedSchema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(transformedSchema)).toMatchSnapshot()
});

test('Non-model type has model-type field', () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const modelText = `
type JWTAuthResult {
  user: User!
  csrfToken: String!
  authJWT: String!
}

"""@model"""
type User {
  id: ID!
  name: String
}

type Query {
  jwt: JWTAuthResult
}`

  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(modelText))
  const schema = schemaGenerator.transformSchema(metadata)
  expect(schema.getType('JWTAuthResult')).toBeDefined()
})


test('Creates CRUD resolvers for models', async () => {
  const pluginEngine = new GraphbackPluginEngine({
    schema: schemaText, plugins: [
      new SchemaCRUDPlugin()
    ]
  })

  const metadata = pluginEngine.createResources()

  expect(metadata.getResolvers()).toMatchSnapshot();
});

test('field directives on relationship fields are mapped to schema', () => {
  const schemaGenerator = new SchemaCRUDPlugin();
  const modelAST = `directive @test on FIELD_DEFINITION

""" @model """
type Note {
  id: ID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]! @test
  """@oneToOne"""
  comment: Comment @test
}

""" @model """
type Comment {
  id: ID!
  text: String
  description: String
  note: Note! @test
}`

  const metadata = new GraphbackCoreMetadata({ crudMethods: {} }, buildSchema(modelAST));
  const schema = schemaGenerator.transformSchema(metadata);

  const noteType = schema.getType('Note') as GraphQLObjectType
  const { comments, comment } = noteType.getFields()

  // Note.comments field
  expect(comments.astNode?.directives).toHaveLength(1)
  expect(comments.astNode?.directives[0].name.value).toBe('test')

  // Note.comment field
  expect(comment.astNode?.directives).toHaveLength(1)
  expect(comment.astNode?.directives[0].name.value).toBe('test')

  const commentType = schema.getType('Comment') as GraphQLObjectType
  const { note } = commentType.getFields()

  // Note.comments field
  expect(note.astNode?.directives).toHaveLength(1)
  expect(note.astNode?.directives[0].name.value).toBe('test')

  expect(printSchemaWithDirectives(schema)).toMatchSnapshot()
})