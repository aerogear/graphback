import { ClientCRUDPlugin, ClientGeneratorPluginConfig } from '@graphback/codegen-client';
import { ResolverGeneratorPlugin, ResolverGeneratorPluginOptions } from "@graphback/codegen-resolvers"
import { SchemaCRUDPlugin, SchemaCRUDPluginConfig } from '@graphback/codegen-schema';
import { GraphbackGlobalConfig, GraphbackPluginEngine } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
/**
 * Global configuration for Graphback ecosystem that represents each plugin 
 */
export interface GraphbackGeneratorConfig {
  global?: GraphbackGlobalConfig
  // Plugins configuration
  plugins?: {
    ResolversCRUD?: ResolverGeneratorPluginOptions
    SchemaCRUD?: SchemaCRUDPluginConfig
    ClientCRUD?: ClientGeneratorPluginConfig
  }
}

/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackGenerator {
  private config: GraphbackGeneratorConfig;
  private schema: string | GraphQLSchema;

  constructor(schema: GraphQLSchema | string, config: GraphbackGeneratorConfig) {
    this.schema = schema;
    this.config = config;
  }

  /**
   * Create backend with all related resources
   */
  // FIXME generator options should be moved to plugin config
  public buildServer() {
    const pluginEngine = new GraphbackPluginEngine(this.schema, this.config.global);
    // TODO declarative plugin definition
    const schemaConfig = this.config.plugins?.SchemaCRUD
    const schemaCRUDPlugin = new SchemaCRUDPlugin(schemaConfig);
    const resolverPlugin = new ResolverGeneratorPlugin(this.config.plugins?.ResolversCRUD);
    const clientCRUDPlugin = new ClientCRUDPlugin(this.config.plugins.ClientCRUD)
    pluginEngine.registerPlugin(schemaCRUDPlugin, resolverPlugin, clientCRUDPlugin);
    pluginEngine.execute();
  }
}


