import { Client, ClientGenerator } from './client';
import { createInputContext } from './ContextCreator';
import { Config, OBJECT_TYPE_DEFINITION, Type } from './ContextTypes';
import { DatabaseContextProvider, DefaultDataContextProvider } from './datasource/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './datasource/DataResourcesManager';
import { logger } from './logger'
import { OutputResolver, ResolverGenerator } from './resolvers';
import { SchemaGenerator } from './schema';
import { ModuleGenerator } from './modules';
import { readFileSync } from 'fs';
import * as path from 'path';

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {

  private dataLayerManager: IDataLayerResourcesManager;
  private dbContextProvider: DatabaseContextProvider;
  private models: IGraphbackModel[]
  private inputContext: Type[]
  private config: Config

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(models: IGraphbackModel[], config: Config) {
    this.models = models;
    this.config = config;
    const fullSchema = models.map((m: IGraphbackModel) => m.schema).join('\n');
    this.inputContext = createInputContext(fullSchema, config);
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

  // NOTES: Two approaches to generate backend
  // 1. Generate user visible schema and then parse it the same way as users will save it
  // Connect resolvers back to generated schema.

  // 2. Generate schema programmatically (as typescript objects) and pass it to execution engine (currently under construction) together with resolvers.
  // This is kinda  tricky as it will need to bypass entire server side execution (that currently basing on JSON files stored in the database)

  // This spike is using first approach for the moment as I wanted to avoid wider refactoring of the server

  /**
   * Create backend with all related resources
   */
  public async createBackend(database: string): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {
      modules: []
    };

    const moduleGenerator = new ModuleGenerator();

    this.models.forEach((m: IGraphbackModel) => {
      const modelInputContext = createInputContext(m.schema, this.config);
      const gqlModule = moduleGenerator.generate(m.name, modelInputContext, database);
      backend.modules.push(gqlModule);
    });

    const moduleNames = backend.modules.map((m: IGraphbackModule) => m.name);

    backend.appModule = moduleGenerator.generateAppModule(moduleNames);

    return backend;
  }

  public async createClient(): Promise<Client> {
    const clientGenerator = new ClientGenerator(this.inputContext)

    return clientGenerator.generate()
  }


  public async createDatabase(): Promise<void> {
    const context = this.inputContext.filter((t: Type) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription');

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
  modules?: IGraphbackModule[]
  appModule?: IGraphbackModule
}

export interface IGraphbackResolvers {
  // Index file for resolvers stitching
  index?: string
  // Resolvers
  types?: OutputResolver[],
  // Custom resolvers stubs
  custom?: OutputResolver[]
}

export interface IGraphbackModule {
  name?: string
  index?: string
  schema?: string
  resolvers?: IGraphbackResolvers
}

export interface IGraphbackModel {
  name?: string
  schema?: string
}
