import { GraphbackCoreMetadata, GraphbackPlugin } from '@graphback/core';
import { OutputFileSystem } from './GeneratorModel';
import { GeneratorResolversFormat } from './GeneratorResolversFormat';
import { generateCRUDResolversFunctions } from './templates/createResolvers';
import { createResolverTemplate } from './templates/resolverWrapper';
import { createModelsFile } from './templates/modelTemplate';
import { writeResolvers } from './writeResolvers';

export interface ResolverGeneratorPluginConfig {
    /**
     * Extension of the generated files 
     */
    format: 'ts' | 'js'

    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string

    /**
     * Name of the generated resolvers file (default: resolvers.(format))
     */
    resolversFileName?: string

    /**
     * Layout of the of the resolvers object. 
     * Supports Apollo (GraphQL-Tools) or GraphQL reference spec format
     */
    layout?: 'apollo' | 'graphql'
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

    public constructor(pluginConfig: ResolverGeneratorPluginConfig) {
        super();
        this.pluginConfig = Object.assign({
            format: 'ts',
            layout: "apollo",
            resolversFileName: 'resolvers',
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

    public generateResolvers(metadata: GraphbackCoreMetadata): OutputFileSystem {
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Cannot generate resolvers")

            return undefined;
        }

        const generatedResolversFunctions = generateCRUDResolversFunctions(models);
        const generatedResolverFile = this.createGeneratedResolversFile(generatedResolversFunctions, this.pluginConfig);
        const contextFile = createModelsFile(models, this.pluginConfig);

        return {
            resolvers: generatedResolverFile,
            context: contextFile
        };
    }

    protected createGeneratedResolversFile(resolvers: GeneratorResolversFormat, pluginConfig: ResolverGeneratorPluginConfig) {
        const generatedResolvers = createResolverTemplate(resolvers, pluginConfig);

        return {
            fileName: `${pluginConfig.resolversFileName}.${pluginConfig.format}`,
            output: generatedResolvers
        };
    }
}