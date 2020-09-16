//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { readFileSync, mkdirSync, rmdirSync } from 'fs';
import { GraphbackCoreMetadata, GraphbackCRUDGeneratorConfig, GraphbackPlugin, GraphbackPluginEngine } from '@graphback/core';
import { buildSchema } from 'graphql';
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';
import { ClientCRUDPlugin } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

const setup = (schemaStr: string, { crudMethods, plugins }: { crudMethods: GraphbackCRUDGeneratorConfig, plugins: GraphbackPlugin[] }): { metadata: GraphbackCoreMetadata } => {
  const pluginEngine = new GraphbackPluginEngine({ schema: buildSchema(schemaStr), plugins, config: { crudMethods } });

  return { metadata: pluginEngine.createResources() }
}

beforeEach(() => {
  mkdirSync('./tmp')
})

afterEach(() => {
  rmdirSync('./tmp', { recursive: true });
})

test('Test plugin engine ts', async () => {
  const schemaPlugin = new SchemaCRUDPlugin()
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated.ts', fragmentOnly: false });
  const { metadata } = setup(schemaText, { crudMethods: {}, plugins: [schemaPlugin, plugin] })
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

  const { metadata } = setup(schemaText, { crudMethods, plugins: [new SchemaCRUDPlugin()] })
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

  const { metadata } = setup(schemaText, { crudMethods, plugins: [new SchemaCRUDPlugin()] })

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

  const { metadata } = setup(schemaText, { crudMethods, plugins: [new SchemaCRUDPlugin()] })
  const plugin = new ClientCRUDPlugin({ outputFile: './tmp/generated.crazyday', fragmentOnly: false });

  try {
    plugin.getDocuments(metadata)
  } catch (err) {
    expect(err.message).toEqual('ClientCRUD plugin outputFile requires a file extension of either: .ts, .graphql')
  }
});
