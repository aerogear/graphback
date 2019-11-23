import { graphQLInputContext } from '@graphback/core';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { createResolvers } from '../src';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test snapshot resolvers ts', async (t: ExecutionContext) => {
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
  const resolvers = createResolvers(inputContext, {
    format: 'ts', types: {
      resolverRootType: 'Resolvers',
      resolverRootLocation: "../../generated-types"
    }
  })
  t.snapshot(resolvers);
});

ava('Test snapshot resolvers js', async (t: ExecutionContext) => {
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
  const resolvers = createResolvers(inputContext, { format: 'js' })
  t.snapshot(resolvers);
});