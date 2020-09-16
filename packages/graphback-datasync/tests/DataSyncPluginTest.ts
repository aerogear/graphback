import { readFileSync } from 'fs';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPluginEngine } from '@graphback/core';
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { DataSyncPlugin } from '../src/DataSyncPlugin';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test snapshot config gql', async () => {
  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin()

  const pluginEngine = new GraphbackPluginEngine({ schema: buildSchema(schemaText), plugins: [schemaPlugin, datasync] })
  const metadata = pluginEngine.createResources();
  const schema = metadata.getSchema();
  const resolvers: any = metadata.getResolvers();

  expect(printSchema(schema)).toMatchSnapshot();
  expect(resolvers.Query.syncComments).toBeTruthy()
});

it('uses existing GraphbackTimestamp scalars', async () => {
  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin()

  const pluginEngine = new GraphbackPluginEngine({
    schema: buildSchema(`
    """
    @model
    @datasync(
      ttl: 5184000
    )
    """
    type Comment {
      id: ID!
      title: String!
      description: String!
    }

    scalar GraphbackTimestamp
    `), plugins: [schemaPlugin, datasync]
  })
  const metadata = pluginEngine.createResources();
  const schema = metadata.getSchema();

  expect(printSchema(schema)).toMatchSnapshot();
});

it('adds version when conflicts are enabled', async () => {
  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin({ conflictConfig: { enabled: true } })

  const pluginEngine = new GraphbackPluginEngine({
    schema: buildSchema(`
    """
    @model
    @datasync(
      ttl: 5184000
    )
    """
    type Comment {
      id: ID!
      title: String!
      description: String!
    }

    scalar GraphbackTimestamp
    `), plugins: [schemaPlugin, datasync]
  })
  const metadata = pluginEngine.createResources();
  const schema = metadata.getSchema();

  expect(printSchema(schema)).toMatchSnapshot();
});
