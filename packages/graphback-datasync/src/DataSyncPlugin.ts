import { GraphQLNonNull, GraphQLSchema, buildSchema, GraphQLResolveInfo, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLField } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackOperationType, parseRelationshipAnnotation, GraphbackContext, getSelectedFieldsFromResolverInfo, GraphbackTimestamp, isSpecifiedGraphbackScalarType } from '@graphback/core'
import { SchemaComposer } from 'graphql-compose';
import { IResolvers, IFieldResolver } from '@graphql-tools/utils'

import { getDeltaType, getDeltaListType, getDeltaQuery } from "./deltaMappingHelper";
import { isDataSyncService, isDataSyncModel, DataSyncFieldNames, GlobalConflictConfig, getModelConfigFromGlobal } from "./util";

export const DATASYNC_PLUGIN_NAME = "DataSyncPlugin";

export interface DataSyncPluginConfig {
  conflictConfig: GlobalConflictConfig
}

/**
 * DataSync plugin
 *
 * Plugin is enabled by """ @datasync """ annotation
 * It will generate delta queries
 */
export class DataSyncPlugin extends GraphbackPlugin {
  protected config: DataSyncPluginConfig;

  public constructor(config?: DataSyncPluginConfig) {
    super()
    this.config = {
      conflictConfig: {},
      ...config
    };
  }

  public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema()
    const schemaComposer = new SchemaComposer(schema);
    if (!schemaComposer.has(GraphbackTimestamp.name)) {
      schemaComposer.createScalarTC(GraphbackTimestamp);
    }
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.")

      return schema;
    }
    let dataSyncModelCount = 0;
    models.forEach((model: ModelDefinition) => {
      // Diff queries
      if (isDataSyncModel(model)) {

        dataSyncModelCount+= 1;

        this.addDataSyncFieldsToModel(schemaComposer, model);

        this.addDataSyncFieldsToInputTypes(schemaComposer, model);

        this.addDeltaQuery(schemaComposer, model);
      }
    })

    if (dataSyncModelCount === 0) {
      console.warn("No DataSync Models detected, ensure that your models are properly annotated.")
    }

    return buildSchema(schemaComposer.toSDL())
  }

  /**
   * Creates resolvers for Data Synchonization
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
      // If delta marker is encountered, add resolver for `delta` query
      if (isDataSyncModel(model)) {
        this.addDeltaSyncResolver(model, resolvers.Query as IFieldResolver<any, any>)
      }
    }

    return resolvers
  }

  public createResources(metadata: GraphbackCoreMetadata): void {
    // TODO generate delta resolvers
    // TODO DataSource support for deltas
    // Schema plugin is going to create schema for us
    // No work to be done
  }

  public getPluginName() {
    return DATASYNC_PLUGIN_NAME;
  }

  protected addDeltaSyncResolver(model: ModelDefinition, queryObj: IFieldResolver<any, any>) {
    const modelName = model.graphqlType.name;
    const deltaQuery = getDeltaQuery(modelName)

    queryObj[deltaQuery] = async (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      const dataSyncService = isDataSyncService(context.graphback.services[modelName]);
      if (dataSyncService === undefined) {
        throw Error("Service is not a DataSyncCRUDService. Please use DataSyncCRUDService and DataSync-compliant DataProvider with DataSync Plugin to get Delta Queries.")
      }

      const selectedFields = getSelectedFieldsFromResolverInfo(info, model, "items");
      const graphback = {
        services: context.graphback.services,
        options: { selectedFields }
      };

      return dataSyncService.sync(args.lastSync, {...context, graphback }, args.filter, args.limit);
    }
  }

  protected addDataSyncFieldsToModel(schemaComposer: SchemaComposer<any>, model: ModelDefinition) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const TimestampSTC = schemaComposer.getSTC(GraphbackTimestamp.name);

    modelTC.addFields({
      [DataSyncFieldNames.lastUpdatedAt]: {
        type: TimestampSTC.getType(),
        description: "@index(name: 'Datasync_lastUpdatedAt')"
      }
    });

    const modelUsesVersion = getModelConfigFromGlobal(model.graphqlType.name, this.config.conflictConfig).enabled;
    if (modelUsesVersion) {
      modelTC.addFields({
        [DataSyncFieldNames.version]: {
          type: GraphQLInt
        }
      });
    }
  }

  protected addDataSyncFieldsToInputTypes(schemaComposer: SchemaComposer<any>, model: ModelDefinition) {

    // Add _version argument to UpdateInputType
    const updateInputType = schemaComposer.getITC(getInputTypeName(model.graphqlType.name, GraphbackOperationType.UPDATE));
    const modelUsesVersion = getModelConfigFromGlobal(model.graphqlType.name, this.config.conflictConfig).enabled;
    if (modelUsesVersion && updateInputType) {
      updateInputType.addFields({
        [DataSyncFieldNames.version]: {
          type: GraphQLNonNull(GraphQLInt)
        }
      });
    }
  }

  protected addDeltaQuery(schemaComposer: SchemaComposer<unknown>, model: ModelDefinition) {
    // Create Delta Type
    const modelName = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(modelName);
    const TimestampSTC = schemaComposer.getSTC(GraphbackTimestamp.name);

    const DeltaTypeFieldNames = this.getDeltaTypeFieldNames(modelTC.getType());

    // Add Delta Type to schema
    const DeltaOTC = modelTC.clone(getDeltaType(modelName));

    DeltaOTC.removeOtherFields(DeltaTypeFieldNames);

    DeltaOTC.setDescription(undefined);

    DeltaOTC.addFields({
      [DataSyncFieldNames.deleted]: GraphQLBoolean
    })

    // Create and Add Delta List type to schema
    const DeltaListOTC = schemaComposer.createObjectTC({
      name: getDeltaListType(modelName),
      fields: {
        items: GraphQLNonNull(GraphQLList(DeltaOTC.getType())),
        lastSync: GraphQLNonNull(TimestampSTC.getType()),
        limit: GraphQLInt
      }
    });

    // Add Delta Queries
    const deltaQuery = getDeltaQuery(model.graphqlType.name);
    schemaComposer.Query.addFields({
      [deltaQuery]: GraphQLNonNull(DeltaListOTC.getType())
    });

    const findFilterITC = schemaComposer.getITC(getInputTypeName(modelName, GraphbackOperationType.FIND));
    schemaComposer.Query.addFieldArgs(deltaQuery, {
      lastSync: GraphQLNonNull(TimestampSTC.getType()),
      filter: findFilterITC.getType(),
      limit: GraphQLInt
    });
  }

  private getDeltaTypeFieldNames(modelTC: GraphQLObjectType): string[] {
    const DeltaTypeFieldEntries = Object.entries(modelTC.getFields()).filter((e: [string, GraphQLField<any, any>]) => {
      // Remove relationship fields from delta Type
      return parseRelationshipAnnotation(e[1].description) === undefined;
    });

    return DeltaTypeFieldEntries.map(([fieldName, _]: [string, GraphQLField<any, any>]) => {
      return fieldName
    });
  }
}
