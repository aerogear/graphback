//tslint:disable-next-line: match-default-export-name
import { buildSchema } from 'graphql';
import { filterModelTypes } from '@graphback/core';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBDataProvider } from '../../src/MongoDBDataProvider';

export interface Context {
  providers: { [modelname: string]: MongoDBDataProvider };
  server: MongoMemoryServer
}

export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
    // Setup graphback
    const schema = buildSchema(schemaStr);
  
    const server = new MongoMemoryServer();
    const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');
  
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
          await providers[collectionName].create(element);
        }
      };
    }
  
    return { server, providers }
  }