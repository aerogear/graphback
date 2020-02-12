import { PubSubEngine } from "graphql-subscriptions";

/**
 * Configuration for the publish subscribe model
 */
export interface PubSubConfig {
    pubSub?: PubSubEngine;
    publishCreate?: boolean;
    publishUpdate?: boolean;
    publishDelete?: boolean;
}