import { GraphbackRuntime } from 'graphback'
import { createMongoCRUDRuntimeContext } from '@graphback/runtime-mongo'
import { PubSub } from 'graphql-subscriptions';
import { connectDB } from './db'
import path from 'path';
import { loadConfigSync } from 'graphql-config';

/**
 * Method used to create runtime schema
 */
export const createRuntime = async () => {
  const db = await connectDB();

  const projectConfig = loadConfigSync({
    extensions: [
      () => ({ name: 'graphback' }),
      () => ({ name: 'dbmigrations' })
    ]
  }).getDefault()

  // const projectConfig = getProjectConfig();
  const graphbackConfig = projectConfig.extension('graphback');
  const model = projectConfig.loadSchemaSync(path.resolve(graphbackConfig.model));

  const pubSub = new PubSub();
  const runtimeEngine = new GraphbackRuntime(model, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createMongoCRUDRuntimeContext(models, model, db, pubSub);
  const runtime = runtimeEngine.buildRuntime(services);

  return runtime;
}
