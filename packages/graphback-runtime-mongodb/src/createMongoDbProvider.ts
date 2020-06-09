import { Db } from 'mongodb';
import { ModelDefinition } from '@graphback/core';
import { GraphbackDataProvider } from '@graphback/runtime';
import { MongoDBDataProvider } from './MongoDBDataProvider';

/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Db} db - MongoDb connection
 */
export function createMongoDbProvider(db: Db): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    return new MongoDBDataProvider(model.graphqlType, db)
  }
}
