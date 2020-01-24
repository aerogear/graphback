import { getModelTypesFromSchema, GraphbackCoreMetadata, GraphbackPlugin, TypeScriptResolversVisitor } from '@graphback/core';
import { buildASTSchema, GraphQLField, GraphQLFieldMap, GraphQLObjectType, GraphQLOutputType, GraphQLSchema, isListType, isNonNullType, parse, printSchema, visit } from 'graphql';
import { ResolverGeneratorOptions } from '../api/ResolverGeneratorOptions';
import * as pluralize from "pluralize";

export interface ResolverDefinition {
    generated: ResolverBaseTypeMap[]
}

export interface ResolverBaseTypeMap {
    [typeName: string]: ResolverMap
}

export interface ResolverMap {
    Query?: ResolverFunctionMap[]
}

export interface ResolverFunctionMap {
    [name: string]: string;
}

export class ResolverGeneratorPlugin extends GraphbackPlugin {
    private resolverDefinition: ResolverDefinition;
    constructor(config?: ResolverGeneratorOptions) {
        super();
        this.resolverDefinition = {
            generated: []
        }
    }

    public getPluginName() {
        return 'RESOLVER_GENERATOR';
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        return metadata.getSchema();
    }

    public createResolvers(schema: GraphQLSchema) {
        const models = getModelTypesFromSchema(schema);
        const queryType = schema.getQueryType();
        const queryFields = queryType.getFields();

        for (const model of models) {
            this.resolverDefinition[model.name] = {
                generated: []
            }

            this.createQueries(Object.values(queryFields), model.name);
        }
            console.log('h');
    }

    private createQueries(queryFields: GraphQLField<any, any>[], modelName: string) {
        const modelQueries = getModelQueryFields(queryFields, modelName);
        const pluralizedModelName = pluralize(modelName);

        const queryNames = modelQueries.map((field: GraphQLField<any, any>) => field.name);

        const pName = `findAll${pluralizedModelName}`;
        const x = queryNames[`findAll${pluralizedModelName}`];
        const y = queryNames[0];

        console.log(queryNames, y, x === y)

        if (queryNames[`findAll${pluralizedModelName}`]) {
            console.log('hello');
        }
    }
}

export function getBaseType(graphqlType: GraphQLOutputType) {
    if (isListType(graphqlType) || isNonNullType(graphqlType)) {
        return getBaseType(graphqlType.ofType);
    }

    return graphqlType;
}

function getModelQueryFields(queryFields: GraphQLField<any, any>[], modelName: string) {
    return queryFields.filter((field: GraphQLField<any, any>) => {
        const baseType = getBaseType(field.type);

        return baseType.name === modelName;
    });
}