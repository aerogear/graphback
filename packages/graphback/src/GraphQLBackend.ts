import { Client, ClientGenerator } from './client';
import { createInputContext } from './ContextCreator';
import { OBJECT_TYPE_DEFINITION, Type } from './ContextTypes';
import { DatabaseContextProvider, DefaultDataContextProvider } from './datasource/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './datasource/DataResourcesManager';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { logger } from './logger'
import { OutputResolver, ResolverGenerator } from './resolvers';
import { SchemaGenerator } from './schema';
/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {

  private dataLayerManager: IDataLayerResourcesManager;
  private dbContextProvider: DatabaseContextProvider;
  private inputContext: Type[]

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(graphQLSchema: string, config: GraphQLGeneratorConfig) {
    this.inputContext = createInputContext(graphQLSchema, config)
    this.dbContextProvider = new DefaultDataContextProvider();
  }

  /**
   * Register new data resources manager responsible for creating database layer
   * For example in schema based databases manager will create/update underlying schema.
   */
  public registerDataResourcesManager(manager: IDataLayerResourcesManager) {
    this.dataLayerManager = manager;
  }

  /**
   * Set resolver operations that will be generated
   *
   * @param types - array of resolver operations that should be supported
   */
  public setDatabaseContext(provider: DatabaseContextProvider) {
    this.dbContextProvider = provider;
  }

  /**
   * Create backend with all related resources
   */
  public async createBackend(database: string): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {};

    const schemaGenerator = new SchemaGenerator(this.inputContext)
    backend.schema = schemaGenerator.generate()

    const resolverGenerator = new ResolverGenerator(this.inputContext)
    backend.resolvers = resolverGenerator.generate(database)

    return backend;
  }

  public async createClient(): Promise<Client> {
    const clientGenerator = new ClientGenerator(this.inputContext)

    return clientGenerator.generate()
  }


  public async createDatabase(): Promise<void> {
    const context = this.inputContext.filter((t: Type) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
    try {
      if (this.dataLayerManager) {
        logger.info("Creating database structure")
        await this.dataLayerManager.createDatabaseResources(this.dbContextProvider, context);
        await this.dataLayerManager.createDatabaseRelations(this.dbContextProvider, context);
      } else {
        logger.info("Database structure generation skipped.")
      }
    } catch (error) {
      // logger.error(`Error on Database creation ${error}`)
      throw error
    }

  }
}

/**
 * Represents generated graphql backend
 */
export interface IGraphQLBackend {
  // Human readable schema that should be replaced with current one
  schema?: string,
  // Resolvers that should be mounted to schema`
  resolvers?: IGraphbackResolvers
}

export interface IGraphbackResolvers {
  // Index file for resolvers stitching
  index?: string
  // Resolvers
  types?: OutputResolver[],
  // Custom resolvers stubs
  custom?: OutputResolver[]
}
