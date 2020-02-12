import { getFieldName, getSubscriptionName, GraphbackCRUDGeneratorConfig, GraphbackOperationType, ModelDefinition } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import { GeneratorResolversFormat } from '../GeneratorResolversFormat';
import { createTemplate, deletedSubscriptionTemplate, deleteTemplate, findAllTemplate, findTemplate, newSubscriptionTemplate, updatedSubscriptionTemplate, updateTemplate } from './resolverTemplates';

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

 
export function createMutations(modelType: GraphQLObjectType, crudOptions: GraphbackCRUDGeneratorConfig) {
    const mutations = {};

    const modelName = modelType.name;

    if (crudOptions.create) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.CREATE);
        mutations[fieldName] = createTemplate(modelName)
    }
    if (crudOptions.update) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.UPDATE);
        mutations[fieldName] = updateTemplate(modelName);
    }
    if (crudOptions.delete) {
        const fieldName = getFieldName(modelName, GraphbackOperationType.DELETE);
        mutations[fieldName] = deleteTemplate(modelName);
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
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.CREATE);
        subscriptions[fieldName] = newSubscriptionTemplate(modelName);
    }
    if (crudOptions.update && crudOptions.subUpdate) {
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.UPDATE);
        subscriptions[fieldName] = updatedSubscriptionTemplate(modelName);
    }
    if (crudOptions.delete && crudOptions.subDelete) {
        const fieldName = getSubscriptionName(modelName, GraphbackOperationType.DELETE);
        subscriptions[fieldName] = deletedSubscriptionTemplate(modelName);
    }

    return subscriptions;
}