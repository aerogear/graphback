// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { GraphbackCoreMetadata } from '@graphback/core';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { ClientCRUDPlugin } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test plugin engine ts', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ format: 'ts', outputPath: './tmp' });
  t.snapshot(plugin.getDocuments(metadata));
});


ava('Test plugin engine gql', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ format: 'graphql', outputPath: './tmp' });
  t.snapshot(plugin.getDocuments(metadata));
});


ava('Test plugin engine gqlfragments', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ format: 'gqlwithfragment', outputPath: './tmp' });
  t.snapshot(plugin.getDocuments(metadata));
});
