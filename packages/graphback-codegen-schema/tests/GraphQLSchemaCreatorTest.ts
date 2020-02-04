import { gqlSchemaFormatter } from '../src/writer/schemaFormatters';
// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { parse, buildSchema, printSchema } from 'graphql';
import { SchemaCRUDPlugin } from '../src/SchemaCRUDPlugin';
import { GraphbackCoreMetadata } from '@graphback/core';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test snapshot config gql', async (t: ExecutionContext) => {
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
  t.snapshot(printSchema(schema));
});


ava('Test snapshot config ts', async (t: ExecutionContext) => {
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
  t.snapshot(printSchema(schema));
});


ava('Test snapshot config js', async (t: ExecutionContext) => {
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
  t.snapshot(printSchema(schema));
});
