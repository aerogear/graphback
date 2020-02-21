import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, GraphbackModel } from "@graphback/runtime"
import { Db } from "mongodb"
import { MongoDBDataProvider } from "./MongoDBDataProvider";

/**
 * Helper function for creating mongodb runtime context used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export const createMongoCRUDRuntimeContext = (
  models: GraphbackModel[], schema: GraphQLSchema,
  db: Db, pubSub: PubSubEngine
) => {
  if (!models || models.length === 0) {
    throw new Error(`No models provided`)
  }

  return models.reduce((services: any, model: GraphbackModel) => {
    const modelType = schema.getType(model.name) as GraphQLObjectType
    if (modelType === undefined) {
      throw new Error(`
      Schema is missing provided type. 
      Please make sure that you pass the right schema to createCRUDRuntimeContext`)
    }

    const objectDB = new MongoDBDataProvider(modelType, db)

    services[model.name] = new CRUDService(modelType, objectDB, {
      pubSub,
      ...model.pubSub
    })

    return services;
  }, {})

}