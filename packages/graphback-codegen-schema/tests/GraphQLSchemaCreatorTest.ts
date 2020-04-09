import { readFileSync } from 'fs';
import { buildSchema, printSchema, GraphQLInputType, GraphQLField, isRequiredInputField, GraphQLInputField, GraphQLNonNull, isNullableType } from 'graphql';
import { GraphbackCoreMetadata, GraphbackGlobalConfig, GraphbackCRUDGeneratorConfig } from '@graphback/core';
import { SchemaCRUDPlugin } from '../src/SchemaCRUDPlugin';
import { GraphQLInputObjectType } from 'graphql';

const defaultModelText = readFileSync(`${__dirname}/mock.graphql`, 'utf8');
const defaultCrudConfig = {
  create: true,
  update: true,
  findAll: true,
  find: true,
  delete: true,
  subCreate: true,
  subUpdate: true,
  subDelete: true
}

const setup = (schemaText: string = defaultModelText, crudConfig: GraphbackCRUDGeneratorConfig = defaultCrudConfig) => {
  return {
    model: buildSchema(schemaText),
    crudConfig
  }
}

test('Test snapshot config gql', async () => {
  const { crudConfig, model } = setup()

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});


test('Test snapshot config ts', async () => {
  const { model, crudConfig } = setup();

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'ts', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});


test('Test snapshot config js', async () => {
  const { model, crudConfig } = setup();

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'js', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});

test('Test generated filter input types', async () => {
  const { model, crudConfig } = setup(`
  """
  @model
  """
  type User {
    id: ID!
    name: String!
    age: String
    """
    @oneToMany field: 'user'
    """
    notes: [Note]
  }

  """
  @model
  """
  type Note {
    id: ID!
    title: String
    user: User!
  }`)

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)

  const userInput = schema.getType('UserFilter') as GraphQLInputObjectType
  expect(userInput).toBeDefined()
  const userInputFields = Object.values(userInput.getFields())
  expect(userInputFields).toHaveLength(3)
  const nonNullUserFields = userInputFields.filter(isRequiredInputField);
  expect(nonNullUserFields).toHaveLength(0)

  const noteInput = schema.getType('NoteFilter') as GraphQLInputObjectType
  expect(noteInput).toBeDefined()
  const noteInputFields = Object.values(noteInput.getFields())
  expect(noteInputFields).toHaveLength(3)
})

test('Test generated mutation input types', async () => {
  const { model, crudConfig } = setup(`
  """
  @model
  """
  type User {
    id: ID!
    name: String!
    age: String
    """
    @oneToMany field: 'user'
    """
    notes: [Note]
  }

  """
  @model
  """
  type Note {
    id: ID!
    title: String
    user: User!
  }`)

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)

  const userInput = schema.getType('UserData') as GraphQLInputObjectType
  expect(userInput).toBeDefined()
  const userInputFields = Object.values(userInput.getFields())
  expect(userInputFields).toHaveLength(3)
  const nonNullUserFields = userInputFields.filter(isRequiredInputField);
  expect(nonNullUserFields).toHaveLength(1)

  const noteInput = schema.getType('NoteData') as GraphQLInputObjectType
  expect(noteInput).toBeDefined()
  const noteInputFields = Object.values(noteInput.getFields())
  expect(noteInputFields).toHaveLength(3)
  const nonNullNoteFields = noteInputFields.filter(isRequiredInputField);
  expect(nonNullNoteFields).toHaveLength(1)
})

test('Test generated relationship input field', async () => {
  const { model, crudConfig } = setup(`
  """
  @model
  """
  type User {
    id: ID!
    """
    @oneToMany field: 'user', key: 'user_id'
    """
    notes: [Note]
  }

  """
  @model
  """
  type Note {
    id: ID!
    title: String
  }`)

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: crudConfig
  }, model)
  const schema = schemaGenerator.transformSchema(metadata)

  const noteInput = schema.getType('NoteData') as GraphQLInputObjectType
  expect(noteInput).toBeDefined()
  const noteInputFields = Object.values(noteInput.getFields())

  // eslint-disable-next-line dot-notation
  const userInputField: GraphQLInputField = noteInputFields.find((f: GraphQLInputField) => f.name === 'user_id');

  expect(userInputField).toBeDefined()
  expect(isNullableType(userInputField.type)).toBe(true)
})
