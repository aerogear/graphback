
import { GraphbackAPI, buildGraphbackAPI } from 'graphback'
import { createMongoDbProvider } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { loadModel } from './loadModel';
import { GraphQLSchema } from 'graphql';

export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: {};
    Mutation: {};
    Subscription: {};
  }
};

export const createMongoDBClient = async (): Promise<MongoClient> => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true })
  await client.connect();

  return client
}

/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export const createRuntime = async (modelDir: string, db: Db): Promise<GraphbackAPI> => {
  const model = await loadModel(modelDir);

  const graphbackAPI = buildGraphbackAPI(model, {
    dataProviderCreator: createMongoDbProvider(db)
  })

  return graphbackAPI;
}
