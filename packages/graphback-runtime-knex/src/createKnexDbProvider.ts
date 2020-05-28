import Knex from 'knex';
import { ModelDefinition } from '@graphback/core';
import { GraphbackDataProvider } from '@graphback/runtime';
import { KnexDBDataProvider } from './KnexDBDataProvider';

/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Knex} db - Knex database configuration object
 */
export function createKnexDbProvider(db: Knex): (...args: any[]) => GraphbackDataProvider {
  return (model: ModelDefinition): GraphbackDataProvider => {
    return new KnexDBDataProvider(model.graphqlType, db)
  }
}
