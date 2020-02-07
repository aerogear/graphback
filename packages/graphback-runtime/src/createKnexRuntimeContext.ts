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
  // tslint:disable-next-line: no-console
  // console.log(modelTableMappings)
  // TODO use mappings
  const crudDb = new PgKnexDBDataProvider(db);
  const crudService = new CRUDService(crudDb, modelTableMappings, pubSub);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
