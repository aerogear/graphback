import { readFileSync } from 'fs';
import test, { ExecutionContext } from 'ava';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata } from '@graphback/core';
import { OffixPlugin } from '../src/OffixPlugin';

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

  const schemaGenerator = new OffixPlugin({ outputPath: './tmp', generateDeltaQueries: true })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(schemaText))
  const schema = schemaGenerator.transformSchema(metadata)
  t.snapshot(printSchema(schema));
});
