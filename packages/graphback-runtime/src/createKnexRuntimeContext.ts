import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';

/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: any, pubSub: PubSubEngine, schema: GraphQLSchema): GraphbackRuntimeContext => {
  return {}
}
