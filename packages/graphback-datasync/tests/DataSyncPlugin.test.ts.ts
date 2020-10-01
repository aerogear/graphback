import { readFileSync } from 'fs';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPluginEngine } from '@graphback/core';
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { DataSyncPlugin } from '../src/DataSyncPlugin';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

test('Test snapshot config gql', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(schemaText))
  metadata.setSchema(schemaPlugin.transformSchema(metadata))
  const schema = datasync.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
  const resolvers: any = datasync.createResolvers(metadata);
  expect(resolvers.Query.syncComments).toBeTruthy()
});

it('uses existing GraphbackTimestamp scalars', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(
    `
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
    `
  ))
  metadata.setSchema(schemaPlugin.transformSchema(metadata))
  const schema = datasync.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});

it('adds version when conflicts are enabled', async () => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const schemaPlugin = new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin({ conflictConfig: { enabled: true } })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(
    `
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
    `
  ))
  metadata.setSchema(schemaPlugin.transformSchema(metadata))
  const schema = datasync.transformSchema(metadata)
  expect(printSchema(schema)).toMatchSnapshot();
});

test('When all CRUD flags are disabled, resolvers and root schema types are not generated', () => {
  const model = buildSchema(`
  """@model"""
  type Note {
    id: ID!
    title: String
  }`)

  const pluginEngine = new GraphbackPluginEngine({
    schema: model,
    plugins: [
      new DataSyncPlugin()
    ],
    config: {
      crudMethods: {
        find: false,
        findOne: false,
        create: false,
        update: false,
        delete: false,
        subCreate: false,
        subDelete: false,
        subUpdate: false
      }
    }
  });

  const metadata = pluginEngine.createResources();
  const schema = metadata.getSchema();
  const resolvers = metadata.getResolvers();

  expect(resolvers).toBeUndefined()
  expect(schema.getQueryType()).toBeUndefined();
  expect(schema.getMutationType()).toBeUndefined();
  expect(schema.getSubscriptionType()).toBeUndefined();
});
