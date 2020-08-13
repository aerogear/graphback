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


test('Model has missing relationship annotations', async () => {
  const defautConfig = {
    "create": false,
    "update": false,
    "findOne": true,
    "find": true,
    "delete": false,
    "subCreate": false,
    "subUpdate": false,
    "subDelete": false
  };

  let modelText = `
  """ @model """
  type Note {
    id: ID!
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

  let schema = buildSchema(modelText);
  let schemaGenerator = new SchemaCRUDPlugin();
  let metadata = new GraphbackCoreMetadata({ crudMethods: defautConfig }, schema);

  try {
    schemaGenerator.transformSchema(metadata);
    expect(true).toBeFalsy(); // should not reach here
  } catch (error) {
    expect(error.message).toEqual(`Missing relationship definition on: "Note.tests". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
  }

  modelText = `
  """ @model """
  type Note {
    id: ID!
    test: Test
  }

  """
  @model
  """
  type Test {
    id: ID!
    name: String
  }
  `;

  schema = buildSchema(modelText);
  schemaGenerator = new SchemaCRUDPlugin();
  metadata = new GraphbackCoreMetadata({ crudMethods: defautConfig }, schema);

  try {
    schemaGenerator.transformSchema(metadata);
    expect(true).toBeFalsy(); // should not reach here
  } catch (error) {
    expect(error.message).toEqual(`Missing relationship definition on: "Note.test". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
  }
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

test.only('implicit one-to-many relationships', () => {
  const modelAST = `
 """ @model """
type Note {
  id: ID!
  title: String!
  description: String
  comments: [Comment]!
}

""" @model """
type Comment {
  id: ID!
  text: String
  description: String
}`

  const metadata = new GraphbackCoreMetadata({ crudMethods: {} }, buildSchema(modelAST));
  const schemaGenerator = new SchemaCRUDPlugin();
  const schema = schemaGenerator.transformSchema(metadata)
  const modelDefinitions = metadata.getModelDefinitions()

  const NoteModelDefinition = modelDefinitions.find((m: ModelDefinition) => m.graphqlType.name === 'Note')
  const CommentModelDefinition = modelDefinitions.find((m: ModelDefinition) => m.graphqlType.name === 'Comment')
  expect(NoteModelDefinition.relationships).toHaveLength(1)
  const noteRelationField = NoteModelDefinition.relationships[0]

  expect(noteRelationField).toEqual({
    kind: 'oneToMany',
    owner: NoteModelDefinition.graphqlType,
    ownerField: NoteModelDefinition.graphqlType.getFields().comments,
    relationType: CommentModelDefinition.graphqlType,
    relationFieldName: 'note',
    relationForeignKey: 'noteId'
  });

  expect(CommentModelDefinition.relationships).toHaveLength(1)
  const commentRelationField = CommentModelDefinition.relationships[0]

  expect(commentRelationField).toEqual({
    kind: 'manyToOne',
    owner: CommentModelDefinition.graphqlType,
    ownerField: CommentModelDefinition.graphqlType.getFields().note,
    relationType: NoteModelDefinition.graphqlType,
    relationFieldName: 'comments',
    relationForeignKey: 'noteId'
  });
})