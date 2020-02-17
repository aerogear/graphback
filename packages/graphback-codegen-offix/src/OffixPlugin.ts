
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, getFieldName, GraphbackOperationType } from '@graphback/core'
import { mergeSchemas } from "@graphql-toolkit/schema-merging"
import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLInputObjectType, GraphQLInputObjectTypeConfig, GraphQLField, print, getNullableType, GraphQLNonNull, GraphQLList, printSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose';

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
        const schemaComposer = new SchemaComposer();
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.")

            return schema;
        }

        const versionedTypes = [];
        models.forEach((model: ModelDefinition) => {
            // TODO use `versioned` marker to check if we should add version
            const modifiedType = schemaComposer.createObjectTC(model.graphqlType);
            modifiedType.addFields({
                version: 'Int'
            });

            versionedTypes.push(modifiedType);

            const inputType = schema.getType(getInputTypeName(model.graphqlType.name)) as GraphQLInputObjectType
            if (inputType) {
                const modifiedInputType = schemaComposer.createInputTC(inputType);
                modifiedInputType.addFields({
                    version: 'Int'
                });
                versionedTypes.push(modifiedInputType);
            }


            // Diff queries
            if (this.pluginConfig.generateDeltaQueries) {
                // TODO generate delta queries
                // TODO generate delta resolvers (maybe separate plugin for delta?)
                // this.createDiffQuery(metadata)
                // TODO - this.createDiffResolvers
            }
        })

        const newVersionedSchema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'Query',
                fields: () => (undefined)
            }),
            types: versionedTypes
        });
    
        return mergeSchemas({ schemas: [newVersionedSchema, schema] });
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        // Schema plugin is going to create schema for us
        // No work to be done
    }

    protected createDiffQuery(model: ModelDefinition) {
        const queryTypes = {};
        const name = model.graphqlType.name;
        if (model.crudOptions.findAll) {
            const operation = getFieldName(name, GraphbackOperationType.FIND_ALL) + 'Diff'
            queryTypes[operation] = {
                // TODO create new wrapper type
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {}
            };
        }

        const queryType = new GraphQLObjectType({
            name: 'Query',
            fields: () => (queryTypes)
        });

        return queryType;
    }

    public getPluginName() {
        return SCHEMA_CRUD_PLUGIN_NAME;
    }
}
