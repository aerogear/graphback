import { GraphbackCRUDGeneratorConfig } from '@graphback/core'
import { printSchemaWithDirectives } from '@graphql-toolkit/common'
import { mergeSchemas } from "@graphql-toolkit/schema-merging"
import { GraphQLList, GraphQLNamedType, GraphQLInputType, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInputObjectType, GraphQLString, printSchema, GraphQLField, GraphQLID } from 'graphql';
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import * as pluralize from "pluralize";
import { globalCRUDMethods, schema as exampleSchema, schema } from './temp'
import { getBusinessTypesFromSchema } from './utils';

export interface SchemaGeneratorOptions {
    globalCRUDMethods?: GraphbackCRUDGeneratorConfig
}

const defaultGeneratorOptions = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true,
    "disableGen": false
}

type ModelDefinition = {
    graphqlType: GraphQLObjectType,
    crudOptions: GraphbackCRUDGeneratorConfig
};

export const decorateSchema = (schema: GraphQLSchema, options: SchemaGeneratorOptions): GraphQLSchema => {
    // Contains map of the models 
    const models: ModelDefinition[] = [];
    const modelsMap = {}
    const defaultCRUDOptions = Object.assign(defaultGeneratorOptions, options.globalCRUDMethods)
    // Get actual user types 
    const types = getBusinessTypesFromSchema(schema)
    for (const possibleModelType of types) {
        const hasModel = parseMarker('model', possibleModelType.description)
        if (hasModel) {
            let crudOptions = parseAnnotations('crud', possibleModelType.description)
            // Merge CRUD options
            crudOptions = Object.assign(defaultCRUDOptions, crudOptions);
            models.push({ graphqlType: possibleModelType, crudOptions })
            modelsMap[possibleModelType.name] = { graphqlType: possibleModelType, crudOptions }
        }
    }
    // FIXME validation if relationships are part of the model?
    // or assumming that every element of the relationship will be part of the model anyway?
    // or assumming that it will be responsible for user to build relationship handlers for non model elements?

    // SHOW ME WHAT YOU GOT!
    // console.log(JSON.stringify(models, undefined, 2))

    // Add query stuff
    const modelsSchema = buildSchemaForModels(models);

    // TODO

    return mergeSchemas({ schemas: [modelsSchema, schema] });
}

function buildSchemaForModels(models: ModelDefinition[]) {
    const queryTypes = {};
    const mutationTypes = {};
    // const subscriptionTypes = {};
    for (const model of Object.values(models)) {
        if (model.crudOptions.disableGen) {
            continue;
        }

        const pluralModelName = pluralize(model.graphqlType.name);
        const modelFields = Object.values(model.graphqlType.getFields());
        const modelInputType = new GraphQLInputObjectType({
            name: `${model.graphqlType.name}Input`,
            fields: () => (modelFields.reduce((fieldObj: any, current: any) => {
                // FIXME read id annotation instead of hardcoding id
                if (current.name !== 'id') {
                    fieldObj[current.name] = { type: current.type, description: '' }
                }

                return fieldObj;
            }, {}))
        });

        if (model.crudOptions.findAll) {
            queryTypes[`findAll${pluralModelName}`] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {}
            }
        }
        if (model.crudOptions.find) {
            queryTypes[`find${pluralModelName}`] = {
                type: GraphQLNonNull(GraphQLList(model.graphqlType)),
                args: {
                    filter: {
                        type: modelInputType,
                    },
                }
            }
        }
        if (model.crudOptions.create) {
            mutationTypes[`create${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    input: {
                        type: modelInputType,
                    },
                }
            }
        }

        if (model.crudOptions.update) {
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
            }
        }

        if (model.crudOptions.delete) {
            mutationTypes[`delete${model.graphqlType.name}`] = {
                type: GraphQLNonNull(model.graphqlType),
                args: {
                    id: {
                        type: GraphQLNonNull(GraphQLID),
                    }
                }
            }
        }
    }

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: () => (queryTypes)
    });

    const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: () => (mutationTypes)
    });


    const generatedSchema: GraphQLSchema = new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
    });

    //console.log(printSchemaWithDirectives(generatedSchema))

    return generatedSchema;
}

const result = decorateSchema(exampleSchema, { globalCRUDMethods })
console.log(printSchemaWithDirectives(result))
