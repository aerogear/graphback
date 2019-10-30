// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { graphQLInputContext } from '@graphback/codegen-input/src';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { createClient } from '../src';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test snapshot config', async (t: ExecutionContext) => {
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
  const client = await createClient(inputContext)
  t.snapshot(client);
});


ava('Test snapshot empty config', async (t: ExecutionContext) => {
  const defautConfig = {
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)
  const client = await createClient(inputContext)
  t.snapshot(client);
});