import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel, DataSyncModelConfigMap } from '../util';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';
import { DataSyncConflictMongoDBDataProvider } from "./DataSyncConflictProvider";

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {
      return new DataSyncMongoDBDataProvider(model, db);
    } else {
      return new MongoDBDataProvider(model, db);
    }
  }
}


/**
 * Creates a new Data Synchronization data provider creator for MongoDB with
 * optionally specified per-model conflict configuration
 * 
 * @param {Db} db - MongoDB Db object
 * @param {DataSyncModelConfigMap} datasyncConfigMap - Object for configuring conflicts for individual models
 */
export function createDataSyncConflictProviderCreator(db: Db, datasyncConfigMap: DataSyncModelConfigMap = {}) : (model: ModelDefinition) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {
      const dataSyncModelConfig = datasyncConfigMap[model.graphqlType.name];
      if (dataSyncModelConfig !== undefined && dataSyncModelConfig.enabled) {
        return new DataSyncConflictMongoDBDataProvider(model, db, dataSyncModelConfig);
      }

      return new DataSyncMongoDBDataProvider(model, db);
    } else {
      return new MongoDBDataProvider(model, db);
    }
  }
}