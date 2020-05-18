/* eslint-disable max-lines */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getFieldName, printSchemaWithDirectives, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, buildGeneratedRelationshipsFieldObject, buildModifiedRelationshipsFieldObject, buildRelationshipFilterField } from '@graphback/core'
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters';
import { buildFilterInputType, createModelListResultType, StringScalarInputType, IntScalarInputType, FloatScalarInputType, BooleanScalarInputType, SortDirectionEnum, buildCreateMutationInputType, buildFindOneFieldMap, buildUpdateMutationInputType, OrderByInputType, buildSubscriptionFilterType, IDScalarInputType, PageRequest } from './definitions/schemaDefinitions';

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

    // update model definitions with generated relationship fields
    metadata.setSchema(schemaComposer.buildSchema())

    this.buildSchemaForModels(schemaComposer, models);

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
    let queryTypes = {};
    let mutationTypes = {};
    let subscriptionTypes = {};

    this.createStandardTypes(schemaComposer)

    for (const model of Object.values(models)) {
      queryTypes = this.createQueries(model, queryTypes);
      mutationTypes = this.createMutations(model, mutationTypes);
      subscriptionTypes = this.createSubscriptions(model, subscriptionTypes);

      const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
      const modelRelationshipFilterFields = buildRelationshipFilterField(model);

      // TODO: Fix error "Error: Type with name "CommentFilter" does not exists"
      // update existing model fields
      for (const [fieldName, fieldConfig] of Object.entries(modelRelationshipFilterFields)) {
        modifiedType.removeField(fieldName);
        modifiedType.addFields({ [fieldName]: fieldConfig as any });
      }
    }

    if (Object.keys(queryTypes).length) {
      schemaComposer.Query.addFields(queryTypes);
    }
    if (Object.keys(mutationTypes).length) {
      schemaComposer.Mutation.addFields(mutationTypes);
    }
    if (Object.keys(subscriptionTypes).length) {
      schemaComposer.Subscription.addFields(subscriptionTypes);
    }
  }


  protected createSubscriptions(model: ModelDefinition, subscriptionTypes: any) {
    const name = model.graphqlType.name
    const subFilterInputType = buildSubscriptionFilterType(model);
    if (model.crudOptions.subCreate && model.crudOptions.create) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }
    if (model.crudOptions.subUpdate && model.crudOptions.update) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }
    if (model.crudOptions.subDelete && model.crudOptions.delete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          filter: {
            type: subFilterInputType,
          },
        }
      };
    }

    return subscriptionTypes;
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

  protected createMutations(model: ModelDefinition, mutationTypes: any) {
    const name = model.graphqlType.name
    if (model.crudOptions.create) {
      const operation = getFieldName(name, GraphbackOperationType.CREATE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          input: {
            type: GraphQLNonNull(buildCreateMutationInputType(model))
          },
        }
      };
    }
    if (model.crudOptions.update) {
      const operation = getFieldName(name, GraphbackOperationType.UPDATE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          input: {
            type: GraphQLNonNull(buildUpdateMutationInputType(model))
          },
        }
      };
    }
    if (model.crudOptions.delete) {
      const operation = getFieldName(name, GraphbackOperationType.DELETE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          input: {
            type: GraphQLNonNull(buildUpdateMutationInputType(model))
          }
        }
      };
    }

    return mutationTypes;
  }

  protected createQueries(model: ModelDefinition, queryTypes: any) {
    const name = model.graphqlType.name;

    if (model.crudOptions.findOne) {
      const operation = getFieldName(name, GraphbackOperationType.FIND_ONE)
      queryTypes[operation] = {
        type: model.graphqlType,
        args: buildFindOneFieldMap(model.graphqlType)
      };
    }
    if (model.crudOptions.find) {
      const operation = getFieldName(name, GraphbackOperationType.FIND)
      const resultListType = createModelListResultType(model.graphqlType)
      queryTypes[operation] = {
        type: GraphQLNonNull(resultListType),
        args: {
          filter: {
            type: buildFilterInputType(model.graphqlType)
          },
          page:{
            type: PageRequest
          },
          orderBy: {
            type: OrderByInputType
          }
        }
      };
    }

    return queryTypes;
  }

  protected createStandardTypes(schemaComposer: SchemaComposer<any>) {
    schemaComposer.add(IDScalarInputType)
    schemaComposer.add(StringScalarInputType)
    schemaComposer.add(IntScalarInputType)
    schemaComposer.add(FloatScalarInputType)
    schemaComposer.add(BooleanScalarInputType)
    schemaComposer.add(SortDirectionEnum)
    schemaComposer.add(PageRequest)
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
