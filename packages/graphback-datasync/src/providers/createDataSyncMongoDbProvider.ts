import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from "@graphback/runtime-mongo"
import { isDataSyncModel } from '../util';
import { ConflictEngine, TimestampConflictEngine } from "../conflict";
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';
import { DeltaDBDataProvider } from './DeltaDbDataProvider';

export interface ConflictStrategyMap {
  [modelName: string]: new() => ConflictEngine
}

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db, conflictStrategyMap?: ConflictStrategyMap): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    const annotationData = isDataSyncModel(model);
    if (annotationData) {
      let conflictStrategy: new() => ConflictEngine;
      if (conflictStrategyMap !== undefined) {
        conflictStrategy = conflictStrategyMap[model.graphqlType.name];
      }
      if (annotationData.deltaTable === true) {
        return new DeltaDBDataProvider(model.graphqlType, db, conflictStrategy);
      }
      
      return new DataSyncMongoDBDataProvider(model.graphqlType, db, conflictStrategy);
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}
