import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel } from '../util';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';
import { DeltaDBDataProvider } from './DeltaDbDataProvider';

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    const annotationData = isDataSyncModel(model);
    if (annotationData) {
      if (annotationData.deltaTable === true) {
        return new DeltaDBDataProvider(model.graphqlType, db);
      }
      
      return new DataSyncMongoDBDataProvider(model.graphqlType, db)
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}
