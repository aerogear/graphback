// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { graphQLInputContext, InputModelTypeContext } from '../src';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')
const schemaTextAnnotations = readFileSync(`${__dirname}/mockAnnotations.graphql`, 'utf8')

ava('Test config', async (t: ExecutionContext) => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)

  t.snapshot(inputContext);
});


ava('Test subscriptions', async (t: ExecutionContext) => {
  const defautConfig = {
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true,
    "disableGen": true
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)

  t.snapshot(inputContext);
});

ava('Test no config', async (t: ExecutionContext) => {
  const defautConfig = {
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)

  t.snapshot(inputContext);
});


ava('Test with annotations', async (t: ExecutionContext) => {
  const defautConfig = {
  }
  const inputContext = graphQLInputContext.createModelContext(schemaTextAnnotations, defautConfig)

  t.snapshot(inputContext);
});
