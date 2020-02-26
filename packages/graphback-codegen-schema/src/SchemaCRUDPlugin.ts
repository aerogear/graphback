import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getBaseType, getFieldName, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, getTableName, getInputTypeName } from '@graphback/core'
import { mergeSchemas } from "@graphql-toolkit/schema-merging"
import { getNullableType, GraphQLField, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, isObjectType, GraphQLInt } from 'graphql';
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters';
import { printSortedSchema } from './writer/schemaPrinter';

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
    /**
     * Output format for schema string
     */
    format: 'ts' | 'js' | 'graphql',

    /**
     * RelativePath for the output files created by generator
     */
    outputPath: string

    /**
     * Name of the output file (by default `schema`)
     */
    outputFileName?: string
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

    public constructor(pluginConfig?: SchemaCRUDPluginConfig) {
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

        const modelsSchema = this.buildSchemaForModels(models);

        return mergeSchemas({ schemas: [modelsSchema, schema] });
    }

    public createResources(metadata: GraphbackCoreMetadata): void {
        const schemaString = this.transformSchemaToString(metadata.getSchema());
        if (!existsSync(this.pluginConfig.outputPath)) {
            mkdirSync(this.pluginConfig.outputPath, { recursive: true });
        }

        const location = resolve(this.pluginConfig.outputPath, `${this.pluginConfig.outputFileName}.${this.pluginConfig.format}`);
        writeFileSync(location, schemaString);
    }

    /**
     * Create resolvers function that 
     * 
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
            if (this.pluginConfig.format === 'graphql') {
                return gqlSchemaFormatter.format(schemaString)
            }
        }
        throw Error("Invalid format specified. `options.format` supports only `ts`, `js` and `graphql` flags");
    }

    public getPluginName() {
        return SCHEMA_CRUD_PLUGIN_NAME;
    }

    protected buildSchemaForModels(models: ModelDefinition[]) {
        let queryTypes = {};
        let mutationTypes = {};
        let subscriptionTypes = {};

        for (const model of Object.values(models)) {
            const modelInputType = this.createInputTypes(model);
            queryTypes = this.createQueries(model, queryTypes, modelInputType);
            mutationTypes = this.createMutations(model, mutationTypes, modelInputType);
            subscriptionTypes = this.createSubscriptions(model, subscriptionTypes, modelInputType);

        }

        return this.createSchema(queryTypes, mutationTypes, subscriptionTypes);
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

    protected createSubscriptions(model: ModelDefinition, subscriptionTypes: any, modelInputType: GraphQLInputObjectType) {
        const name = model.graphqlType.name
        if (model.crudOptions.subCreate && model.crudOptions.create) {
            const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)
            subscriptionTypes[operation] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subUpdate && model.crudOptions.update) {
            const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)
            subscriptionTypes[operation] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subDelete && model.crudOptions.delete) {
            const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)
            subscriptionTypes[operation] = {
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

    protected createSchema(queryTypes: any, mutationTypes: any, subscriptionTypes: any) {

        const queryType = new GraphQLObjectType({
            name: 'Query',
            fields: () => (queryTypes)
        });

        let mutationType;
        if (Object.keys(mutationTypes).length !== 0) {
            mutationType = new GraphQLObjectType({
                name: 'Mutation',
                fields: () => (mutationTypes)
            });
        }

        let subscriptionType;
        if (Object.keys(subscriptionTypes).length !== 0) {
            subscriptionType = new GraphQLObjectType({
                name: 'Subscription',
                fields: () => (subscriptionTypes)
            });
        }

        return new GraphQLSchema({
            query: queryType,
            mutation: mutationType,
            subscription: subscriptionType
        });
    }

    protected createMutations(model: ModelDefinition, mutationTypes: any, modelInputType: GraphQLInputObjectType) {
        const name = model.graphqlType.name
        if (model.crudOptions.create) {
            const operation = getFieldName(name, GraphbackOperationType.CREATE)
            mutationTypes[operation] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType
                    },
                }
            };
        }
        if (model.crudOptions.update) {
            const operation = getFieldName(name, GraphbackOperationType.UPDATE)
            mutationTypes[operation] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType
                    },
                }
            };
        }
        if (model.crudOptions.delete) {
            const operation = getFieldName(name, GraphbackOperationType.DELETE)
            mutationTypes[operation] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType
                    }
                }
            };
        }

        return mutationTypes;
    }

    protected createQueries(model: ModelDefinition, queryTypes: any, modelInputType: GraphQLInputObjectType) {
        const name = model.graphqlType.name;
        if (model.crudOptions.findAll) {
            const operation = getFieldName(name, GraphbackOperationType.FIND_ALL)
            queryTypes[operation] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {
                    limit: {
                        type: GraphQLInt,
                    },
                    offset: {
                        type: GraphQLInt,
                    },
                },
            };
        }
        if (model.crudOptions.find) {
            const operation = getFieldName(name, GraphbackOperationType.FIND)
            queryTypes[operation] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {
                    fields: {
                        type: modelInputType,
                    },
                }
            };
        }

        return queryTypes;
    }
}
