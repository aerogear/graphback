
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackOperationType, parseRelationshipAnnotation, getDeltaQuery } from '@graphback/core'
import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema, buildSchema, GraphQLString, GraphQLBoolean } from 'graphql';
import { parseMetadata } from "graphql-metadata";
import { SchemaComposer, ObjectTypeComposerFieldConfig } from 'graphql-compose';
import { getDeltaType, getDeltaListType } from "./deltaMappingHelper";

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface DatasyncPluginConfig {

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

export const SCHEMA_CRUD_PLUGIN_NAME = "DatasyncPlugin";

/**
 * DataSync plugin
 *
 * Plugin is enabled by """ @delta """ annotation
 * It will generate diffQueries
 */
export class DataSyncPlugin extends GraphbackPlugin {

    private pluginConfig: DatasyncPluginConfig;

    public constructor(pluginConfig?: DatasyncPluginConfig) {
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
            
            const modelName = model.graphqlType.name;
            const modifiedType = schemaComposer.getOTC(modelName);
            const entries = Object.entries(modifiedType.getFields()).filter((e: [string, ObjectTypeComposerFieldConfig<any, unknown, any>]) => {
                // Remove relationship fields from delta Types
                return parseRelationshipAnnotation(e[1].description) === undefined
            })

            const fields = Object.assign({}, ...Array.from(entries, ([k, v]: [string, any]) => ({ [k]: v })));

            schemaComposer.createObjectTC(getDeltaType(modelName)).addFields({
                ...fields,
                _deleted: 'Boolean',
            })            

            schemaComposer.createObjectTC({
                name: getDeltaListType(modelName),
                fields: {
                    items: `[${getDeltaType(modelName)}]!`,
                    lastSync: `String`
                }
            })
            // Diff queries
            if (parseMetadata('delta', model.graphqlType)) {
                
                const deltaQuery = getDeltaQuery(model.graphqlType.name)
                schemaComposer.Query.addFields({
                    [deltaQuery]: `${getDeltaListType(modelName)}!`
                });
                schemaComposer.Query.addFieldArgs(deltaQuery, {
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
