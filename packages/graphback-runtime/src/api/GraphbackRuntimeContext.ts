import { GraphbackCRUDService, GraphbackDataProvider } from '..';

import { PubSubEngine } from 'graphql-subscriptions';

/**
 * Interface defines context object required by Graphback resolver layer
 */
export interface GraphbackRuntimeContext {
    crudService: GraphbackCRUDService
    crudDb: GraphbackDataProvider
    pubSub: PubSubEngine
}
