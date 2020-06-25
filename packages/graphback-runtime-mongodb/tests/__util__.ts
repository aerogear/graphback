import { MongoMemoryServer } from 'mongodb-memory-server-global';
import { MongoClient } from 'mongodb';
import { buildSchema } from 'graphql';
import { filterModelTypes, GraphbackCoreMetadata } from '@graphback/core';
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';

export interface Context {
  providers: { [modelname: string]: MongoDBDataProvider };
  server: MongoMemoryServer
}

export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
  // Setup graphback
  let schema = buildSchema(schemaStr);

  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('test');

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

  const schemaGenerator = new SchemaCRUDPlugin()
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, schema)
  schema = schemaGenerator.transformSchema(metadata)

  const providers: { [name: string]: MongoDBDataProvider } = {}
  const models = filterModelTypes(schema)
  for (const modelType of models) {
    providers[modelType.name] = new MongoDBDataProvider(modelType, db);
  }

  // if seed data is supplied, insert it into collections
  if (config?.seedData) {
    const collectionNames = Object.keys(config.seedData);
    for (const collectionName of collectionNames) {
      for (const element of config.seedData[collectionName]) {
        await providers[collectionName].create(element, {graphback: {services: {}, options: {selectedFields: [""]}}});
      }
    };
  }

  return { server, providers }
}
