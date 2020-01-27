import { getFieldName, GraphbackCoreMetadata, GraphbackCRUDGeneratorConfig, GraphbackOperationType, GraphbackPlugin, ModelDefinition } from '@graphback/core';
import { writeFileSync } from 'fs';
import { GraphQLField, GraphQLList, GraphQLNamedType, GraphQLNonNull, GraphQLObjectType, GraphQLOutputType, GraphQLSchema, isListType, isNonNullType, isWrappingType } from 'graphql';
import { join, resolve } from 'path';
import * as prettier from 'prettier';
import { generateResolverTemplate, resolversIndexFileTemplate } from './ApolloTypeScriptResolverFormatter';
import { blankResolver, blankSubscription, createTemplate, deletedSubscriptionTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate } from './resolverTemplates';

export interface ResolverGeneratorPluginOptions {
    resolverPath: string
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

export class ResolverGeneratorPlugin extends GraphbackPlugin {
    private options: ResolverGeneratorPluginOptions;
    constructor(options: ResolverGeneratorPluginOptions) {
        super();
        // TODO: default options
        this.options = options;
    }

    public getPluginName() {
        return 'RESOLVER_GENERATOR';
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const generatedResolvers = this.generateResolvers(metadata.getModelDefinitions());
        const customResolvers = this.generateCustomResolvers(metadata.getSchema(), metadata.getModelDefinitions(), generatedResolvers);

        this.write({ generated: generatedResolvers, custom: customResolvers });

        return metadata.getSchema();
    }

    private write(resolvers: { generated: any; custom: any; }) {
        const resolversDir = resolve(this.options.resolverPath);

        const modules = {};
        for (const groupKey of Object.keys(resolvers)) {
            const resolverGroup = resolvers[groupKey];
            for (const typeName of Object.keys(resolverGroup)) {
                const resolversOutput = resolverGroup[typeName];
                const resolverTemplate = generateResolverTemplate(resolversOutput, this.options);
                // TODO: smarter formatting based on environment
                const formattedTemplate = prettier.format(resolverTemplate, { semi: false, parser: "babel" });

                const fileName = typeName.toLowerCase();

                if (!modules[groupKey]) {
                    modules[groupKey] = [fileName];
                } else {
                    modules[groupKey].push(fileName);
                }

                writeFileSync(join(resolversDir, groupKey, `${fileName}.ts`), formattedTemplate);
            }
        }

        for (const group of Object.keys(modules)) {
            let exportName: string;
            if (group === 'custom') {
                exportName = 'customResolvers';
            }
            const indexOutput = resolversIndexFileTemplate(modules[group], exportName);

            const formattedIndex = prettier.format(indexOutput, { semi: false, parser: "babel" });
            writeFileSync(join(resolversDir, group, 'index.ts'), formattedIndex);
        }
    }

    private generateResolvers(modelDefinitions: ModelDefinition[]) {
        const outputResolvers = {};

        for (const { graphqlType, crudOptions } of modelDefinitions) {
            if (crudOptions.disableGen) {
                continue;
            }

            const typeResolvers = {
                Query: this.createQueries(graphqlType, crudOptions),
                Mutation: this.createMutations(graphqlType, crudOptions),
                Subscription: this.createSubscriptions(graphqlType, crudOptions)
            };

            outputResolvers[graphqlType.name] = typeResolvers;

            // TODO relationships
        }

        return outputResolvers;
    }

    private generateCustomResolvers(schema: GraphQLSchema, models: ModelDefinition[], generatedResolvers: any) {
        const queryType = schema.getQueryType();
        const mutationType = schema.getMutationType();
        const subscriptionType = schema.getSubscriptionType();

        const outputResolvers = {};
        for (const { graphqlType } of models) {
            const modelResolvers = generatedResolvers[graphqlType.name];

            const queries = this.createCustomResolvers(graphqlType, queryType, modelResolvers.Query);
            const mutations = this.createCustomResolvers(graphqlType, mutationType, modelResolvers.Mutation);
            const subscriptions = this.createCustomSubscriptionResolvers(graphqlType, subscriptionType, modelResolvers.Subscription);

            const typeResolvers = {
                Query: queries,
                Mutation: mutations,
                Subscription: subscriptions
            }

            outputResolvers[graphqlType.name] = typeResolvers;
        }

        return outputResolvers;
    }

    private createMutations(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
        const mutations = {};

        const objectName = graphqlType.name.toLowerCase();
        if (crudOptions.create) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.CREATE);
            // tslint:disable-next-line: no-any
            mutations[fieldName] = createTemplate(objectName, crudOptions.subCreate)
        }
        if (crudOptions.update) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.UPDATE);
            mutations[fieldName] = updateTemplate(objectName, crudOptions.subUpdate);
        }
        if (crudOptions.update) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.UPDATE);
            mutations[fieldName] = updateTemplate(objectName, crudOptions.update);
        }
        if (crudOptions.delete) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.DELETE);
            mutations[fieldName] = updateTemplate(objectName, crudOptions.delete);
        }

        return mutations;
    }

    private createQueries(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
        const queries = {};
        const objectName = graphqlType.name.toLowerCase();

        if (crudOptions.find) {
            const fieldName = getFieldName(objectName, GraphbackOperationType.FIND, 's');
            queries[fieldName] = findTemplate(objectName);
        }
        if (crudOptions.findAll) {
            const fieldName = getFieldName(objectName, GraphbackOperationType.FIND_ALL, 's');
            queries[fieldName] = findAllTemplate(objectName);
        }

        return queries;
    }

    private createSubscriptions(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
        const subscriptions = {};
        const objectName = graphqlType.name.toLowerCase();

        if (crudOptions.create && crudOptions.subCreate) {
            const fieldName = `new${graphqlType.name}`;
            subscriptions[fieldName] = newSubscriptionTemplate(objectName);
        }
        if (crudOptions.update && crudOptions.subUpdate) {
            const fieldName = `updated${graphqlType.name}`;
            subscriptions[fieldName] = updatedSubscriptionTemplate(objectName);
        }
        if (crudOptions.delete && crudOptions.subDelete) {
            const fieldName = `deleted${graphqlType.name}`;
            subscriptions[fieldName] = deletedSubscriptionTemplate(objectName);
        }

        return subscriptions;
    }

    private createCustomResolvers(graphqlType: GraphQLObjectType, queryType: GraphQLObjectType, generatedResolvers: any) {
        const customKeys = getCustomResolverKeys(graphqlType, queryType, generatedResolvers);

        const resolvers = {};
        for (const key of customKeys) {
            resolvers[key] = blankResolver();
        }

        return resolvers;
    }

    private createCustomSubscriptionResolvers(graphqlType: GraphQLObjectType, queryType: GraphQLObjectType, generatedResolvers: any) {
        const customKeys = getCustomResolverKeys(graphqlType, queryType, generatedResolvers);

        const resolvers = {};
        for (const key of customKeys) {
            resolvers[key] = blankSubscription();
        }

        return resolvers;
    }
}

function getCustomResolverKeys(graphqlType: GraphQLObjectType, resolverObject: GraphQLObjectType<any, any, { [key: string]: any; }>, generatedResolvers: any) {
    const modelQueries = getTypeResolvers(graphqlType, resolverObject);
    const modelKeys = modelQueries.map((query: GraphQLField<any, any>) => query.name);
    const generatedKeys = Object.keys(generatedResolvers);

    return arrayDiff(generatedKeys, modelKeys);
}

// tslint:disable-next-line: no-reserved-keywords
export function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
    if (isWrappingType(type)) {
        return getBaseType(type.ofType);
    } else {
        return type;
    }
}

function getTypeResolvers(graphqlType: GraphQLObjectType, resolverType: GraphQLObjectType) {
    const resolverFields = Object.values(resolverType.getFields());

    return resolverFields.filter((field: GraphQLField<any, any>) => getBaseType(field.type).name === graphqlType.name);
}

function arrayDiff(defaultKeys: string[], allKeys: string[]): string[] {
    return allKeys.filter((key: string) => defaultKeys.indexOf(key) === -1);
}