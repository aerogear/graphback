import { PgKnexDBDataProvider, CRUDService } from "@graphback/runtime"
import { GraphQLSchema, GraphQLObjectType } from "graphql"
import Knex from "knex"
import { PubSubConfig } from './service/CRUDService';

/**
 * Helper function for creating default runtime context used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export const createCRUDRuntimeContext = (
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
