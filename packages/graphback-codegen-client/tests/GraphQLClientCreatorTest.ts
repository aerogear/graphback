import { applyGeneratorDirectives, graphQLInputContext } from '@graphback/core';
// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { buildSchema, parse } from 'graphql';
import { createClient } from '../src';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test snapshot config ts', async (t: ExecutionContext) => {
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
  const client = await createClient(inputContext, { output: "gql" })
  t.snapshot(client);
});


ava('Test parse', async (t: ExecutionContext) => {
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
  const schema = buildSchema(applyGeneratorDirectives(schemaText));
  const client = await createClient(inputContext, { output: "gql" })
  for(const documentObj of client.queries){
    const doc = parse(documentObj.implementation);
    t.true(doc.kind === 'Document');
    // TODO Requries full schema generator
    // validate(schema, doc));
  }
  for(const documentObj of client.mutations){
    const doc = parse(documentObj.implementation);
    t.true(doc.kind === 'Document');
    // TODO Requries full schema generator
    // validate(schema, doc));
  }
  for(const documentObj of client.subscriptions){
    const doc = parse(documentObj.implementation);
    t.true(doc.kind === 'Document');
    // TODO Requries full schema generator
    // validate(schema, doc));
  }
});
