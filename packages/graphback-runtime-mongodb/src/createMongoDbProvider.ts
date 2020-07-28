import { Db } from 'mongodb';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { MongoDBDataProvider } from './MongoDBDataProvider';

/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Db} db - MongoDb connection
 */
export function createMongoDbProvider(db: Db): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    return new MongoDBDataProvider(model, db);
  }
}
