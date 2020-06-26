import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { parseMetadata } from 'graphql-metadata'
import { getUserTypesFromSchema } from '@graphql-toolkit/common'
import { IResolvers } from '@graphql-tools/utils'
import { mergeResolvers } from '@graphql-tools/merge';
import { RelationshipMetadataBuilder, FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder'
import { getPrimaryKey } from '../db';
import { GraphbackCRUDGeneratorConfig } from './GraphbackCRUDGeneratorConfig'
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig'
import { ModelDefinition } from './ModelDefinition';

const defaultCRUDGeneratorConfig = {
  "create": true,
  "update": true,
  "findOne": true,
  "find": true,
  "delete": true,
  "subCreate": true,
  "subUpdate": true,
  "subDelete": true,
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
    let crudOptions = parseMetadata('model', modelType)
    //Merge CRUD options from type with global ones
    crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions)
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
}
