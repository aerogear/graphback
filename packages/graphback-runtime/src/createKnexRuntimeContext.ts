import { getModelTableMappings } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';

/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: any, pubSub: PubSubEngine, schema: GraphQLSchema): GraphbackRuntimeContext => {
  const modelTableMappings = getModelTableMappings(schema);
  const crudDb = new PgKnexDBDataProvider(db, modelTableMappings);
  const crudService = new CRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
