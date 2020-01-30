import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex'
import { CRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: any, pubSub: PubSubEngine): GraphbackRuntimeContext => {
  const crudDb = new PgKnexDBDataProvider(db);
  const crudService = new CRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
