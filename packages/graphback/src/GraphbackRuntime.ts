import { GraphbackPluginEngine, ModelDefinition } from '@graphback/core';
import { GraphbackCRUDService, LayeredRuntimeResolverCreator, GraphbackPubSubModel } from '@graphback/runtime';
import { GraphQLSchema } from 'graphql';
import { GraphbackGenerator, GraphbackGeneratorConfig } from './GraphbackGenerator';

/**
 * GraphbackRuntime
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackRuntime extends GraphbackGenerator {
  public constructor(schema: GraphQLSchema | string, config: GraphbackGeneratorConfig) {
    super(schema, config);
  }

  /**
   * Create backend with all related resources
   * 
   * @param services - contains object that provides custom CRUD services that will overide default ones
   * You can use one of the datasource helpers to create services
   */
  public buildRuntime(services: { [key: string]: GraphbackCRUDService } = {}) {
    const metadata = this.getMetadata();
    const models = metadata.getModelDefinitions();
    const runtimeResolversCreator = new LayeredRuntimeResolverCreator(models, services);

    return { schema: metadata.getSchema(), resolvers: runtimeResolversCreator.generate() }
  }

  /**
   * Get models for creation of the datasource
   */
  public getDataSourceModels() {
    const metadata = this.getMetadata();
    const models = metadata.getModelDefinitions();

    return models.reduce((pubSubModels: any, model: ModelDefinition) => {
      const pubSubModel: GraphbackPubSubModel = {
        name: model.graphqlType.name,
        pubSub: {
          publishCreate: model.crudOptions.subCreate,
          publishUpdate: model.crudOptions.subDelete,
          publishDelete: model.crudOptions.subUpdate
        }
      }
      pubSubModels.push(pubSubModel)
      
      return pubSubModels;
    }, []);
  }


  public getMetadata() {
    const pluginEngine = new GraphbackPluginEngine(this.schema, { crudMethods: this.config.crud })

    this.initializePlugins(pluginEngine)
    const metadata = pluginEngine.createSchema();

    return metadata
  }
}
