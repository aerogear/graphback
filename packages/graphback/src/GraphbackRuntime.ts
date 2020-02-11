import { GraphbackPluginEngine, ModelDefinition } from '@graphback/core';
import { CRUDService, GraphbackCRUDService, KnexDBDataProvider, LayeredRuntimeResolverCreator } from '@graphback/runtime';
import { GraphQLSchema } from 'graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import Knex from 'knex';
import { GraphbackGenerator, GraphbackGeneratorConfig } from './GraphbackGenerator';

/**
 * GraphbackRuntime
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackRuntime extends GraphbackGenerator {

  constructor(schema: GraphQLSchema | string, config: GraphbackGeneratorConfig) {
    super(schema, config);
  }

  /**
   * Create backend with all related resources
   * 
   * @param serviceOverrides - contains object that provides custom CRUD services that will overide default ones
   */
  public buildRuntime(db: Knex, pubSub: PubSubEngine, serviceOverrides: { [key: string]: GraphbackCRUDService } = {}) {
    const pluginEngine = new GraphbackPluginEngine(this.schema, { crudMethods: this.config.crud })

    this.initializePlugins(pluginEngine)
    const metadata = pluginEngine.createSchema();
    const models = metadata.getModelDefinitions();
    const defaultServices = this.createDefaultRuntimeServices(models, db, pubSub)
    const services = Object.assign(defaultServices, serviceOverrides)
    const runtimeResolversCreator = new LayeredRuntimeResolverCreator(models, services);

    return { schema: metadata.getSchema(), resolvers: runtimeResolversCreator.generate() }
  }

  public createDefaultRuntimeServices(models: ModelDefinition[], db: Knex, pubSub: PubSubEngine, ) {
    return models.reduce((services: any, model: ModelDefinition) => {
      const dbLayer = new KnexDBDataProvider(model.graphqlType, db);
      services[model.graphqlType.name] = this.createService(services, model, dbLayer, pubSub);
    }, {})
  }

  private createService(services: any, model: ModelDefinition, dbLayer: KnexDBDataProvider, pubSub: PubSubEngine) {
    return new CRUDService(model.graphqlType, dbLayer, {
      pubSub,
      publishCreate: model.crudOptions.subCreate,
      publishDelete: model.crudOptions.subUpdate,
      publishUpdate: model.crudOptions.subDelete,
    });
  }
}


