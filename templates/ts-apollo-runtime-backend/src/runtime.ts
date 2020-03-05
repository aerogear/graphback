import { GraphbackRuntime } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex'
import { migrateDB, MigrateOptions, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { createDB, getGraphbackConfig, getMigrateConfig } from './db'
import { loadSchema } from './loadSchema';
import { buildSchema } from 'graphql';

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async () => {
  const db = await createDB();
  const graphbackConfig = await getGraphbackConfig();
  const dbmigrationsConfig = await getMigrateConfig();
  const schemaText = loadSchema(graphbackConfig.model);

  const migrateOptions: MigrateOptions = {
    //Do not perform delete operations on tables
    operationFilter: removeNonSafeOperationsFilter
  };

  // NOTE: For SQLite db should be always recreated
  const ops = await migrateDB(dbmigrationsConfig, schemaText, migrateOptions);

  console.log("Migrated database", ops);

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createKnexPGCRUDRuntimeServices(models, buildSchema(schemaText), db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
