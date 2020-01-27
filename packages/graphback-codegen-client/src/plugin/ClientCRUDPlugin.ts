import { GraphbackCoreMetadata, GraphbackPlugin } from '@graphback/core'
import { GraphQLSchema } from 'graphql';
import { createDocumentsGQL, createDocumentsGqlComplete, createDocumentsTS } from './creators'
import { writeDocumentsToFilesystem } from './writeDocuments';

// TODO move to core
/**
 * Describes configuration options that can be shared in various graphback plugins
 */
export interface GeneratorOutputSpec {
    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string
}


/**
 * Configuration for client generator
 */
export interface ClientGeneratorPluginConfig extends GeneratorOutputSpec {
    /**
     * Output language that will be supported
     * Our plugin supports multiple languages for simplicity
     *
     * - ts - typescript file output (backwards compatibility)
     * - gql - .graphql file
     * - gqlwithfragment - complete gql queries containing fragments for redundancy
     */
    output: 'ts' | 'gql' | 'gqlwithfragment'
}

export const CLIENT_CRUD_PLUGIN = "ClientCRUDPlugin";

/**
 * Graphback CRUD operations plugin
 * 
 * Plugins generates client side documents containing CRUD operations:
 * Queries, Mutations and Subscriptions that reference coresponding schema and resolves.
 * Plugin operates on all types annotated with model
 * 
 * Used graphql metadata:
 * 
 * - model: marks type to be processed by CRUD generator
 * - crud: controls what types of operations can be generated. 
 * For example crud.update: false will disable updates for type
 */
export class ClientCRUDPlugin extends GraphbackPlugin {
    private pluginConfig: ClientGeneratorPluginConfig;

    constructor(pluginConfig?: ClientGeneratorPluginConfig) {
        super()
        this.pluginConfig = Object.assign({ format: 'ts' }, pluginConfig);

    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const schema = metadata.getSchema()
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. No Client side queries will be generated")

            return schema;
        }
        let documents;
        if (this.pluginConfig.output === 'ts') {
            documents = createDocumentsTS(models)
        }
        if (this.pluginConfig.output === 'gql') {
            documents = createDocumentsGQL(models)
        }
        if (this.pluginConfig.output === 'gqlwithfragment') {
            documents = createDocumentsGqlComplete(models)
        }

        writeDocumentsToFilesystem(documents);

        return schema;
    }

    public getPluginName(): string {
        return CLIENT_CRUD_PLUGIN;
    }
}
