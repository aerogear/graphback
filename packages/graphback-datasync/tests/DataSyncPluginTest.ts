import { readFileSync } from 'fs';
import { buildSchema, printSchema } from 'graphql';
import { GraphbackCoreMetadata } from '@graphback/core';
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

  const schemaPlugin =  new SchemaCRUDPlugin();
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

  const schemaPlugin =  new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(
    `
    """
    @model
    @datasync
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

  const schemaPlugin =  new SchemaCRUDPlugin();
  const datasync = new DataSyncPlugin({ modelConfigMap: { Comment: { enabled: true } } })
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, buildSchema(
    `
    """
    @model
    @datasync
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
