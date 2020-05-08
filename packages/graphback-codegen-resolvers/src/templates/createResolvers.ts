import { getFieldName, getSubscriptionName, GraphbackCRUDGeneratorConfig, GraphbackOperationType, ModelDefinition, FieldRelationshipMetadata, getPrimaryKey } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import { GeneratorResolversFormat } from '../GeneratorResolversFormat';
import { createTemplate, deletedSubscriptionTemplate, deleteTemplate, findTemplate, newSubscriptionTemplate, oneToOneTemplate, updatedSubscriptionTemplate, updateTemplate, oneToManyTemplate, findOneTemplate, findAllTemplate } from './resolverTemplates';

function createRelationshipResolvers(relationships: FieldRelationshipMetadata[]) {
  if (!relationships.length) {
    return undefined;
  }

  const resolvers = {};
  for (const relationship of relationships) {
    let resolverOutput: string;
    const relationTypeName = relationship.relationType.name;
    const relationIdField = getPrimaryKey(relationship.relationType);

    if (relationship.kind === 'oneToMany') {
      resolverOutput = oneToManyTemplate(relationTypeName, relationship.relationForeignKey, relationIdField.name)
    } else if (relationship.kind === 'oneToOne' || relationship.kind === 'manyToOne') {
      resolverOutput = oneToOneTemplate(relationTypeName, relationship.relationForeignKey, relationIdField.name)
    }

    resolvers[relationship.ownerField.name] = resolverOutput;
  }

  return resolvers;
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

  if (crudOptions.findOne) {
    const fieldName = getFieldName(modelName, GraphbackOperationType.FIND_ONE);
    queries[fieldName] = findOneTemplate(modelName);
  }
  if (crudOptions.find) {
    const fieldName = getFieldName(modelName, GraphbackOperationType.FIND);
    queries[fieldName] = findTemplate(modelName);
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

export function generateCRUDResolversFunctions(models: ModelDefinition[]): GeneratorResolversFormat {
  const outputResolvers = { Query: {}, Mutation: {}, Subscription: {} };

  for (const { graphqlType, crudOptions, relationships } of models) {
    const relationResolvers = createRelationshipResolvers(relationships);

    if (relationResolvers) {
      outputResolvers[graphqlType.name] = relationResolvers;
    }

    const newQueries = createQueries(graphqlType, crudOptions);
    outputResolvers.Query = { ...outputResolvers.Query, ...newQueries };
    const newMutations = createMutations(graphqlType, crudOptions);
    outputResolvers.Mutation = { ...outputResolvers.Mutation, ...newMutations };
    const newSubs = createSubscriptions(graphqlType, crudOptions);
    outputResolvers.Subscription = { ...outputResolvers.Subscription, ...newSubs };
  }

  return outputResolvers;
}
