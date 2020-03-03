import { readFileSync } from 'fs';
import test, { ExecutionContext } from 'ava';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata, SchemaComposerType, SchemaComp } from '@graphback/core';
import { SchemaCRUDPlugin } from '../src/SchemaCRUDPlugin';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test snapshot config gql', async (t: ExecutionContext) => {
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


  const schemaGenerator = new SchemaCRUDPlugin({ format: 'graphql', outputPath: './tmp' });
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, new SchemaComp(buildSchema(schemaText)));
  const schema = schemaGenerator.transformSchema(metadata).buildSchema();
  t.snapshot(printSchema(schema));
});


test('Test snapshot config ts', async (t: ExecutionContext) => {
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
  }, new SchemaComp(buildSchema(schemaText)))
  const schema = schemaGenerator.transformSchema(metadata).buildSchema();
  t.snapshot(printSchema(schema));
});


test('Test snapshot config js', async (t: ExecutionContext) => {
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
  }, new SchemaComp(buildSchema(schemaText)))
  const schema = schemaGenerator.transformSchema(metadata).buildSchema();
  t.snapshot(printSchema(schema));
});
