import { getFieldName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, GraphbackCRUDGeneratorConfig } from '@graphback/core';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { join } from 'path';
import * as pluralize from 'pluralize';
import * as prettier from 'prettier';
import { generateResolverTemplate } from './ApolloTypeScriptResolverFormatter';
import { createTemplate, findAllTemplate, findTemplate, updateTemplate, newSubscriptionTemplate, deletedSubscriptionTemplate, updatedSubscriptionTemplate } from './resolverTemplates';

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
        const resolvers = this.generate(metadata.getModelDefinitions());

        this.write(resolvers);

        return metadata.getSchema();
    }

    private write(resolvers: { generated: any; custom: any; }) {
        const resolversDir = join(process.cwd(), this.options.resolverPath);

        for (const typeName of Object.keys(resolvers.generated)) {
            const typeResolver = resolvers.generated[typeName];
            const resolverTemplate = generateResolverTemplate(typeResolver, this.options);
            // TODO: smarter formatting based on environment
            const formattedTemplate = prettier.format(resolverTemplate, { semi: false, parser: "babel" });
            console.log(formattedTemplate);
        }
    }

    private generate(modelDefinitions: ModelDefinition[]) {
        const resolvers = {
            generated: {},
            custom: {}
        };

        for (const { graphqlType, crudOptions } of modelDefinitions) {
            if (crudOptions.disableGen) {
                continue;
            }

            const generatedResolvers = {
                Query: this.createQueries(graphqlType, crudOptions),
                Mutation: this.createMutations(graphqlType, crudOptions),
                Subscription: this.createSubscriptions(graphqlType, crudOptions)
            };

            resolvers.generated[graphqlType.name] = generatedResolvers;
        }

        // Delete Mutations key if not needed.
        // if (Object.keys(resolvers.Mutation).length === 0) {
        //     delete resolvers.Mutation;
        // }

        // // Delete Subscriptions key if not needed.
        // if (Object.keys(resolvers.Subscription).length === 0) {
        //     delete resolvers.Subscription;
        // }
        // TODO relationships

        return resolvers;
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
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.FIND);
            queries[fieldName] = findTemplate(objectName);
        }
        if (crudOptions.findAll) {
            const fieldName = pluralize(getFieldName(graphqlType.name, GraphbackOperationType.FIND_ALL));
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
}