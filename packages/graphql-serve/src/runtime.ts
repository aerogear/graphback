
import { GraphbackRuntime } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex'
import { migrateDB } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { loadSchema } from './loadSchema';
import { buildSchema } from 'graphql';
import Knex from 'knex';
import { GraphbackServerConfig } from "./GraphbackServerConfig";
import { loadConfig } from 'graphql-config';

const dbmigrationsConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
      filename: ":memory:",
      pool: {
        min: 1,
        max: 10,
        disposeTimeout: 360000 * 1000,
        idleTimeoutMillis: 360000 * 1000
      }
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
export const createRuntime = async (graphbackConfigOpts: GraphbackServerConfig) => {
  const db = Knex(dbmigrationsConfig);
  const graphbackConfig = graphbackConfigOpts;
  const schemaText = loadSchema(graphbackConfig.model);

  // NOTE: For SQLite db should be always recreated
  const ops = await migrateDB(dbmigrationsConfig, schemaText);

  // console.log("Migrated database ", ops);

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createKnexPGCRUDRuntimeServices(models, buildSchema(schemaText), db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
