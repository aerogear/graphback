import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { parseMetadata } from 'graphql-metadata'
import { getUserTypesFromSchema } from '@graphql-toolkit/common'
import { IResolvers } from '@graphql-tools/utils'
import { mergeResolvers } from '@graphql-tools/merge';
import { RelationshipMetadataBuilder, FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder'
import { getPrimaryKey } from '../db';
import { GraphbackOperationType, getFieldName, getSubscriptionName } from '../crud';
import { GraphbackCRUDGeneratorConfig } from './GraphbackCRUDGeneratorConfig'
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig'
import { ModelDefinition } from './ModelDefinition';

const defaultCRUDGeneratorConfig: GraphbackCRUDGeneratorConfig = {
  create: true,
  update: true,
  findOne: true,
  find: true,
  delete: true,
  subCreate: true,
  subUpdate: true,
  subDelete: true,
}

/**
 * Contains Graphback Core Models
 */
export class GraphbackCoreMetadata {

  private supportedCrudMethods: GraphbackCRUDGeneratorConfig
  private schema: GraphQLSchema;
  private resolvers: IResolvers;
  private models: ModelDefinition[];

  public constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema) {
    this.schema = schema;
    this.supportedCrudMethods = Object.assign({}, defaultCRUDGeneratorConfig, globalConfig?.crudMethods)
  }

  public getSchema() {
    return this.schema;
  }

  public setSchema(newSchema: GraphQLSchema) {
    this.schema = newSchema;
  }

  public addResolvers(resolvers: IResolvers) {
    if (resolvers) {
      const mergedResolvers = [
        this.resolvers,
        resolvers
      ]
      this.resolvers = mergeResolvers(mergedResolvers)
    }
  }

  public getResolvers(): IResolvers {
    return this.resolvers;
  }

  /**
   * Get Graphback Models - GraphQL Types with additional CRUD configuration
   */
  public getModelDefinitions() {
    //Contains map of the models with their underlying CRUD configuration
    this.models = [];
    //Get actual user types
    const modelTypes = this.getGraphQLTypesWithModel();

    const relationshipBuilder = new RelationshipMetadataBuilder(modelTypes);
    relationshipBuilder.build();

    for (const modelType of modelTypes) {
      const model = this.buildModel(modelType, relationshipBuilder.getModelRelationships(modelType.name));
      this.models.push(model);
    }

    return this.models;
  }

  /**
   * Helper for plugins to fetch all types that should be processed by Graphback plugins.
   * To mark type as enabled for graphback generators we need to add `model` annotations over the type.
   *
   * Returns all user types that have @model in description
   * @param schema
   */
  public getGraphQLTypesWithModel(): GraphQLObjectType[] {
    const types = getUserTypesFromSchema(this.schema)

    return types.filter((modelType: GraphQLObjectType) => parseMetadata('model', modelType))
  }

  private buildModel(modelType: GraphQLObjectType, relationships: FieldRelationshipMetadata[]): ModelDefinition {
    const crudOptions = this.getModelCRUDConfig(modelType, this.getSchema())
    // Whether to add delta queries
    const deltaSync = parseMetadata('delta', modelType);

    return {
      relationships,
      crudOptions,
      graphqlType: modelType,
      config: { deltaSync },
      primaryKey: getPrimaryKey(modelType).name
    };
  }

  /**
   * Merge model-specifc CRUD config with the global CRUD config.
   * Check if the user has specified custom queries, mutations or subscriptions
   * with a clashing name and disable CRUD generation for those too.
   *
   * @param {GraphQLObjectType} modelType - The Graphback model
   * @param {GraphQLSchema} schema - The full GraphQL schema
   */
  private getModelCRUDConfig(modelType: GraphQLObjectType, schema: GraphQLSchema): GraphbackCRUDGeneratorConfig {
    // parse CRUD config on model
    let crudOptions: GraphbackCRUDGeneratorConfig = parseMetadata('model', modelType)
    //Merge CRUD options from type with global ones
    crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions)

    let queryKeys: string[] = [];
    let mutationKeys: string[] = [];
    let subscriptionKeys: string[] = [];

    if (schema.getQueryType()) {
      queryKeys = Object.keys(schema.getQueryType().getFields())
    }
    if (schema.getMutationType()) {
      mutationKeys = Object.keys(schema.getMutationType().getFields())
    }
    if (schema.getSubscriptionType()) {
      subscriptionKeys = Object.keys(schema.getSubscriptionType().getFields())
    }

    const modelName = modelType.name

    // check if user has a custom query with the same name as one of the
    // Graphback CRUD queries. If so, disable generation of the query for the model
    const findQueryName = getFieldName(modelName, GraphbackOperationType.FIND)
    const getOneQueryName = getFieldName(modelName, GraphbackOperationType.FIND_ONE)
    if (queryKeys.includes(findQueryName)) {
      crudOptions.find = false
    }
    if (queryKeys.includes(getOneQueryName)) {
      crudOptions.findOne = false
    }

    // check if user has a custom subscription with the same name as one of the
    // Graphback CRUD queries .If so, disable generation of the query for the model
    const createMutationName = getFieldName(modelName, GraphbackOperationType.CREATE)
    const updateMutationName = getFieldName(modelName, GraphbackOperationType.UPDATE)
    const deleteMutationName = getFieldName(modelName, GraphbackOperationType.DELETE)
    if (mutationKeys.includes(createMutationName)) {
      crudOptions.create = false
      crudOptions.subCreate = false
    }
    if (mutationKeys.includes(updateMutationName)) {
      crudOptions.update = false
      crudOptions.update = false
    }
    if (mutationKeys.includes(deleteMutationName)) {
      crudOptions.delete = false
      crudOptions.subDelete = false
    }

    // check if user has a custom subscription with the same name as one of the
    // Graphback CRUD queries .If so, disable generation of the query for the model
    const createSubscriptionName = getSubscriptionName(modelName, GraphbackOperationType.CREATE)
    const updateSubscriptionName = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)
    const deleteSubscriptionName = getSubscriptionName(modelName, GraphbackOperationType.DELETE)
    if (subscriptionKeys.includes(createSubscriptionName)) {
      crudOptions.subCreate = false
    }
    if (subscriptionKeys.includes(updateSubscriptionName)) {
      crudOptions.subUpdate = false
    }
    if (subscriptionKeys.includes(deleteSubscriptionName)) {
      crudOptions.subDelete = false
    }

    return crudOptions
  }
}
