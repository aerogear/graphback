import { getDatabaseTypeMappings } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';
 
/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: any, pubSub: PubSubEngine, schema: GraphQLSchema): GraphbackRuntimeContext => {
  const crudDb = new PgKnexDBDataProvider(db);
  const crudService = new CRUDService(crudDb, pubSub);

  const mappings = getDatabaseTypeMappings(schema);

  return {
    crudService,
    crudDb,
    pubSub
  };
}
