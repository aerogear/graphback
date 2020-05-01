import { PubSubEngine } from "graphql-subscriptions";
import { PubSubConfig } from '../GraphbackModelConfig';

/**
 * PubSub configuration that is passed to the 
 */
export interface GraphbackPubSub extends PubSubConfig {
    pubSub?: PubSubEngine;
}
