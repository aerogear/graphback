import { GraphbackCoreMetadata, GraphbackPlugin } from '@graphback/core';
import { createRootResolversIndex } from './formatters/apollo';
import { generateCRUDResolvers, generateCustomCRUDResolvers } from './output/createResolvers';
import { createCustomOutputResolvers, createOutputResolvers, OutputResolvers } from './output/outputResolvers';
import { writeResolvers } from './writer/writeResolvers';

export interface ResolverGeneratorPluginConfig {
    format: 'ts' | 'js'

    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string

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
 * 
 * And then writes to content to resolver files in the server.
 * 
 */
export class ResolverGeneratorPlugin extends GraphbackPlugin {

    private pluginConfig: ResolverGeneratorPluginConfig;

    constructor(pluginConfig: ResolverGeneratorPluginConfig) {
        super();
        this.pluginConfig = Object.assign({ format: 'graphql' }, pluginConfig);
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
        const generatedResolvers = generateCRUDResolvers(models);
        const customResolvers = generateCustomCRUDResolvers(schema, models, generatedResolvers);

        const generatedResolverGroup = createOutputResolvers(generatedResolvers, this.pluginConfig);
        const customResolverGroup = createCustomOutputResolvers(customResolvers, this.pluginConfig);
        const rootResolverIndex = createRootResolversIndex(this.pluginConfig.format);

        return {
            generated: generatedResolverGroup,
            custom: customResolverGroup,
            index: rootResolverIndex
        };
    }
}