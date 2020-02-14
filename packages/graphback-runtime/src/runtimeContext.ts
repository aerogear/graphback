import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { PubSubConfig } from './service/PubSubConfig';
import { CRUDService, PgKnexDBDataProvider } from "./index"

/**
 * Config used to initialize crud context file
 */
export type KnexRuntimeContextConfig = {
  /**
   * GraphQL Schema containing model types
   */
  schema: GraphQLSchema,
  /**
   * Knex based instance connected to one of the supported databases
   */
  db: Knex,
  /**
   * One of the supported publish subscribe engines
   */
  pubSub: PubSubEngine
}

/**
 * Helper function for creating default runtime context used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export const createKnexCRUDRuntimeContext = (
  modelName: string, schema: GraphQLSchema,
  db: Knex, pubSubConfig: PubSubConfig
) => {
  const modelType = schema.getType(modelName) as GraphQLObjectType
  if (modelType === undefined) {
    throw new Error(`
    Schema is missing provided type. 
    Please make sure that you pass the right schema to createCRUDRuntimeContext`)
  }
  const objectDB = new PgKnexDBDataProvider(modelType, db)

  return new CRUDService(modelType, objectDB, pubSubConfig)
}
