import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition } from '@graphback/core'
import { GraphQLSchema } from 'graphql';
import { createClientDocumentsGQL, createClientDocumentsGqlComplete, createClientDocumentsTS } from './templates'
import { ClientTemplates } from './templates/ClientTemplates'
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
    outputFormat: 'ts' | 'gql' | 'gqlwithfragment'
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
        this.pluginConfig = Object.assign({ outputFormat: 'ts' }, pluginConfig);

    }
    // TODO change interface to return metadata instead of schema
    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const schema = metadata.getSchema()
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. No Client side queries will be generated")

            return schema;
        }


        const { documents, outputFormat } = this.createDocuments(models));

        writeDocumentsToFilesystem(this.pluginConfig.outputPath, documents, outputFormat);

        return schema;
    }

    private createDocuments(models: ModelDefinition[]) {
        let documents: ClientTemplates;
        let outputFormat
        if (this.pluginConfig.outputFormat === 'ts') {
            documents = createClientDocumentsTS(models);
            outputFormat = this.pluginConfig.outputFormat;
        }
        else if (this.pluginConfig.outputFormat === 'gql') {
            documents = createClientDocumentsGQL(models);
            outputFormat = this.pluginConfig.outputFormat;
        }
        else if (this.pluginConfig.outputFormat === 'gqlwithfragment') {
            documents = createClientDocumentsGqlComplete(models);
            outputFormat = 'gql';
        } else {
            throw new Error("Invalid output format for client plugin");
        }

        return { documents, outputFormat };
    }

    public getPluginName(): string {
        return CLIENT_CRUD_PLUGIN;
    }
}
