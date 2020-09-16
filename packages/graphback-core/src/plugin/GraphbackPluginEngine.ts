import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
import { GraphbackPlugin } from './GraphbackPlugin';

/**
 * options for the GraphbackPluginEngine
 */
export interface GraphBackPluginEngineOptions {
  schema: GraphQLSchema | string
  config?: GraphbackGlobalConfig
  plugins?: GraphbackPlugin[]
}
/**
 * Allows to execute chain of plugins that create resources.
 * Common use case is to decorate GraphQL schema with additional
 * actions and generate files like resolvers and database access logic
 *
 * Usage:
 * ```js
 * const engine = GraphbackPluginEngine({ schema });
 * engine.registerPlugin(plugin);
 * printSchema(engine.createResources());
 * ```
 */
export class GraphbackPluginEngine {

  private plugins: GraphbackPlugin[]
  private metadata: GraphbackCoreMetadata;

  public constructor({ schema, config, plugins }: GraphBackPluginEngineOptions) {
    this.plugins = plugins || [];
    if (!schema) {
      throw new Error("Plugin engine requires schema");
    }
    let graphQLSchema: GraphQLSchema;
    if (typeof schema === "string") {
      graphQLSchema = buildSchema(schema);
    } else {
      graphQLSchema = schema;
    }
    this.metadata = new GraphbackCoreMetadata(config, graphQLSchema);
  }

  public registerPlugin(...plugins: GraphbackPlugin[]): void {
    this.plugins.push(...plugins);
  }

  /**
   * Allows the transformation of schema by applying transformation logic for each plugin
   * Creation of resolvers, which has to come after all the changes in schema have been applied
   * Saving of the transformed schema and related files
   */
  public createResources(): GraphbackCoreMetadata {
    if (this.plugins.length === 0) {
      console.warn("GraphbackEngine: No Graphback plugins registered");
    }

    this.createSchema();

    this.createResolvers();

    //Save schema and all files
    for (const plugin of this.plugins) {
      plugin.createResources(this.metadata);
    }

    return this.metadata;
  }

  private createSchema() {
    //We need to apply all required changes to the schema we need
    //This is to ensure that every plugin can add changes to the schema
    for (const plugin of this.plugins) {
      this.metadata.buildAndSetModelDefinitions();
      const newSchema = plugin.transformSchema(this.metadata);
      this.metadata.setSchema(newSchema);
    }
  }

  private createResolvers() {
    for (const plugin of this.plugins) {
      const resolvers = plugin.createResolvers(this.metadata);
      this.metadata.addResolvers(resolvers)
    }
  }
}
