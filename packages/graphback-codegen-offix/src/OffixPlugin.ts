import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getBaseType, getFieldName, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, getInputTypeName } from '@graphback/core'
import { mergeSchemas } from "@graphql-toolkit/schema-merging"
import { getNullableType, GraphQLField, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, isObjectType, GraphQLInt } from 'graphql';

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface OffixPluginConfig {

    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string


    /*
     * RelativePath for the output files created by generator
     */
    // TODO separate annotation for delta queries should be used for more granular support
    generateDeltaQueries: boolean

    /**
     * Delta resolvers format
     */
    deltaResolverFormat: 'ts' | 'js' | 'graphql',

}

export const SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";

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
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.")

            return schema;
        }

        if (this.pluginConfig.generateDeltaQueries) {
            // TODO generate delta queries
            // TODO generate delta resolvers (maybe separate plugin for delta?)
        }

        const modelsSchema = {};
        models.forEach((model: ModelDefinition) => {
            // TODO use marker to check if we should add version
            const fields = model.graphqlType.astNode.fields;
            // TODO add version field
        })

        return mergeSchemas({ schemas: [modelsSchema, schema] });
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        // Schema plugin is going to create schema
    }

    protected createInputTypes(model: ModelDefinition) {
        const modelFields = Object.values(model.graphqlType.getFields());
        const inputName = getInputTypeName(model.graphqlType.name);
       
        //TODO relationships?
        return new GraphQLInputObjectType({
            name: inputName,
            fields: () => (modelFields.filter((field: GraphQLField<any, any>) => {
                const fieldBaseType = getBaseType(field.type);

                return !isObjectType(fieldBaseType);
            }).reduce((fieldObj: any, current: any) => {
                const fieldType = current.type;
                fieldObj[current.name] = { type: getNullableType(fieldType), description: '' };
                return fieldObj;
            }, {}))
        });
    }


    public getPluginName() {
        return SCHEMA_CRUD_PLUGIN_NAME;
    }
}
