
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackOperationType } from '@graphback/core'
import { GraphQLSchema, buildSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose';

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface OffixPluginConfig {

    /**
     * RelativePath for the output resolvers created by generator
     */
    outputPath: string

    /**
     * Delta resolvers format
     */
    deltaResolverFormat?: 'ts' | 'js' | 'graphql',

    /*
     * RelativePath for the output files created by generator
     */
    generateDeltaQueries?: boolean

}

export const SCHEMA_CRUD_PLUGIN_NAME = "OffixPlugin";

/**
 * Ofix plugin
 *
 * Plugin is enabled by """ @datasync """ annotation
 * It will add version field to the schema and also generate diffQueries
 */
export class OffixPlugin extends GraphbackPlugin {

    private pluginConfig: OffixPluginConfig;

    public constructor(pluginConfig?: OffixPluginConfig) {
        super()
        this.pluginConfig = Object.assign({ format: 'graphql', outputFileName: 'schema' }, pluginConfig);
        if (!pluginConfig.outputPath) {
            throw new Error("schema plugin requires outputPath parameter")
        }
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const schema = metadata.getSchema()
        const schemaComposer = new SchemaComposer(schema);
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.")

            return schema;
        }

        models.forEach((model: ModelDefinition) => {
            // TODO use `versioned` marker to check if we should add version
            const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
            modifiedType.addFields({
                version: 'Int'
            });

            // TODO: Add version to all input types
            try {
                const inputType = schemaComposer.getITC(getInputTypeName(model.graphqlType.name, GraphbackOperationType.FIND))
                if (inputType) {
                    inputType.addFields({
                        version: 'Int'
                    });
                }
            } catch (e) {
                // ignore as we are not guaranteed to have this input type
            }


            // Diff queries
            if (this.pluginConfig.generateDeltaQueries) {
                const diffQuery = `${model.graphqlType.name}Delta`
                schemaComposer.Query.addFields({
                    [diffQuery]: `[${model.graphqlType.name}]!`
                })
                schemaComposer.Query.addFieldArgs(diffQuery, {
                    lastSync: 'String!'
                })
            }
        })

        return buildSchema(schemaComposer.toSDL())
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        // TODO generate delta resolvers
        // TODO DataSource support for deltas
        // Schema plugin is going to create schema for us
        // No work to be done
    }

    public getPluginName() {
        return SCHEMA_CRUD_PLUGIN_NAME;
    }
}
