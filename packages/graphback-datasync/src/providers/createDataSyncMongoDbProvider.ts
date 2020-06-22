import { Db } from 'mongodb';
import { ModelDefinition } from '@graphback/core';
import { MongoDBDataProvider, GraphbackDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel } from '../util';
import { DataSyncMongoDBDataProvider, DataSyncMongoOpts } from './DatasyncMongoDBDataProvider';

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db, options: DataSyncMongoOpts): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {
      return new DataSyncMongoDBDataProvider(model.graphqlType, db, options)
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}
