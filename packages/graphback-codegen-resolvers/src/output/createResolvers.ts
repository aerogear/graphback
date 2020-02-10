import { getFieldName, getTableOrColumnName, GraphbackCRUDGeneratorConfig, GraphbackOperationType, ModelDefinition } from '@graphback/core';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getCustomTypeResolverFieldNames } from '../util/getCustomResolverFieldNames';
import { blankResolver, blankSubscription, createTemplate, deletedSubscriptionTemplate, deleteTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate } from './resolverTemplates';

export function generateCRUDResolvers(models: ModelDefinition[]) {
    const outputResolvers = {};

    for (const { graphqlType, crudOptions } of models) {

        const typeResolvers = {
            Query: createQueries(graphqlType, crudOptions),
            Mutation: createMutations(graphqlType, crudOptions),
            Subscription: createSubscriptions(graphqlType, crudOptions)
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
export function generateCustomCRUDResolvers(schema: GraphQLSchema, models: ModelDefinition[], generatedResolvers: any) {
    const queryType = schema.getQueryType()
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();

    const outputResolvers = {};
    for (const { graphqlType } of models) {
        const modelResolvers = generatedResolvers[graphqlType.name] || { Query: {}, Mutation: {}, Subscription: {} };

        const queries = createCustomResolvers(graphqlType.name, queryType, Object.keys(modelResolvers.Query));
        const mutations = createCustomResolvers(graphqlType.name, mutationType, Object.keys(modelResolvers.Mutation));
        const subscriptions = createCustomSubscriptionResolvers(graphqlType.name, subscriptionType, Object.keys(modelResolvers.Subscription));

        const typeResolvers = {
            Query: queries,
            Mutation: mutations,
            Subscription: subscriptions
        }

        outputResolvers[graphqlType.name] = typeResolvers;
    }

    return outputResolvers;
}

export function createMutations(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const mutations = {};

    const modelName = modelType.name;

    if (crudOptions.create) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.CREATE);
        // tslint:disable-next-line: no-any
        mutations[fieldName] = createTemplate(modelName, crudOptions.subCreate)
    }
    if (crudOptions.update) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.UPDATE);
        mutations[fieldName] = updateTemplate(modelName, crudOptions.update);
    }
    if (crudOptions.delete) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.DELETE);
        mutations[fieldName] = deleteTemplate(modelName, crudOptions.delete);
    }

    return mutations;
}

export function createQueries(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const queries = {};

    const modelName = modelType.name;

    if (crudOptions.find) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.FIND);
        queries[fieldName] = findTemplate(modelName);
    }
    if (crudOptions.findAll) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.FIND_ALL);
        queries[fieldName] = findAllTemplate(modelName);
    }

    return queries;
}

export function createSubscriptions(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const subscriptions = {};

    const modelName = modelType.name;

    if (crudOptions.create && crudOptions.subCreate) {
        // TOOO: Use core helper to get method name
        const fieldName = `new${modelName}`;
        subscriptions[fieldName] = newSubscriptionTemplate(modelName);
    }
    if (crudOptions.update && crudOptions.subUpdate) {
        // TOOO: Use core helper to get method name
        const fieldName = `updated${modelName}`;
        subscriptions[fieldName] = updatedSubscriptionTemplate(modelName);
    }
    if (crudOptions.delete && crudOptions.subDelete) {
        // TOOO: Use core helper to get method name
        const fieldName = `deleted${modelName}`;
        subscriptions[fieldName] = deletedSubscriptionTemplate(modelName);
    }

    return subscriptions;
}

// TODO: Check for custom resolvers using default resolver names
export function createCustomResolvers(modelName: string, resolverType: GraphQLObjectType, generatedResolverKeys: string[]) {
    const customKeys = getCustomTypeResolverFieldNames(modelName, resolverType, generatedResolverKeys);

    const resolvers = {};
    for (const key of customKeys) {
        resolvers[key] = blankResolver;
    }

    return resolvers;
}

export function createCustomSubscriptionResolvers(modelName: string, subscriptionType: GraphQLObjectType, generatedResolverKeys: string[]) {
    const customKeys = getCustomTypeResolverFieldNames(modelName, subscriptionType, generatedResolverKeys);

    const resolvers = {};
    for (const key of customKeys) {
        resolvers[key] = blankSubscription;
    }

    return resolvers;
}