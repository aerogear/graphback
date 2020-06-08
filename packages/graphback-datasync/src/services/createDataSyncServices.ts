import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, GraphbackPubSubModel, MongoDBDataProvider } from "@graphback/runtime-mongo"
import { Db } from "mongodb"
import { parseMetadata } from "graphql-metadata";
import { DataSyncMongoDBDataProvider } from "../providers";
import { DataSyncCRUDService } from "./DataSyncCRUDService";

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
      
      // Only attach DataSync services if they have delta annotations
      if (parseMetadata("delta",modelType) && parseMetadata("versioned", modelType)) {
        const objectDB = new DataSyncMongoDBDataProvider(modelType, db)
  
        services[model.name] = new DataSyncCRUDService(modelType, objectDB, {
          pubSub,
          ...model.pubSub
        });
      } else {
        const objectDB = new MongoDBDataProvider(modelType, db)
  
        services[model.name] = new CRUDService(modelType, objectDB, {
          pubSub,
          ...model.pubSub
        });
      }
  
      return services;
    }, {})
  
  }