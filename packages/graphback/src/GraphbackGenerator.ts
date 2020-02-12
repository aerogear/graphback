import { ClientGeneratorPluginConfig } from '@graphback/codegen-client';
import { ResolverGeneratorPluginConfig } from "@graphback/codegen-resolvers"
import { SchemaCRUDPluginConfig } from '@graphback/codegen-schema';
import { GraphbackCRUDGeneratorConfig, GraphbackPluginEngine } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
/**
 * Global configuration for Graphback ecosystem that represents each plugin 
 */
export interface GraphbackGeneratorConfig {
  crud?: GraphbackCRUDGeneratorConfig
  // Plugins configuration
  plugins?: {
    ResolversCRUD?: ResolverGeneratorPluginConfig
    SchemaCRUD?: SchemaCRUDPluginConfig
    ClientCRUD?: ClientGeneratorPluginConfig
  } | any
}

/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackGenerator {
  protected config: GraphbackGeneratorConfig;
  protected schema: string | GraphQLSchema;

  constructor(schema: GraphQLSchema | string, config: GraphbackGeneratorConfig) {
    this.schema = schema;
    this.config = config;
  }

  /**
   * Create backend with all related resources
   */
  public generateSourceCode() {
    const pluginEngine = new GraphbackPluginEngine(this.schema, { crudMethods: this.config.crud })
    this.initializePlugins(pluginEngine);

    pluginEngine.createResources();
  }

  protected initializePlugins(pluginEngine: GraphbackPluginEngine) {
    for (const pluginLabel of Object.keys(this.config.plugins)) {
      let pluginName;
      if (pluginLabel.startsWith('graphback-')) {
        // Internal graphback plugins needs rename
        pluginName = pluginLabel.replace('graphback-', '@graphback/codegen-');
      }
      else {
        pluginName = pluginLabel;
      }
      try {
        // tslint:disable-next-line: non-literal-require
        const plugin = require(pluginName);
        if (plugin.Plugin) {
          const config = this.config.plugins[pluginLabel];
          pluginEngine.registerPlugin(new plugin.Plugin(config));
        }
        else {
          // tslint:disable-next-line: no-console
          console.log(`${pluginName} plugin is not exporting 'Plugin' class`);
        }
      }
      catch (e) {
        // tslint:disable-next-line: no-console
        console.log(`${pluginName} plugin missing in package.json`, e);
      }
    }
  }
}


