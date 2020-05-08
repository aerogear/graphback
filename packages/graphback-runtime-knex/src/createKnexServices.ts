import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, GraphbackPubSubModel } from "@graphback/runtime"
import { PgKnexDBDataProvider } from './PgKnexDBDataProvider';
import { KnexDBDataProvider } from './KnexDBDataProvider';

/**
 * Helper function for creating array of datasources based on the model files that will
 * be able to connect to Postgress database using knex
 *
 * @param schema
 * @param db
 * @param pubSub
 */
export const createKnexPGCRUDRuntimeServices = (
  models: GraphbackPubSubModel[], schema: GraphQLSchema,
  db: Knex, pubSub: PubSubEngine
) => {
  if (!models || models.length === 0) {
    throw new Error(`No models provided`)
  }

  return models.reduce((services: any, model: GraphbackPubSubModel) => {
    const modelType = schema.getType(model.name) as GraphQLObjectType
    if (modelType === undefined) {
      throw new Error(`
      Schema is missing provided type.
      Please make sure that you pass the right schema to createCRUDRuntimeContext`)
    }

    const objectDB = new PgKnexDBDataProvider(modelType, db)

    services[model.name] = new CRUDService(modelType, objectDB, {
      pubSub,
      ...model.pubSub
    })

    return services;
  }, {})
}


/**
 * Helper function for creating array of datasources based on the model files that will
 * be able to connect to MySQL database using knex
 *
 * @param schema
 * @param db
 * @param pubSub
 */
export const createKnexCRUDRuntimeServices = (
  models: GraphbackPubSubModel[], schema: GraphQLSchema,
  db: Knex, pubSub: PubSubEngine
) => {
  if (!models || models.length === 0) {
    throw new Error(`No models provided`)
  }

  return models.reduce((services: any, model: GraphbackPubSubModel) => {
    const modelType = schema.getType(model.name) as GraphQLObjectType
    if (modelType === undefined) {
      throw new Error(`
      Schema is missing provided type.
      Please make sure that you pass the right schema to createCRUDRuntimeContext`)
    }

    const objectDB = new KnexDBDataProvider(modelType, db)

    services[model.name] = new CRUDService(modelType, objectDB, {
      pubSub,
      ...model.pubSub
    })

    return services;
  }, {})
}
