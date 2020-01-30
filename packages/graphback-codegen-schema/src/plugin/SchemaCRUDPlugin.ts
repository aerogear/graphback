import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition } from '@graphback/core'
import { mergeSchemas } from "@graphql-toolkit/schema-merging"
import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as pluralize from "pluralize";
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from '../writer/schemaFormatters';
import { printSortedSchema } from '../writer/schemaPrinter';

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
    // output format for schema string
    format: 'ts' | 'js' | 'gql'
}

export const SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";

/**
 * Graphback CRUD operations plugin
 * 
 * Plugins adds additional Queries, Mutations and Subscriptions into the Schema along 
 * with required input types and scalars. Plugin can be used automatically define best 
 * patterns for CRUD operations on top of GraphQL Schema
 * Plugin checkes all types annotated with model
 * 
 * Used graphql metadata:
 * 
 * - model: marks type to be processed by CRUD generator
 * - crud: controls what types of operations can be generated. 
 * For example crud.update: false will disable updates for type
 */
export class SchemaCRUDPlugin extends GraphbackPlugin {

    private pluginConfig: SchemaCRUDPluginConfig;

    constructor(pluginConfig?: SchemaCRUDPluginConfig) {
        super()
        this.pluginConfig = Object.assign({ format: 'gql' }, pluginConfig);

    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const schema = metadata.getSchema()
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.")

            return schema;
        }

        const modelsSchema = this.buildSchemaForModels(models);

        return mergeSchemas({ schemas: [modelsSchema, schema] });
    }

    /**
     * Create resolvers function that 
     * @param inputContext 
     * @param options 
     */
    public transformSchemaToString(schema: GraphQLSchema) {
        const schemaString = printSortedSchema(schema);
        if (this.pluginConfig) {
            if (this.pluginConfig.format === 'ts') {
                return tsSchemaFormatter.format(schemaString)
            }
            if (this.pluginConfig.format === 'js') {
                return jsSchemaFormatter.format(schemaString)
            }
            if (this.pluginConfig.format === 'gql') {
                return gqlSchemaFormatter.format(schemaString)
            }
        }
        throw Error("Invalid format specified. `options.format` supports only `ts`, `js` and `gql` flags");
    }



    public getPluginName() {
        return SCHEMA_CRUD_PLUGIN_NAME;
    }

    private buildSchemaForModels(models: ModelDefinition[]) {
        let queryTypes = {};
        let mutationTypes = {};
        let subscriptionTypes = {};

        for (const model of Object.values(models)) {
            if (model.crudOptions.disableGen) {
                continue;
            }

            const modelInputType = this.createInputTypes(model);
            queryTypes = this.createQueries(model, queryTypes, modelInputType);
            mutationTypes = this.createMutations(model, mutationTypes, modelInputType);
            subscriptionTypes = this.createSubscriptions(model, subscriptionTypes, modelInputType);

        }

        return this.createSchema(queryTypes, mutationTypes, subscriptionTypes);
    }

    private createInputTypes(model: ModelDefinition) {
        const modelFields = Object.values(model.graphqlType.getFields());

        return new GraphQLInputObjectType({
            name: `${model.graphqlType.name}Input`,
            fields: () => (modelFields.reduce((fieldObj: any, current: any) => {
                // FIXME read id annotation instead of hardcoding id!
                if (current.name !== 'id') {
                    fieldObj[current.name] = { type: current.type, description: '' };
                }

                return fieldObj;
            }, {}))
        });
    }

    private createSubscriptions(model: ModelDefinition, subscriptionTypes: any, modelInputType: GraphQLInputObjectType) {
        if (model.crudOptions.subCreate && model.crudOptions.create) {
             // FIXME name of the field should be comming using `getFieldName` helper
            subscriptionTypes[`new${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subUpdate && model.crudOptions.update) {
             // FIXME name of the field should be comming using `getFieldName` helper
            subscriptionTypes[`updated${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subDelete && model.crudOptions.delete) {
            subscriptionTypes[`deleted${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }

        return subscriptionTypes;
    }

    private createSchema(queryTypes: any, mutationTypes: any, subscriptionTypes: any) {
        const queryType = new GraphQLObjectType({
            name: 'Query',
            fields: () => (queryTypes)
        });
        const mutationType = new GraphQLObjectType({
            name: 'Mutation',
            fields: () => (mutationTypes)
        });
        const subscriptionType = new GraphQLObjectType({
            name: 'Subscription',
            fields: () => (subscriptionTypes)
        });

        return new GraphQLSchema({
            query: queryType,
            mutation: mutationType,
            subscription: subscriptionType
        });
    }

    private createMutations(model: ModelDefinition, mutationTypes: any, modelInputType: GraphQLInputObjectType) {
        if (model.crudOptions.create) {
             // FIXME name of the field should be comming using `getFieldName` helper
            mutationTypes[`create${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.update) {
             // FIXME name of the field should be comming using `getFieldName` helper
            mutationTypes[`update${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLID),
                    },
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.delete) {
            mutationTypes[`delete${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLID),
                    }
                }
            };
        }

        return mutationTypes;
    }

    private createQueries(model: ModelDefinition, queryTypes: any, modelInputType: GraphQLInputObjectType) {
        const pluralModelName = pluralize(model.graphqlType.name);
        if (model.crudOptions.findAll) {
            // FIXME name of the field should be comming using `getFieldName` helper
            queryTypes[`findAll${pluralModelName}`] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {}
            };
        }
        if (model.crudOptions.find) {
             // FIXME name of the field should be comming using `getFieldName` helper
            queryTypes[`find${pluralModelName}`] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {
                    filter: {
                        type: modelInputType,
                    },
                }
            };
        }

        return queryTypes;
    }
}
