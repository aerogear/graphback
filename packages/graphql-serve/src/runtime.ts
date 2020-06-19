
import { GraphbackAPI, buildGraphbackAPI } from 'graphback'
import { createMongoDbProvider } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { loadModel } from './loadModel';
import { GraphQLSchema } from 'graphql';
import { GraphbackServerConfig } from "./GraphbackServerConfig";


export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: {};
    Mutation: {};
    Subscription: {};
  }
};

export const createMongoDBConnection = async (): Promise<Db> => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true })
  await client.connect();
  const db = client.db('test');

  return db;
}

/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export const createRuntime = async (modelDir: string): Promise<GraphbackAPI> => {
  const model = await loadModel(modelDir);

  const db = await createMongoDBConnection();

  const graphbackAPI = buildGraphbackAPI(model, {
    dataProviderCreator: createMongoDbProvider(db)
  })

  return graphbackAPI;
}
