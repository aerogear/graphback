
import { GraphbackRuntime } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex'
import { migrateDB } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { loadSchema } from './loadSchema';
import { buildSchema, GraphQLSchema } from 'graphql';
import Knex from 'knex';
import { GraphbackServerConfig } from "./GraphbackServerConfig";
import { loadConfig } from 'graphql-config';

const dbmigrationsConfig = {
  client: "sqlite3",
  connection: {
    filename: ":memory:"
  },
  debug: true,
  useNullAsDefault: true
};

export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: {};
    Mutation: {};
    Subscription: {};
  }
};

export const getConfig = async (extension: string): Promise<any> => {
  const configLoaderOpts = {
    extensions: [() => ({ name: extension })],
    throwOnMissing: true,
    throwOnEmpty: true,
  }
  const config = await loadConfig(configLoaderOpts);

  const conf = await config.getDefault().extension(extension);
  return conf;
}

/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export const createRuntime = async (graphbackConfigOpts: GraphbackServerConfig, db: Knex<any, any>): Promise<Runtime> => {
  const graphbackConfig = graphbackConfigOpts;
  const schemaText = loadSchema(graphbackConfig.model);

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);

  const schema = runtimeEngine.getMetadata().getSchema();

  // NOTE: For SQLite db should be always recreated
  await migrateDB(dbmigrationsConfig, schema);

  const models = runtimeEngine.getDataSourceModels();
  const services = createKnexPGCRUDRuntimeServices(models, schema, db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
