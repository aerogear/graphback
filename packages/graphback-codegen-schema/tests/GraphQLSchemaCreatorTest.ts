import { tsSchemaFormatter, gqlSchemaFormatter } from '../src/schemaFormatters';
// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { graphQLInputContext } from '@graphback/core/src';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { buildSchema, parse } from 'graphql';
import { SchemaGenerator } from '../src/SchemaGenerator';

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
    "subDelete": true,
    "disableGen": true
  }

  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)

  const schemaGenerator = new SchemaGenerator(inputContext, gqlSchemaFormatter)
  const schema = schemaGenerator.generate()
  t.snapshot(schema);
  t.true(parse(schema).definitions.length > 0);
});
