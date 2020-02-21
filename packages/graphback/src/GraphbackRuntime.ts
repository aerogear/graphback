import { GraphbackPluginEngine, ModelDefinition } from '@graphback/core';
import { CRUDService, GraphbackCRUDService, LayeredRuntimeResolverCreator, GraphbackDataProvider } from '@graphback/runtime';
import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackGenerator, GraphbackGeneratorConfig } from './GraphbackGenerator';

/**
 * GraphbackRuntime
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export abstract class GraphbackRuntime extends GraphbackGenerator {
  public constructor(schema: GraphQLSchema | string, config: GraphbackGeneratorConfig) {
    super(schema, config);
  }

  /**
   * Create backend with all related resources
   * 
   * @param serviceOverrides - contains object that provides custom CRUD services that will overide default ones
   */
  public buildRuntime(pubSub: PubSubEngine, serviceOverrides: { [key: string]: GraphbackCRUDService } = {}) {
    const pluginEngine = new GraphbackPluginEngine(this.schema, { crudMethods: this.config.crud })

    this.initializePlugins(pluginEngine)
    const metadata = pluginEngine.createSchema();
    const models = metadata.getModelDefinitions();
    const defaultServices = this.createDefaultRuntimeServices(models, pubSub)
    const services = Object.assign(defaultServices, serviceOverrides)
    const runtimeResolversCreator = new LayeredRuntimeResolverCreator(models, services);

    return { schema: metadata.getSchema(), resolvers: runtimeResolversCreator.generate() }
  }

  protected createDefaultRuntimeServices(models: ModelDefinition[], pubSub: PubSubEngine, ) {
    return models.reduce((services: any, model: ModelDefinition) => {
      const dbLayer = this.createDBProvider(model);
      services[model.graphqlType.name] = this.createService(model, dbLayer, pubSub);

      return services;
    }, {})
  }

  protected createService(model: ModelDefinition, dbLayer: GraphbackDataProvider, pubSub: PubSubEngine) {
    return new CRUDService(model.graphqlType, dbLayer, {
      pubSub,
      publishCreate: model.crudOptions.subCreate,
      publishDelete: model.crudOptions.subUpdate,
      publishUpdate: model.crudOptions.subDelete,
    });
  }

  /**
   * Create db provider can connect with various providers.
   * Choose from @graphback/runtime-knex and @graphback/runtime-mongodb providers
   * 
   * @param model 
   * @param db 
   */
  protected abstract createDBProvider(model: ModelDefinition);
}
