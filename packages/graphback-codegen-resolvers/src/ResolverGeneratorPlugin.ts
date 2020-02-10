import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition } from '@graphback/core';
import { writeResolvers } from './fileMapping/writeResolvers';
import { OutputResolvers, FileDefinition } from './fileMapping/GeneratorModel';
import { createOutputResolvers, createCustomOutputResolvers } from './fileMapping/outputResolvers';
import { generateCRUDResolversFunctions, generateCustomResolversFunctions } from './generators/createResolvers';


export interface ResolverGeneratorPluginConfig {
    format: 'ts' | 'js'

    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string

    /**
     * Name of the folder that will be used to save custom resolvers (default: custom)
     */
    customResolversFolderName: string

    /**
     *  Name of the folder that will be used to save generated resolvers (default: generated)
     */
    generatedResolversFolderName: string


    /**
     * Layout of the of the resolvers object. 
     * Supports Apollo (GraphQL-Tools) or GraphQL reference spec format
     */
    layout: 'apollo' | 'graphql'


    // Provides extension for graphql-code-generator types
    // generated for resolvers
    types?: {
        /**
         * Name of the resolver import
         * For example `Resolvers`
         */
        resolverRootType: string

        /**
         * Relative location for root resolver typings.
         * For example: '../../types'
         */
        resolverRootLocation: string
    }
}

const PLUGIN_NAME = 'CRUD_RESOLVER_GENERATOR';

/**
 * Graphback Resolver File Generator Plugin
 * 
 * Generates:
 * 
 * - default CRUD resolvers for all model types.
 * - blank resolver files to implements custom resolvers
 * - CRUD Services for each type for controling the data sources
 * 
 * And then writes to content to resolver files in the server.
 * 
 */
export class ResolverGeneratorPlugin extends GraphbackPlugin {

    private pluginConfig: ResolverGeneratorPluginConfig;

    constructor(pluginConfig: ResolverGeneratorPluginConfig) {
        super();
        this.pluginConfig = Object.assign({
            format: 'graphql',
            layout: "apollo",
            customResolversFolderName: 'custom',
            generatedResolversFolderName: 'generated'
        }, pluginConfig);
        if (!pluginConfig.outputPath) {
            throw new Error("resolver plugin requires outputPath parameter")
        }
    }

    public getPluginName() {
        return PLUGIN_NAME;
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        const outputResolves = this.generateResolvers(metadata);
        if (outputResolves) {
            writeResolvers(outputResolves, this.pluginConfig);
        }
    }

    public generateResolvers(metadata: GraphbackCoreMetadata): OutputResolvers {
        const schema = metadata.getSchema()
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Cannot generate resolvers")

            return undefined;
        }
        const generatedResolversFunctions = generateCRUDResolversFunctions(models);
        const customResolversFunctions = generateCustomResolversFunctions(schema, generatedResolversFunctions);

    ]
    
        const generatedResolverGroup = createOutputResolvers(generatedResolversFunctions, this.pluginConfig);
        const customResolverGroup = createCustomOutputResolvers(customResolversFunctions, this.pluginConfig);

        const entities = this.generateEntities(models, this.pluginConfig);
        const custom = this.generateCustomResolvers(models, this.pluginConfig);
        const generated = this.generateCRUDResolvers(models, this.pluginConfig);

        return {
            custom,
            generated
        };
    }

    protected generateCRUDResolvers(models: ModelDefinition[], pluginConfig: ResolverGeneratorPluginConfig) {
        const crudResolvers: FileDefinition[] = [];


        return crudResolvers;
    }


    protected generateEntities(models: ModelDefinition[], pluginConfig: ResolverGeneratorPluginConfig) {
        const entities: FileDefinition[] = [];

        return entities
    }

    protected generateCustomResolvers(models: ModelDefinition[], pluginConfig: ResolverGeneratorPluginConfig) {
        const custom: FileDefinition[] = [];


        return custom;
    }
}