import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex'
import { DefaultCRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './GraphbackRuntimeContext';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: Knex, pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new PgKnexDBDataProvider(db);
  const crudService = new DefaultCRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
