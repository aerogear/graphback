import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackDataProvider } from './data/GraphbackDataProvider';
import { CRUDService } from './service/CRUDService';
import { GraphbackModelConfig } from "./GraphbackModelConfig";

export type RuntimeServicesOptions<Provider extends GraphbackDataProvider, Service extends CRUDService> = {
  schema: GraphQLSchema,
  models: GraphbackModelConfig[]
  db: any
  pubSub: PubSubEngine
  provider: new (...args: any[]) => Provider,
  service: new (...args: any[]) => Service;
};

/**
 * Helper function for creating array of datasources based on the model files that will 
 * be able to connect to Postgress database using knex
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export function createRuntimeServices<Provider extends GraphbackDataProvider, Service extends CRUDService> 
  (servicesConfig: RuntimeServicesOptions<Provider, Service>) {

  const { models, schema, db, pubSub, provider, service } = servicesConfig
  if (!models || models.length === 0) {
    throw new Error(`No models provided`)
  }

  return models.reduce((services: any, model: GraphbackModelConfig) => {
    const modelType = schema.getType(model.name) as GraphQLObjectType
    if (modelType === undefined) {
      throw new Error(`
      Schema is missing provided type. 
      Please make sure that you pass the right schema to createCRUDRuntimeContext`)
    }

    const objectDB = new provider(modelType, db)

    services[model.name] = new service(modelType, objectDB, {
      pubSub,
      ...model.pubSub
    })

    return services;
  }, {})
}