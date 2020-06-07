import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, GraphbackPubSubModel } from "@graphback/runtime"
import { Db } from "mongodb"
import { DataSyncMongoDBDataProvider } from "./DatasyncMongoDBDataProvider";

/**
 * Helper function for creating DataSync services with MongoDB used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export const createDataSyncMongoCRUDRuntimeContext = (
    models: GraphbackPubSubModel[], schema: GraphQLSchema,
    db: Db, pubSub: PubSubEngine
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
  
      const objectDB = new DataSyncMongoDBDataProvider(modelType, db)
  
      services[model.name] = new CRUDService(modelType, objectDB, {
        pubSub,
        ...model.pubSub
      })
  
      return services;
    }, {})
  
  }