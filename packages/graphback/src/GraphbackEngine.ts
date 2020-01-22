import { createResolvers, ResolverGeneratorOptions } from "@graphback/codegen-resolvers"
import { SchemaCRUDPlugin, SchemaCRUDPluginConfig } from '@graphback/codegen-schema';
import { GraphbackGlobalConfig, GraphbackPluginEngine, graphQLInputContext } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
import { IGraphQLBackend } from './IGraphQLBackend';
/**
 * Global configuration for Graphback ecosystem that represents each plugin 
 */
interface GraphbackEngineConfig {
  global?: GraphbackGlobalConfig
  // Plugins configuration
  plugins?: {
    ApolloResolversCRUD?: ResolverGeneratorOptions
    SchemaCRUD?: SchemaCRUDPluginConfig
  }
}

/**
 * GraphbackEngine
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackEngine {
  private config: GraphbackEngineConfig;
  private schema: string | GraphQLSchema;
  private inputContext: any;

  constructor(schema: GraphQLSchema | string, config: GraphbackEngineConfig) {
    this.schema = schema;
    this.config = config;
    // Legacy to be removed
    this.inputContext = graphQLInputContext.createModelContext(schema as string, {});
  }

  /**
   * Create backend with all related resources
   */
  // FIXME generator options should be moved to plugin config
  public buildBackend(resolverOptions: ResolverGeneratorOptions): IGraphQLBackend {
    const backend: IGraphQLBackend = {};

    const pluginEngine = new GraphbackPluginEngine(this.schema);
    const schemaConfig = this.config.plugins?.SchemaCRUD
    const schemaCRUDPlugin = new SchemaCRUDPlugin(this.config.global, schemaConfig);
    pluginEngine.registerPlugin(schemaCRUDPlugin);
    const resultSchema = pluginEngine.execute();

    backend.schema = schemaCRUDPlugin.transformSchemaToString(resultSchema);
    backend.resolvers = createResolvers(this.inputContext, resolverOptions);

    return backend;
  }
}


