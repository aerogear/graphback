import { GraphbackRuntime } from 'graphback'
import { createKnexPGCRUDRuntimeServices } from "@graphback/runtime-knex"
import { migrateDB, MigrateOptions, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { connectDB, getConnectionDetails } from './db'
import { loadConfigSync } from 'graphql-config';
import path from 'path';
/**
 * Method used to create runtime schema
 */
export const createRuntime = () => {
  const db = connectDB();

  const projectConfig = loadConfigSync({
    extensions: [
      () => ({ name: 'graphback' })
    ]
  }).getDefault()

  const graphbackConfig = projectConfig.extension('graphback');
  const model = projectConfig.loadSchemaSync(path.resolve(graphbackConfig.model));

  const migrateOptions: MigrateOptions = {
    // Do not perform delete operations on tables
    operationFilter: removeNonSafeOperationsFilter
  };

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(model, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createKnexPGCRUDRuntimeServices(models, model, db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  migrateDB(getConnectionDetails(), runtime.schema, migrateOptions)
    .then((ops) => {
      console.log("Migrated database");
    });

  return runtime;
}
