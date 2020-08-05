import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel, DataSyncModelConflictConfig } from '../util';
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

export function createDataSyncConflictProviderCreator(db: Db, datasyncConfigMap: { [modelName: string]: DataSyncModelConflictConfig } = {}) : (...args: any[]) => GraphbackDataProvider {
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