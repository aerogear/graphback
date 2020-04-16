/* eslint-disable max-lines */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getFieldName, mapInputFields, getFilterInputTypeName, getInputFieldOutputType, getNonObjectFields, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, getInputTypeName, buildGeneratedRelationshipsFieldObject, getInputFieldName, isInputField, buildModifiedRelationshipsFieldObject, FieldRelationshipMetadata, isModelType, getModelFields, inputDataVariableName, inputFilterVariableName } from '@graphback/core'
import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, printSchema, GraphQLField, GraphQLInt, buildSchema, GraphQLArgument, getNullableType, isNonNullType, getNamedType, isScalarType, isObjectType } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters';

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

    this.buildSchemaForModels(schemaComposer, models);

    this.buildSchemaModelRelationships(schemaComposer, models);

    return schemaComposer.buildSchema();
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
    const schemaString = printSchema(schema);
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

    for (const model of Object.values(models)) {
      const dataInputType = this.createMutationInputType(model);
      const filterInputType = this.createQueryInputType(model);

      queryTypes = this.createQueries(model, queryTypes, filterInputType);
      mutationTypes = this.createMutations(model, mutationTypes, dataInputType, filterInputType);
      subscriptionTypes = this.createSubscriptions(model, subscriptionTypes, dataInputType, filterInputType);
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

  protected createQueryInputType(model: ModelDefinition) {
    const modelFields = getModelFields(model);

    const inputName = getFilterInputTypeName(model.graphqlType.name);

    return new GraphQLInputObjectType({
      name: inputName,
      fields: () => mapInputFields(modelFields)
        .reduce((fieldObj: any, { name, type, description }: any) => {
          fieldObj[name] = { type: getNullableType(type), description }

          return fieldObj;
        }, {})
    })
  }

  protected createMutationInputType(model: ModelDefinition) {
    const graphqlType = model.graphqlType;

    const modelFields = getModelFields(model);

    const inputName = getInputTypeName(graphqlType.name);

    return new GraphQLInputObjectType({
      name: inputName,
      fields: () => mapInputFields(modelFields, model.graphqlType)
        .reduce((fieldObj: any, { name, type, description }: any) => {
          fieldObj[name] = { type, description }

          return fieldObj;
        }, {})
    });
  }

  protected createSubscriptions(model: ModelDefinition, subscriptionTypes: any, dataInputType: GraphQLInputObjectType, filterInputType: GraphQLInputObjectType) {
    const name = model.graphqlType.name
    if (model.crudOptions.subCreate && model.crudOptions.create) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: dataInputType,
          },
        }
      };
    }
    if (model.crudOptions.subUpdate && model.crudOptions.update) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: dataInputType,
          },
        }
      };
    }
    if (model.crudOptions.subDelete && model.crudOptions.delete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)
      subscriptionTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: dataInputType,
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

  protected createMutations(model: ModelDefinition, mutationTypes: any, dataInputType: GraphQLInputObjectType, filterInputType: GraphQLInputObjectType) {
    const name = model.graphqlType.name
    if (model.crudOptions.create) {
      const operation = getFieldName(name, GraphbackOperationType.CREATE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: GraphQLNonNull(dataInputType)
          },
        }
      };
    }
    if (model.crudOptions.update) {
      const operation = getFieldName(name, GraphbackOperationType.UPDATE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: GraphQLNonNull(dataInputType)
          },
        }
      };
    }
    if (model.crudOptions.delete) {
      const operation = getFieldName(name, GraphbackOperationType.DELETE)
      mutationTypes[operation] = {
        type: GraphQLNonNull(model.graphqlType),
        args: {
          [inputDataVariableName]: {
            type: GraphQLNonNull(dataInputType)
          }
        }
      };
    }

    return mutationTypes;
  }

  protected createQueries(model: ModelDefinition, queryTypes: any, modelInputType: GraphQLInputObjectType) {
    const name = model.graphqlType.name;
    if (model.crudOptions.findAll) {
      const operation = getFieldName(name, GraphbackOperationType.FIND_ALL)
      queryTypes[operation] = {
        type: GraphQLNonNull(GraphQLList(model.graphqlType)),
        args: {
          limit: {
            type: GraphQLInt,
          },
          offset: {
            type: GraphQLInt,
          },
        },
      };
    }
    if (model.crudOptions.find) {
      const operation = getFieldName(name, GraphbackOperationType.FIND)
      queryTypes[operation] = {
        type: GraphQLNonNull(GraphQLList(model.graphqlType)),
        args: {
          [inputFilterVariableName]: {
            type: modelInputType,
          },
          limit: {
            type: GraphQLInt,
          },
          offset: {
            type: GraphQLInt,
          },
        }
      };
    }

    return queryTypes;
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
