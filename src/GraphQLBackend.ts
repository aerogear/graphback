import { IDataLayerResourcesManager } from './datasource/DataResourcesManager';
import { defaultConfig, GeneratorConfig } from './GeneratorConfig'
import { logger } from './logger'
import { ResolverInstance } from './resolvers/ResolverInstance';
import { ResolverManager } from './resolvers/ResolverManager';
import { allTypes, ResolverType } from './resolvers/ResolverType'
import { GraphQLSchemaGenerator } from './schema/SchemaGenerator'
import { SchemaParser } from './schema/SchemaParser'

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {

  private schemaParser: SchemaParser
  private dataLayerManager: IDataLayerResourcesManager;
  private resolverTypes: ResolverType[];
  private resolverManager: ResolverManager;
  private config: GeneratorConfig;

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(graphQLSchema: string, config: GeneratorConfig = {}) {
    // tslint:disable-next-line:prefer-object-spread
    this.config = Object.assign(defaultConfig, config);
    this.schemaParser = new SchemaParser(graphQLSchema);
    // Default resolvers
    this.resolverTypes = allTypes;
  }

  /**
   * Register new data resources manager responsible for creating database layer
   * For example in schema based databases manager will create/update underlying schema.
   */
  public registerDataResourcesManager(manager: IDataLayerResourcesManager) {
    this.dataLayerManager = manager;
  }

  /**
   * Register manager for creating resolver layer
   */
  public registerResolverManager(manager: ResolverManager) {
    this.resolverManager = manager;
  }

  /**
   * Set resolver operations that will be generated
   *
   * @param types - array of resolver operations that should be supported
   */
  public registerResolverTypes(types: ResolverType[]) {
    this.resolverTypes = types;
  }

  /**
   * Set resolver operations that will be generated
   *
   * @param types - array of resolver operations that should be supported
   */
  public setDatabaseContext(types: ResolverType[]) {
    this.resolverTypes = types;
  }

  // NOTES: Two approaches to generate backend
  // 1. Generate user visible schema and then parse it the same way as users will save it
  // Connect resolvers back to generated schema.

  // 2. Generate schema programmatically (as typescript objects) and pass it to execution engine (currently under construction) together with resolvers.
  // This is kinda  tricky as it will need to bypass entire server side execution (that currently basing on JSON files stored in the database)

  // This spike is using first approach for the moment as I wanted to avoid wider refactoring of the server

  /**
   * Create backend with all related resources
   */
  public async createBackend(): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {};

    try {
      await this.schemaParser.build(this.config);
      const context = this.schemaParser.getContext()

      if (this.resolverManager) {
        backend.resolvers = await this.resolverManager.build(context.types, this.resolverTypes);
      }
      if (this.config.generateGraphQLSchema) {
        logger.info("Generating schema")
        const generator = new GraphQLSchemaGenerator();
        const outputSchema = generator.generateNewSchema(context, backend.resolvers, this.config);
        backend.schema = outputSchema;
      } else {
        logger.info("Schema generation skipped.")
      }
      if (this.config.createDatabase && this.dataLayerManager) {
        logger.info("Creating database structure")
        this.dataLayerManager.createDatabaseResources(context.types);
      } else {
        logger.info("Database structure generation skipped.")
      }
    } catch (error) {
      logger.error(`Error on generation ${error}`)
    }

    return backend;
  }

}

/**
 * Represents generated graphql backend
 */
export interface IGraphQLBackend {
  // Human readable schema that should be replaced with current one
  schema?: string,
  // Resolvers that should be mounted to schema`
  resolvers?: ResolverInstance[]
}
