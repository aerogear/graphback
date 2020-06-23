import { Db } from 'mongodb';
import { ModelDefinition, defaultTableNameTransform } from '@graphback/core';
import { MongoDBDataProvider, GraphbackDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel } from '../util';
import { PruneScheduler, PruneConfiguration, TTLMap } from "../scheduler";
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db, ttlMap?:TTLMap, pruneConfig: PruneConfiguration = {}): (...args: any[]) => GraphbackDataProvider {
  const scheduler = new PruneScheduler(pruneConfig, db);
  
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {

      const modelName = model.graphqlType.name;
      const modelTTL = ttlMap[modelName];
      if (modelTTL >= 0) {
        const collectionName = defaultTableNameTransform(modelName, 'to-db');
        scheduler.defineAndStartPruneJob(collectionName, modelTTL);
      }

      return new DataSyncMongoDBDataProvider(model.graphqlType, db)
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}