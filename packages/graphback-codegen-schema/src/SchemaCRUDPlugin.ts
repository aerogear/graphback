/* eslint-disable max-lines */
import { existsSync, mkdirSync, writeFileSync, fstat } from 'fs';
import { resolve, dirname, join } from 'path';
import { getFieldName, metadataMap, printSchemaWithDirectives, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, buildGeneratedRelationshipsFieldObject, buildModifiedRelationshipsFieldObject, buildRelationshipFilterFieldMap, getInputTypeName, FieldRelationshipMetadata, getPrimaryKey, GraphbackContext } from '@graphback/core'
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLFloat, GraphQLString, isScalarType, isSpecifiedScalarType } from 'graphql';
import { SchemaComposer, NamedTypeComposer } from 'graphql-compose';
import { IResolvers, IFieldResolver } from '@graphql-tools/utils'
import { parseMarker } from "graphql-metadata";
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters';
import { buildFilterInputType, createModelListResultType, StringScalarInputType, BooleanScalarInputType, SortDirectionEnum, buildCreateMutationInputType, buildFindOneFieldMap, buildMutationInputType, OrderByInputType, buildSubscriptionFilterType, IDScalarInputType, PageRequest, createInputTypeForScalar } from './definitions/schemaDefinitions';

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
  /**
   * RelativePath for the output files created by generator
   * e.g. /path/to/schema/schema.graphql
   */
  outputPath?: string
}

export const SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";

/**
 * Graphback CRUD operations plugin
 *
 * Plugins adds additional Queries, Mutations and Subscriptions into the Schema along
 * with required input types and scalars. Plugin can be used automatically define best
 * patterns for CRUD operations on top of GraphQL Schema
 * Plugin checkes all types annotated with model
 *
 * Used graphql metadata:
 *
 * - model: marks type to be processed by CRUD generator
 * - crud: controls what types of operations can be generated.
 * For example crud.update: false will disable updates for type
 */
export class SchemaCRUDPlugin extends GraphbackPlugin {

  private pluginConfig: SchemaCRUDPluginConfig;

  public constructor(pluginConfig?: SchemaCRUDPluginConfig) {
    super()
    this.pluginConfig = {
      ...pluginConfig
    }
  }

  public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema();

    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.")

      return schema;
    };

    const schemaComposer = new SchemaComposer(schema)

    this.buildSchemaModelRelationships(schemaComposer, models);
    this.buildSchemaForModels(schemaComposer, models);
    this.addMetaFields(schemaComposer, models);

    return schemaComposer.buildSchema()
  }

  /**
   * Creates CRUD resolvers
   *
   * @param {GraphbackCoreMetadata} metadata - Core metatata containing all model information
   */
  public createResolvers(metadata: GraphbackCoreMetadata): IResolvers {
    const resolvers: IResolvers = {
      Query: {},
      Mutation: {},
      Subscription: {}
    }

    const models = metadata.getModelDefinitions()

    for (const model of models) {
      this.addQueryResolvers(model, resolvers.Query as IFieldResolver<any, any>)
      this.addMutationResolvers(model, resolvers.Mutation as IFieldResolver<any, any>)
      this.addSubscriptionResolvers(model, resolvers.Subscription as IFieldResolver<any, any>)
      this.addRelationshipResolvers(model, resolvers)
    }

    return resolvers
  }

  public createResources(metadata: GraphbackCoreMetadata): void {
    if (!this.pluginConfig.outputPath) {
      return
    }

    let schemaPath = resolve(this.pluginConfig.outputPath)

    // check if user path is to directory or full path to schema
    // assign default file name otherwise
    if (schemaPath.indexOf('.') === -1) {
      schemaPath = join(schemaPath, 'schema.graphql');
    }

    // get file extension
    const fileExtension = schemaPath.split('.').pop();

    const schemaString = this.transformSchemaToString(metadata.getSchema(), fileExtension);

    const outputDir = resolve(dirname(this.pluginConfig.outputPath))

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(schemaPath, schemaString);
  }



  public getPluginName() {
    return SCHEMA_CRUD_PLUGIN_NAME;
  }

  protected buildSchemaForModels(schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    this.createSchemaCRUDTypes(schemaComposer);

    for (const model of Object.values(models)) {
      this.createQueries(model, schemaComposer);
      this.createMutations(model, schemaComposer);
      this.createSubscriptions(model, schemaComposer);
    }

    for (const model of Object.values(models)) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      const modelRelationshipFilterFields = buildRelationshipFilterFieldMap(model);

      modifiedType.addFields(modelRelationshipFilterFields)
    }
  }

  protected createSubscriptions(model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()

    const subFilterInputType = buildSubscriptionFilterType(modelType);

    const subscriptionFields = {}
    if (model.crudOptions.subCreate && model.crudOptions.create) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }
    if (model.crudOptions.subUpdate && model.crudOptions.update) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }
    if (model.crudOptions.subDelete && model.crudOptions.delete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)
      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }

    schemaComposer.Subscription.addFields(subscriptionFields)
  }

  protected createSchema(queryTypes: any, mutationTypes: any, subscriptionTypes: any) {
    const queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => (queryTypes)
    });

    let mutationType;
    if (Object.keys(mutationTypes).length !== 0) {
      mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: () => (mutationTypes)
      });
    }

    let subscriptionType;
    if (Object.keys(subscriptionTypes).length !== 0) {
      subscriptionType = new GraphQLObjectType({
        name: 'Subscription',
        fields: () => (subscriptionTypes)
      });
    }

    return new GraphQLSchema({
      query: queryType,
      mutation: mutationType,
      subscription: subscriptionType
    });
  }

  protected createMutations(model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()

    const mutationInput = buildMutationInputType(modelType)

    const mutationFields = {}
    if (model.crudOptions.create) {
      const operation = getFieldName(name, GraphbackOperationType.CREATE)
      mutationFields[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          input: {
            type: GraphQLNonNull(buildCreateMutationInputType(modelType))
          },
        }
      };
    }
    if (model.crudOptions.update) {
      const operation = getFieldName(name, GraphbackOperationType.UPDATE)
      mutationFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          input: {
            type: GraphQLNonNull(mutationInput)
          },
        }
      };
    }
    if (model.crudOptions.delete) {
      const operation = getFieldName(name, GraphbackOperationType.DELETE)
      mutationFields[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          input: {
            type: GraphQLNonNull(mutationInput)
          }
        }
      };
    }

    schemaComposer.Mutation.addFields(mutationFields);
  }

  protected createQueries(model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()
    const filterInputType = buildFilterInputType(modelType);
    schemaComposer.add(filterInputType);
    const queryFields = {}
    if (model.crudOptions.findOne) {
      const operation = getFieldName(name, GraphbackOperationType.FIND_ONE)
      queryFields[operation] = {
        type: model.graphqlType,
        args: buildFindOneFieldMap(modelType)
      };
    }
    if (model.crudOptions.find) {
      const operation = getFieldName(name, GraphbackOperationType.FIND)
      const resultListType = createModelListResultType(modelType)
      queryFields[operation] = {
        type: GraphQLNonNull(resultListType),
        args: {
          filter: {
            type: filterInputType
          },
          page: {
            type: PageRequest
          },
          orderBy: {
            type: OrderByInputType
          }
        }
      };
    }

    schemaComposer.Query.addFields(queryFields)
  }

  protected addMetaFields(schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    models.forEach((model: ModelDefinition, index: number) => {
      const name = model.graphqlType.name;
      const modelTC = schemaComposer.getOTC(name);
      const desc = model.graphqlType.description;
      const { markers, fieldNames } = metadataMap;
      if (parseMarker(markers.versioned, desc)) {
        // metadata fields needed for @versioned

        modelTC.addFields({
          [fieldNames.createdAt]: {
            type: GraphQLString,
            description: `@${markers.createdAt}\n@db.type: 'timestamp'`
          },
          [fieldNames.updatedAt]: {
            type: GraphQLString,
            description: `@${markers.updatedAt}\n@db.type: 'timestamp'`
          }
        });

        const inputType = schemaComposer.getITC(getInputTypeName(model.graphqlType.name, GraphbackOperationType.FIND))
        if (inputType) {
          inputType.addFields({
            [fieldNames.createdAt]: {
              type: StringScalarInputType
            },
            [fieldNames.updatedAt]: {
              type: StringScalarInputType
            }
          });
        }
      }
    });
  }

  /**
   *
   * Print schema as a string and format in one of the available languages
   *
   * @param {GraphQLSchema} schema
   * @param {string} fileExtension
   */
  protected transformSchemaToString(schema: GraphQLSchema, fileExtension: string) {
    const schemaString = printSchemaWithDirectives(schema);
    if (this.pluginConfig) {
      if (fileExtension === 'ts') {
        return tsSchemaFormatter.format(schemaString)
      }
      if (fileExtension === 'js') {
        return jsSchemaFormatter.format(schemaString)
      }
      if (fileExtension === 'graphql') {
        return gqlSchemaFormatter.format(schemaString)
      }
    }
    throw Error(`Invalid format '${fileExtension}' specified. \`options.format\` supports only \`ts\`, \`js\` and \`graphql\` flags`);
  }

  /**
   * Create Query resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IFieldResolver} queryObj - Query resolver object
   */
  protected addQueryResolvers(model: ModelDefinition, queryObj: IFieldResolver<any, any>) {
    const modelType = model.graphqlType;

    if (model.crudOptions.findOne) {
      this.addFindOneQueryResolver(modelType, queryObj)
    }
    if (model.crudOptions.find) {
      this.addFindQueryResolver(modelType, queryObj)
    }
  }

  /**
   * Create Mutation resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addMutationResolvers(model: ModelDefinition, mutationObj: IFieldResolver<any, any>) {
    const modelType = model.graphqlType;

    if (model.crudOptions.create) {
      this.addCreateMutationResolver(modelType, mutationObj)
    }
    if (model.crudOptions.update) {
      this.addUpdateMutationResolver(modelType, mutationObj)
    }
    if (model.crudOptions.delete) {
      this.addDeleteMutationResolver(modelType, mutationObj)
    }
  }

  /**
   * Create Subscription resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IFieldResolver} subscriptionObj - Subscription resolver object
   */
  protected addSubscriptionResolvers(model: ModelDefinition, subscriptionObj: IFieldResolver<any, any>) {
    const modelType = model.graphqlType;

    if (model.crudOptions.create && model.crudOptions.subCreate) {
      this.addCreateSubscriptionResolver(modelType, subscriptionObj)
    }
    if (model.crudOptions.update && model.crudOptions.subUpdate) {
      this.addUpdateSubscriptionResolver(modelType, subscriptionObj)
    }
    if (model.crudOptions.delete && model.crudOptions.subDelete) {
      this.addDeleteSubscriptionResolver(modelType, subscriptionObj)
    }
  }

  /**
   * Create relationship resolver fields
   *
   * @param {ModelDefinition} model - Model definition with relationship metadata
   * @param {IResolvers} resolversObj - Resolvers object
   */
  protected addRelationshipResolvers(model: ModelDefinition, resolversObj: IResolvers) {
    const relationResolvers = {}
    for (const relationship of model.relationships) {
      if (relationship.kind === 'oneToMany') {
        this.addOneToManyResolver(relationship, relationResolvers)
      } else {
        this.addOneToOneResolver(relationship, relationResolvers)
      }
    }

    if (Object.keys(relationResolvers).length > 0) {
      resolversObj[model.graphqlType.name] = relationResolvers
    }
  }

  /**
   * Creates a Create mutation resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addCreateMutationResolver(modelType: GraphQLObjectType, mutationObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const resolverCreateField = getFieldName(modelName, GraphbackOperationType.CREATE);

    mutationObj[resolverCreateField] = (_: any, args: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].create(args.input, context)
    }
  }

  /**
   * Creates an Update mutation resolver
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addUpdateMutationResolver(modelType: GraphQLObjectType, mutationObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE);

    mutationObj[updateField] = (_: any, args: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].update(args.input, context)
    }
  }

  /**
   * Creates a Delete Mutation resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addDeleteMutationResolver(modelType: GraphQLObjectType, mutationObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE);

    mutationObj[deleteField] = (_: any, args: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].delete(args.input, context)
    }
  }

  /**
   * Creates a Find Query resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addFindQueryResolver(modelType: GraphQLObjectType, queryObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const findField = getFieldName(modelName, GraphbackOperationType.FIND);

    queryObj[findField] = (_: any, args: any, context: GraphbackContext) => {
      return context.graphback[modelName].findBy(args.filter, args.orderBy, args.page, context)
    }
  }

  /**
   * Creates a FindOne Query resolver
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addFindOneQueryResolver(modelType: GraphQLObjectType, queryObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const findOneField = getFieldName(modelName, GraphbackOperationType.FIND_ONE);

    const primaryKeyLabel = getPrimaryKey(modelType).name;

    queryObj[findOneField] = (_: any, args: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context)
    }
  }

  /**
   * Creates a Create Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addCreateSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType.CREATE)

    subscriptionObj[operation] = {
      subscribe: (_: any, __: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }

        return context.graphback[modelName].subscribeToCreate({}, context);
      }
    }
  }

  /**
   * Creates an Update Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addUpdateSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)

    subscriptionObj[operation] = {
      subscribe: (_: any, __: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }

        return context.graphback[modelName].subscribeToUpdate({}, context);
      }
    }
  }

  /**
   * Creates a Delete Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addDeleteSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const operation = getSubscriptionName(modelName, GraphbackOperationType.DELETE)

    subscriptionObj[operation] = {
      subscribe: (_: any, __: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`);
        }

        return context.graphback[modelName].subscribeToDelete({}, context);
      }
    }
  }

  /**
   * Creates a OneToMany Relationship resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IResolvers} resolverObj - Resolvers object
   */
  protected addOneToManyResolver(relationship: FieldRelationshipMetadata, resolverObj: IResolvers) {
    const modelName = relationship.relationType.name;
    const relationIdField = getPrimaryKey(relationship.relationType);
    const relationOwner = relationship.ownerField.name;

    resolverObj[relationOwner] = (parent: any, args: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].batchLoadData(relationship.relationForeignKey, parent[relationIdField.name], args.filter, context);
    }
  }

  /**
   * Creates a OneToOne/ManyToOne Relationship resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IResolvers} resolverObj - Resolvers object
   */
  protected addOneToOneResolver(relationship: FieldRelationshipMetadata, resolverObj: IResolvers) {
    const modelName = relationship.relationType.name;
    const relationIdField = getPrimaryKey(relationship.relationType);
    const relationOwner = relationship.ownerField.name;

    resolverObj[relationOwner] = (parent: any, _: any, context: GraphbackContext) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      return context.graphback[modelName].findOne({ [relationIdField.name]: parent[relationship.relationForeignKey] });
    }
  }

  private createSchemaCRUDTypes(schemaComposer: SchemaComposer<any>) {
    schemaComposer.add(PageRequest);
    schemaComposer.add(IDScalarInputType);
    schemaComposer.add(SortDirectionEnum);
    schemaComposer.add(StringScalarInputType);
    schemaComposer.add(BooleanScalarInputType);
    schemaComposer.add(createInputTypeForScalar(GraphQLInt));
    schemaComposer.add(createInputTypeForScalar(GraphQLFloat));

    schemaComposer.forEach((tc: NamedTypeComposer<any>) => {
      const namedType = tc.getType();
      if (isScalarType(namedType) && !isSpecifiedScalarType(namedType)) {
        schemaComposer.add(createInputTypeForScalar(namedType));
      }
    });
  }

  /**
   * Add relationship fields to GraphQL model types
   *
   * @param schema
   * @param models
   */
  private buildSchemaModelRelationships(schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    // create or update relationship fields to the model types.
    for (const model of models) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);

      const newRelationshipFields = buildGeneratedRelationshipsFieldObject(model);
      const modifiedRelationshipFields = buildModifiedRelationshipsFieldObject(model);

      // update existing model fields
      for (const [fieldName, fieldConfig] of Object.entries(modifiedRelationshipFields)) {
        modifiedType.removeField(fieldName);
        // TODO: Remove as any here
        modifiedType.addFields({ [fieldName]: fieldConfig as any });
      }

      modifiedType.addFields(newRelationshipFields);
    }
  }
}
