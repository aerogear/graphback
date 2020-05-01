
/**
 * Interface represents additional metadata about a model
 * that may change behaviour at runtime
 */
export interface GraphbackModelConfig {
    name: string;
    pubSub: PubSubConfig;
}

/**
 * Configuration for the publish subscribe model
 */
export interface PubSubConfig {
    publishCreate?: boolean;
    publishUpdate?: boolean;
    publishDelete?: boolean;
}

