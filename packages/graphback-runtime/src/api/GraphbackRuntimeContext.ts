import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackCRUDService, GraphbackDataProvider } from '..';


/**
 * Interface defines context object required by Graphback resolver layer
 */
export interface GraphbackRuntimeContext {
    crudService: GraphbackCRUDService
    crudDb: GraphbackDataProvider
    pubSub: PubSubEngine
}
