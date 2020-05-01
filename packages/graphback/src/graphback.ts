import { resolve } from 'path';
import { loadConfigSync } from 'graphql-config';
import { 
  CRUDService,
  GraphbackDataProvider,
  createRuntimeServices,
} from '@graphback/runtime';
import { GraphbackRuntime } from './GraphbackRuntime';
import { PubSubEngine } from 'graphql-subscriptions';

export interface GraphbackOptions<Provider extends GraphbackDataProvider, Service extends CRUDService> {
  db: any
  pubSub: PubSubEngine,
  provider: new (...args: any[]) => Provider,
  service: new (...args: any[]) => Service;
}

/**
 * Create a Graphback Runtime
 * 
 * @param options 
 */
export function graphback<Provider extends GraphbackDataProvider, Service extends CRUDService>(options: GraphbackOptions<Provider, Service>) {
  const { db, pubSub, provider, service } = options

  const projectConfig = loadConfigSync({
    extensions: [
      () => ({ name: 'graphback' })
    ]
  }).getDefault()

  const graphbackConfig = projectConfig.extension('graphback');
  const model = projectConfig.loadSchemaSync(resolve(graphbackConfig.model));

  const runtimeEngine = new GraphbackRuntime(model, graphbackConfig);
  const models = runtimeEngine.getDataSourceModels();
  const services = createRuntimeServices<Provider, Service>({
    schema: model,
    db,
    models,
    pubSub,
    provider: provider,
    service: service
  })
  const runtime = runtimeEngine.buildRuntime(services);

  return { ...runtime, services };
}