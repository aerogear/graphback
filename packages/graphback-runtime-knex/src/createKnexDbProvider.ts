import Knex from 'knex';
import { ModelDefinition, GraphbackDataProvider } from '@graphback/core';
import { KnexDBDataProvider } from './KnexDBDataProvider';

/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Knex} db - Knex database configuration object
 */
export function createKnexDbProvider(db: Knex) {
  return (model: ModelDefinition): GraphbackDataProvider => {
    return new KnexDBDataProvider(model, db);
  }
}
