
import { GraphbackRuntime, ModelDefinition, GraphbackGeneratorConfig } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex'
import { migrateDB } from 'graphql-migrations';
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

  // NOTE: For SQLite db should be always recreated
  // const ops = await migrateDB(dbmigrationsConfig, schemaText);

  // console.log("Migrated database", ops);

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(schemaText, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createKnexPGCRUDRuntimeServices(models, buildSchema(schemaText), db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
