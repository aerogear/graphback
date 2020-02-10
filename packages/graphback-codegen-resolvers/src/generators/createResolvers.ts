import { getFieldName, getSubscriptionName, getTableOrColumnName, GraphbackCRUDGeneratorConfig, GraphbackOperationType, ModelDefinition } from '@graphback/core';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { blankResolver, blankSubscription, createTemplate, deletedSubscriptionTemplate, deleteTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate } from '../templates/resolverTemplates';

export interface GeneratorResolversFormat { Query: {}, Mutation: {}, Subscription: {} };

export function generateCRUDResolversFunctions(models: ModelDefinition[]): GeneratorResolversFormat {
    const outputResolvers = { Query: {}, Mutation: {}, Subscription: {} };

    for (const { graphqlType, crudOptions } of models) {
        const newQueries = createQueries(graphqlType, crudOptions);
        outputResolvers.Query = { ...outputResolvers.Query, ...newQueries };
        const newMutations = createMutations(graphqlType, crudOptions);
        outputResolvers.Mutation = { ...outputResolvers.Mutation, ...newMutations };
        const newSubs = createSubscriptions(graphqlType, crudOptions);
        outputResolvers.Subscription = { ...outputResolvers.Subscription, ...newSubs };
    }
    
    return outputResolvers;
}

/**
 * Creates custom resolvers for each model in the schema.
 * 
 * @param models 
 */
export function generateCustomResolversFunctions(schema: GraphQLSchema, generatedResolvers: GeneratorResolversFormat) {
    const queryType = schema.getQueryType()
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();

    const outputResolvers: GeneratorResolversFormat = { Query: {}, Mutation: {}, Subscription: {} };
    if (queryType) {
        const schemaFields = Object.values(queryType.getFields());
        for (const schemaField of schemaFields) {
            const fieldName = schemaField.name;
            if (!generatedResolvers.Query[fieldName]) {
                outputResolvers.Query[fieldName] = blankResolver;
            }
        }
    }

    if (mutationType) {
        const schemaFields = Object.values(mutationType.getFields());
        for (const schemaField of schemaFields) {
            const fieldName = schemaField.name;
            if (!generatedResolvers.Mutation[fieldName]) {
                outputResolvers.Mutation[fieldName] = blankResolver;
            }
        }
    }

    if (subscriptionType) {
        const schemaFields = Object.values(subscriptionType.getFields());
        for (const schemaField of schemaFields) {
            const fieldName = schemaField.name;
            if (!generatedResolvers.Subscription[fieldName]) {
                outputResolvers.Subscription[fieldName] = blankSubscription;
            }
        }
    }

    return outputResolvers;
}

export function createMutations(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const mutations = {};

    const tableName = getTableOrColumnName(modelType);
    const modelName = modelType.name;

    if (crudOptions.create) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.CREATE);
        mutations[fieldName] = createTemplate(tableName)
    }
    if (crudOptions.update) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.UPDATE);
        mutations[fieldName] = updateTemplate(tableName);
    }
    if (crudOptions.delete) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.DELETE);
        mutations[fieldName] = deleteTemplate(tableName);
    }

    return mutations;
}

export function createQueries(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const queries = {};

    const tableName = getTableOrColumnName(modelType);
    const modelName = modelType.name;

    if (crudOptions.find) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.FIND);
        queries[fieldName] = findTemplate(tableName);
    }
    if (crudOptions.findAll) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.FIND_ALL);
        queries[fieldName] = findAllTemplate(tableName);
    }

    return queries;
}

export function createSubscriptions(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const subscriptions = {};

    const tableName = getTableOrColumnName(modelType);
    const modelName = modelType.name;

    if (crudOptions.create && crudOptions.subCreate) {
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.CREATE);
        subscriptions[fieldName] = newSubscriptionTemplate(tableName);
    }
    if (crudOptions.update && crudOptions.subUpdate) {
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.UPDATE);
        subscriptions[fieldName] = updatedSubscriptionTemplate(tableName);
    }
    if (crudOptions.delete && crudOptions.subDelete) {
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.DELETE);
        subscriptions[fieldName] = deletedSubscriptionTemplate(tableName);
    }

    return subscriptions;
}