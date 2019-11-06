// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { graphQLInputContext } from '@graphback/core/src';
import { applyGeneratorDirectives } from '@graphback/core';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { ApolloServiceResolverGenerator } from '../src';

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
  const generator = new  ApolloServiceResolverGenerator(inputContext)
  t.snapshot(generator.generate());
});