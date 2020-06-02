/* eslint-disable max-lines */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getFieldName, printSchemaWithDirectives, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, buildGeneratedRelationshipsFieldObject, buildModifiedRelationshipsFieldObject, buildRelationshipFilterFieldMap, getInputTypeName } from '@graphback/core'
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLScalarType, isScalarType, isSpecifiedScalarType } from 'graphql';
import { SchemaComposer, NamedTypeComposer } from 'graphql-compose';
import { parseMarker } from "graphql-metadata";
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters';
import { buildFilterInputType, createModelListResultType, StringScalarInputType, BooleanScalarInputType, SortDirectionEnum, buildCreateMutationInputType, buildFindOneFieldMap, buildMutationInputType, OrderByInputType, buildSubscriptionFilterType, IDScalarInputType, PageRequest, createInputTypeForScalar } from './definitions/schemaDefinitions';
import { markers, fieldNames } from "./metadataAnnotations";

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
  /**
   * Output format for schema string
   */
  format: 'ts' | 'js' | 'graphql',

  /**
   * RelativePath for the output files created by generator
   */
  outputPath: string

  /**
   * Name of the output file (by default `schema`)
   */
  outputFileName?: string
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
    this.pluginConfig = Object.assign({ format: 'graphql', outputFileName: 'schema' }, pluginConfig);
    if (!pluginConfig.outputPath) {
      throw new Error("schema plugin requires outputPath parameter")
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

  public createResources(metadata: GraphbackCoreMetadata): void {
    const schemaString = this.transformSchemaToString(metadata.getSchema());
    if (!existsSync(this.pluginConfig.outputPath)) {
      mkdirSync(this.pluginConfig.outputPath, { recursive: true });
    }

    const location = resolve(this.pluginConfig.outputPath, `${this.pluginConfig.outputFileName}.${this.pluginConfig.format}`);
    writeFileSync(location, schemaString);
  }

  /**
   * Create resolvers function that
   *
   * @param inputContext
   * @param options
   */
  public transformSchemaToString(schema: GraphQLSchema) {
    const schemaString = printSchemaWithDirectives(schema);
    if (this.pluginConfig) {
      if (this.pluginConfig.format === 'ts') {
        return tsSchemaFormatter.format(schemaString)
      }
      if (this.pluginConfig.format === 'js') {
        return jsSchemaFormatter.format(schemaString)
      }
      if (this.pluginConfig.format === 'graphql') {
        return gqlSchemaFormatter.format(schemaString)
      }
    }
    throw Error("Invalid format specified. `options.format` supports only `ts`, `js` and `graphql` flags");
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
            type: buildFilterInputType(modelType)
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
    models.forEach((model: ModelDefinition, index: number)=> {
      const name = model.graphqlType.name; 
      const modelTC = schemaComposer.getOTC(name);
      const desc = model.graphqlType.description;
      if (parseMarker(markers.versioned, desc)) {
        // metadata fields needed for @versioned

        modelTC.addFields({
          [fieldNames.createdAt]: {
            type: GraphQLString,
            description: `@${markers.createdAt}
            @db.type: 'timestamp'`
          },
          [fieldNames.updatedAt]: {
            type: GraphQLString,
            description: `@${markers.updatedAt}
            @db.type: 'timestamp'`
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
