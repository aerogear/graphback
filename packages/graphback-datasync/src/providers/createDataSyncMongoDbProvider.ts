import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel } from '../util';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

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
