
import { GraphbackRuntime } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex'
import { createMongoCRUDRuntimeContext } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { PubSub } from 'graphql-subscriptions';
import { loadSchema } from './loadSchema';
import { GraphQLSchema } from 'graphql';
import Knex from 'knex';
import { GraphbackServerConfig } from "./GraphbackServerConfig";


export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: {};
    Mutation: {};
    Subscription: {};
  }
};

export const createMongoDBConnection = async () => {
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
export const createRuntime = async (graphbackServerConfig: GraphbackServerConfig): Promise<Runtime> => {
  const graphbackConfig = graphbackServerConfig.graphback;
  const schemaText = loadSchema(graphbackConfig.model);

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);

  const schema = runtimeEngine.getMetadata().getSchema();

  const models = runtimeEngine.getDataSourceModels();




  const db = await createMongoDBConnection();
  const services = createMongoCRUDRuntimeContext(models, schema, db, pubSub);



  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
