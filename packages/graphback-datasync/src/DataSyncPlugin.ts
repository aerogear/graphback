
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackOperationType, parseRelationshipAnnotation, metadataMap, GraphbackContext } from '@graphback/core'
import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema, buildSchema, GraphQLString, GraphQLBoolean } from 'graphql';
import { parseMetadata } from "graphql-metadata";
import { SchemaComposer, ObjectTypeComposerFieldConfig } from 'graphql-compose';
import { IResolvers, IFieldResolver } from '@graphql-tools/utils'
import { getDeltaType, getDeltaListType, getDeltaQuery } from "./deltaMappingHelper";

/**
 * Configuration for Schema generator CRUD plugin
 */


export const SCHEMA_CRUD_PLUGIN_NAME = "DatasyncPlugin";

/**
 * DataSync plugin
 *
 * Plugin is enabled by """ @delta """ annotation
 * It will generate delta queries
 */
export class DataSyncPlugin extends GraphbackPlugin {

  public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema()
    const schemaComposer = new SchemaComposer(schema);
    const models = metadata.getModelDefinitions();
    if (models.length === 0) {
      this.logWarning("Provided schema has no models. Returning original schema without any changes.")

      return schema;
    }
    models.forEach((model: ModelDefinition) => {

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
      if (parseMetadata('delta', model.graphqlType)) {

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
            [fieldNames.updatedAt]: {
              type: GraphQLNonNull(GraphQLString)
            }
          });
        }
      }
    })

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
      if (model.config.deltaSync) {
        this.addDeltaSyncResolver(model.graphqlType, resolvers.Query as IFieldResolver<any, any>)
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
    return SCHEMA_CRUD_PLUGIN_NAME;
  }

  protected addDeltaSyncResolver(modelType: GraphQLObjectType, queryObj: IFieldResolver<any, any>) {
    const modelName = modelType.name;
    const deltaQuery = getDeltaQuery(modelType.name)

    queryObj[deltaQuery] = async (_: any, args: any, context: GraphbackContext) => {
      const dataSyncService: any = context.graphback[modelName];

      if (dataSyncService.sync === undefined) {
        throw Error("Please use DataSync provider for delta queries");
      }

      return dataSyncService.sync(args.lastSync);
    }
  }
}
