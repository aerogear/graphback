import { createVersionedInputFields,createVersionedFields } from "@graphback/codegen-schema";
import { GraphQLNonNull, GraphQLSchema, buildSchema, GraphQLString, GraphQLResolveInfo, GraphQLInt } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackOperationType, parseRelationshipAnnotation, metadataMap, GraphbackContext, getSelectedFieldsFromResolverInfo } from '@graphback/core'
import { parseMetadata } from "graphql-metadata";
import { SchemaComposer, ObjectTypeComposerFieldConfig } from 'graphql-compose';
import { IResolvers, IFieldResolver } from '@graphql-tools/utils'

import { getDeltaType, getDeltaListType, getDeltaQuery } from "./deltaMappingHelper";
import { isDataSyncService, isDataSyncModel } from "./util";

/**
 * Configuration for Schema generator CRUD plugin
 */


export const DATASYNC_PLUGIN_NAME = "DataSyncPlugin";

/**
 * DataSync plugin
 *
 * Plugin is enabled by """ @datasync """ annotation
 * It will generate delta queries
 */
export class DataSyncPlugin extends GraphbackPlugin {
  protected conflictField: string = "_version";

  public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema()
    const schemaComposer = new SchemaComposer(schema);
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.")

      return schema;
    }
    let dataSyncModelCount = 0;
    models.forEach((model: ModelDefinition) => {

      this.addDataSyncMetadataFields(schemaComposer, model);
      const modelName = model.graphqlType.name;
      const modifiedType = schemaComposer.getOTC(modelName);
      const entries = Object.entries(modifiedType.getFields()).filter((e: [string, ObjectTypeComposerFieldConfig<any, unknown, any>]) => {
        // Remove relationship fields from delta Types
        return parseRelationshipAnnotation(e[1].description) === undefined
      })

      const fields = Object.assign({}, ...Array.from(entries, ([k, v]: [string, any]) => ({ [k]: v })));

      schemaComposer.createObjectTC(getDeltaType(modelName)).addFields({
        ...fields,
        _deleted: 'Boolean',
      })

      schemaComposer.createObjectTC({
        name: getDeltaListType(modelName),
        fields: {
          items: `[${getDeltaType(modelName)}]!`,
          lastSync: `String`
        }
      })
      // Diff queries
      if (isDataSyncModel(model)) {

        dataSyncModelCount+= 1;

        const deltaQuery = getDeltaQuery(model.graphqlType.name)
        schemaComposer.Query.addFields({
          [deltaQuery]: `${getDeltaListType(modelName)}!`
        });
        const filterTypeName = getInputTypeName(modelName, GraphbackOperationType.FIND);
        schemaComposer.Query.addFieldArgs(deltaQuery, {
          lastSync: GraphQLNonNull(GraphQLString),
          filter: filterTypeName
        })

        // Add updatedAt arg to update and delete input types
        // for conflict resolution
        const { fieldNames } = metadataMap;

        const inputType = schemaComposer.getITC(getInputTypeName(model.graphqlType.name, GraphbackOperationType.UPDATE));
        if (inputType) {
          inputType.addFields({
            [this.conflictField]: {
              type: GraphQLNonNull(GraphQLInt)
            }
          });
        }
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

      return dataSyncService.sync(args.lastSync, {...context, graphback }, args.filter);
    }
  }

  protected addDataSyncMetadataFields(schemaComposer: SchemaComposer<any>, model: ModelDefinition) {
    const name = model.graphqlType.name;
    const modelTC = schemaComposer.getOTC(name);
    const desc = model.graphqlType.description;
    if (parseMetadata("datasync", desc)) {
      const metadataFields = createVersionedFields();
      // metadata fields needed for @versioned

      modelTC.addFields(metadataFields);
      modelTC.addFields({
        [this.conflictField]: {
          type: GraphQLInt
        }
      })

      const inputType = schemaComposer.getITC(getInputTypeName(model.graphqlType.name, GraphbackOperationType.FIND))
      if (inputType) {
        const metadataInputFields = createVersionedInputFields();
        inputType.addFields(metadataInputFields);
      }
    }
  }
}
