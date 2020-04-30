import { readFileSync } from 'fs';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata, printSchemaWithDirectives } from '@graphback/core';
import { SchemaCRUDPlugin } from '../src/SchemaCRUDPlugin';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')
const oneSidedRelSchemaText = readFileSync(`${__dirname}/mock-with-one-sided-relationship.graphql`, 'utf8');

test('Test snapshot config gql', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
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
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin({ format: 'ts', outputPath: './tmp' })
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
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }


  const schemaGenerator = new SchemaCRUDPlugin({ format: 'js', outputPath: './tmp' })
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
    "findAll": true,
    "find": true,
    "delete": false,
    "subCreate": false,
    "subUpdate": false,
    "subDelete": false
  }

  const oneSidedSchema = buildSchema(oneSidedRelSchemaText)
  // confirm the absence of one side of the relationship
  expect(printSchema(oneSidedSchema)).toMatchSnapshot()

  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, oneSidedSchema)

  const transformedSchema = schemaGenerator.transformSchema(metadata)
  expect(printSchema(transformedSchema)).toMatchSnapshot()
});