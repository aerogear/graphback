import { getFieldName, GraphbackCoreMetadata, GraphbackCRUDGeneratorConfig, GraphbackOperationType, GraphbackPlugin, ModelDefinition } from '@graphback/core';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getCustomTypeResolverFieldNames } from '../util/getCustomResolverFieldNames';
import { blankResolver, blankSubscription, createTemplate, deletedSubscriptionTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate, deleteTemplate } from './resolverTemplates';
import { writeResolvers } from './writeResolvers';

export interface ResolverGeneratorPluginOptions {
    format: 'ts' | 'js'
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

const PLUGIN_NAME = 'CRUD_RESOLVER_GENERATOR';

/**
 * Graphback Resolver File Generator Plugin
 * 
 * Generates:
 * 
 * - default CRUD resolvers for all model types.
 * - blank resolver files to implements custom resolvers
 * 
 * And then writes to content to resolver files in the server.
 * 
 */
export class ResolverGeneratorPlugin extends GraphbackPlugin {
    private options: ResolverGeneratorPluginOptions;
    constructor(options: ResolverGeneratorPluginOptions) {
        super();
        // TODO: default options
        this.options = { ...options };
    }

    public getPluginName() {
        return PLUGIN_NAME;
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const schema = metadata.getSchema()
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without generating resolvers.")

            return schema;
        }

        const generatedResolvers = this.generateCRUDResolvers(models);
        const customResolvers = this.generateCustomCRUDResolvers(schema, models, generatedResolvers);

        if (this.options.format === 'ts') {
            writeResolvers({ generated: generatedResolvers, custom: customResolvers }, this.options);
        } else {
            throw new Error("Not implemented");
        }

        return metadata.getSchema();
    }

    /**
     * Creates generated resolvers for each model in the schema.
     * 
     * @param models 
     */
    private generateCRUDResolvers(models: ModelDefinition[]) {
        const outputResolvers = {};

        for (const { graphqlType, crudOptions } of models) {
            if (crudOptions.disableGen) {
                continue;
            }

            const typeResolvers = {
                Query: this.createQueries(graphqlType, crudOptions),
                Mutation: this.createMutations(graphqlType, crudOptions),
                Subscription: this.createSubscriptions(graphqlType, crudOptions)
            };

            outputResolvers[graphqlType.name] = typeResolvers;
        }

        return outputResolvers;
    }

    /**
     * Creates custom resolvers for each model in the schema.
     * 
     * @param models 
     */
    private generateCustomCRUDResolvers(schema: GraphQLSchema, models: ModelDefinition[], generatedResolvers: any) {
        const queryType = schema.getQueryType();
        const mutationType = schema.getMutationType();
        const subscriptionType = schema.getSubscriptionType();

        const outputResolvers = {};
        for (const { graphqlType } of models) {
            const modelResolvers = generatedResolvers[graphqlType.name] || { Query: {}, Mutation: {}, Subscription: {} };

            const queries = this.createCustomResolvers(graphqlType, queryType, Object.keys(modelResolvers.Query));
            const mutations = this.createCustomResolvers(graphqlType, mutationType, Object.keys(modelResolvers.Mutation));
            const subscriptions = this.createCustomSubscriptionResolvers(graphqlType, subscriptionType, Object.keys(modelResolvers.Subscription));

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
        const objectName = graphqlType.name.toLowerCase();

        const mutations = {};
        if (crudOptions.disableGen) {
            return mutations;
        }

        if (crudOptions.create) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.CREATE);
            // tslint:disable-next-line: no-any
            mutations[fieldName] = createTemplate(objectName, crudOptions.subCreate)
        }
        if (crudOptions.update) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.UPDATE);
            mutations[fieldName] = updateTemplate(objectName, crudOptions.update);
        }
        if (crudOptions.delete) {
            const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.DELETE);
            mutations[fieldName] = deleteTemplate(objectName, crudOptions.delete);
        }

        return mutations;
    }

    private createQueries(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
        const objectName = graphqlType.name.toLowerCase();

        const queries = {};
        if (crudOptions.disableGen) {
            return queries;
        }

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
        const objectName = graphqlType.name.toLowerCase();

        const subscriptions = {};
        if (crudOptions.disableGen) {
            return subscriptions;
        }

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

    private createCustomResolvers(graphqlType: GraphQLObjectType, resolverType: GraphQLObjectType, generatedResolverKeys: string[]) {
        const customKeys = getCustomTypeResolverFieldNames(graphqlType, resolverType, generatedResolverKeys);

        const resolvers = {};
        for (const key of customKeys) {
            resolvers[key] = blankResolver;
        }

        return resolvers;
    }

    private createCustomSubscriptionResolvers(graphqlType: GraphQLObjectType, subscriptionType: GraphQLObjectType, generatedResolverKeys: string[]) {
        const customKeys = getCustomTypeResolverFieldNames(graphqlType, subscriptionType, generatedResolverKeys);

        const resolvers = {};
        for (const key of customKeys) {
            resolvers[key] = blankSubscription;
        }

        return resolvers;
    }
}