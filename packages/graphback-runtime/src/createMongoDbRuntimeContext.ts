import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';

/**
 * Create context object required for the graphback runtime layer 
 */
export const createMongoRuntimeContext = (db: any, pubSub: PubSubEngine, schema: GraphQLSchema) => {
  return {}
}
