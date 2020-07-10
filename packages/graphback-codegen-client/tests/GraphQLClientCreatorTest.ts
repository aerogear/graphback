//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { readFileSync } from 'fs';
import { GraphbackCoreMetadata } from '@graphback/core';
import { buildSchema } from 'graphql';
import { ClientCRUDPlugin } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test plugin engine ts', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated.ts', fragmentOnly: false });
  expect(plugin.getDocuments(metadata)).toMatchSnapshot();
});


test('Test plugin engine graphql', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated.graphql', fragmentOnly: false });
  expect(plugin.getDocuments(metadata)).toMatchSnapshot();
});

test('Test plugin engine to throw error when no file extension specified', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated', fragmentOnly: false });

  try {
    plugin.getDocuments(metadata)
  } catch (err) {
    expect(err.message).toEqual('ClientCRUD plugin outputFile requires a file extension of either: .ts, .graphql')
  }
});

test('Test plugin engine to throw error when invalid file extension specified', async () => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
  }

  const metadata = new GraphbackCoreMetadata({ crudMethods }, buildSchema(schemaText))
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated.crazyday', fragmentOnly: false });

  try {
    plugin.getDocuments(metadata)
  } catch (err) {
    expect(err.message).toEqual('ClientCRUD plugin outputFile requires a file extension of either: .ts, .graphql')
  }
});
