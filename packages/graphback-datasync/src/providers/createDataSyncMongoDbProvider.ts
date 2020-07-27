import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { parseMetadata } from "graphql-metadata";
import { isDataSyncModel, ConflictEngine } from '../util';
import { DataSyncMongoDBDataProvider, DeltaMongoDBDataProvider, DataSyncProvider } from './';

export const DataSyncStrategyMap = {
  "softDelete": DataSyncMongoDBDataProvider,
  "deltaTable": DeltaMongoDBDataProvider
}

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db, conflictEngine?: ConflictEngine): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {
      const datasyncMetadata = parseMetadata('datasync', model.graphqlType);
      let DataProvider =  DataSyncMongoDBDataProvider;
      if (datasyncMetadata && datasyncMetadata.strategy !== undefined) {
        const { strategy } = datasyncMetadata;

        if (strategy in DataSyncStrategyMap){
          DataProvider = DataSyncStrategyMap[strategy];
        } else {
          throw new Error(`Invalid DataSync Strategy: ${strategy}, use one of the supported strategies: ${JSON.stringify(Object.keys(DataSyncStrategyMap))}`)
        }
      }

      return new DataProvider(model.graphqlType, db, conflictEngine);
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}
