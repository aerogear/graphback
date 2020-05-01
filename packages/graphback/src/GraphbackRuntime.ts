import { GraphbackPluginEngine, ModelDefinition, GraphbackCoreMetadata } from '@graphback/core';
import { GraphbackCRUDService, LayeredRuntimeResolverCreator, GraphbackModelConfig } from '@graphback/runtime';
import { GraphQLSchema } from 'graphql';
import { loadPlugins } from './loadPlugins';
import { GraphbackConfig } from './GraphbackConfig';

/**
 * GraphbackRuntime
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackRuntime {
  protected config: GraphbackConfig;
  protected schema: string | GraphQLSchema;
  protected metadata: GraphbackCoreMetadata;
  protected modelConfigs: GraphbackModelConfig[];

  public constructor(schema: GraphQLSchema | string, config: GraphbackConfig) {
    this.schema = schema;
    this.config = config;

    const plugins = loadPlugins(this.config.plugins);
    const pluginEngine = new GraphbackPluginEngine({
      schema: this.schema, 
      plugins,
      config: { crudMethods: this.config.crud }
    });
    this.metadata = pluginEngine.createSchema();

    const models = this.metadata.getModelDefinitions();
    this.modelConfigs = models.map((model: ModelDefinition) => {
      return {
        name: model.graphqlType.name,
        pubSub: {
          publishCreate: model.crudOptions.subCreate,
          publishUpdate: model.crudOptions.subDelete,
          publishDelete: model.crudOptions.subUpdate
        }
      } as GraphbackModelConfig;
    })
  }

  /**
   * Create backend with all related resources
   * 
   * @param services - contains object that provides custom CRUD services that will overide default ones
   * You can use one of the datasource helpers to create services
   */
  public buildRuntime(services: { [key: string]: GraphbackCRUDService } = {}) {
    const models = this.metadata.getModelDefinitions();
    const runtimeResolversCreator = new LayeredRuntimeResolverCreator(models, services);

    return { schema: this.metadata.getSchema(), resolvers: runtimeResolversCreator.generate() }
  }

  /**
   * Get models for creation of the datasource
   */
  public getDataSourceModels() {
    return this.modelConfigs;
  }

  public getMetadata() {
    return this.metadata;
  }
}
