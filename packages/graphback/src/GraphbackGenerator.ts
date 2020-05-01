import { GraphbackPluginEngine } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
import { loadPlugins } from './loadPlugins';
import { GraphbackConfig } from './GraphbackConfig';

/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackGenerator {
  protected config: GraphbackConfig;
  protected schema: string | GraphQLSchema;

  public constructor(schema: GraphQLSchema | string, config: GraphbackConfig) {
    this.schema = schema;
    this.config = config;
  }

  /**
   * Create backend with all related resources
   */
  public generateSourceCode() {
    const plugins = loadPlugins(this.config.plugins);
    const pluginEngine = new GraphbackPluginEngine({
      schema: this.schema,
      plugins,
      config: { crudMethods: this.config.crud },
    })

    pluginEngine.createResources();
  }  
}


