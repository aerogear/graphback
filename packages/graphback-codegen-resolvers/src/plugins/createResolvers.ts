import { getFieldName, GraphbackCRUDGeneratorConfig, GraphbackOperationType, ModelDefinition } from '@graphback/core';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getCustomTypeResolverFieldNames } from '../util/getCustomResolverFieldNames';
import { blankResolver, blankSubscription, createTemplate, deletedSubscriptionTemplate, deleteTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate } from './resolverTemplates';

export function generateCRUDResolvers(models: ModelDefinition[]) {
    const outputResolvers = {};

    for (const { graphqlType, crudOptions } of models) {
        if (crudOptions.disableGen) {
            continue;
        }

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
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();

    const outputResolvers = {};
    for (const { graphqlType } of models) {
        const modelResolvers = generatedResolvers[graphqlType.name] || { Query: {}, Mutation: {}, Subscription: {} };

        const queries = createCustomResolvers(graphqlType, queryType, Object.keys(modelResolvers.Query));
        const mutations = createCustomResolvers(graphqlType, mutationType, Object.keys(modelResolvers.Mutation));
        const subscriptions = createCustomSubscriptionResolvers(graphqlType, subscriptionType, Object.keys(modelResolvers.Subscription));

        const typeResolvers = {
            Query: queries,
            Mutation: mutations,
            Subscription: subscriptions
        }

        outputResolvers[graphqlType.name] = typeResolvers;
    }

    return outputResolvers;
}

export function createMutations(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
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

export function createQueries(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
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

export function createSubscriptions(graphqlType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const objectName = graphqlType.name.toLowerCase();

    const subscriptions = {};
    if (crudOptions.disableGen) {
        return subscriptions;
    }

    if (crudOptions.create && crudOptions.subCreate) {
        // TOOO: Use core helper to get method name
        const fieldName = `new${graphqlType.name}`;
        subscriptions[fieldName] = newSubscriptionTemplate(objectName);
    }
    if (crudOptions.update && crudOptions.subUpdate) {
        // TOOO: Use core helper to get method name
        const fieldName = `updated${graphqlType.name}`;
        subscriptions[fieldName] = updatedSubscriptionTemplate(objectName);
    }
    if (crudOptions.delete && crudOptions.subDelete) {
        // TOOO: Use core helper to get method name
        const fieldName = `deleted${graphqlType.name}`;
        subscriptions[fieldName] = deletedSubscriptionTemplate(objectName);
    }

    return subscriptions;
}

export function createCustomResolvers(graphqlTypeName: string, resolverType: GraphQLObjectType, generatedResolverKeys: string[]) {
    const customKeys = getCustomTypeResolverFieldNames(graphqlTypeName, resolverType, generatedResolverKeys);

    const resolvers = {};
    for (const key of customKeys) {
        resolvers[key] = blankResolver;
    }

    return resolvers;
}

export function createCustomSubscriptionResolvers(graphqlTypeName: string, subscriptionType: GraphQLObjectType, generatedResolverKeys: string[]) {
    const customKeys = getCustomTypeResolverFieldNames(graphqlTypeName, subscriptionType, generatedResolverKeys);

    const resolvers = {};
    for (const key of customKeys) {
        resolvers[key] = blankSubscription;
    }

    return resolvers;
}