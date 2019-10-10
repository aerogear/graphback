import { Client, ClientGenerator } from './generators/client';
import { LegacyResolverGenerator, LayeredRuntimeResolverGenerator } from './generators/resolvers';
import { SchemaGenerator, tsSchemaFormatter } from './generators/schema';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { IGraphQLBackend } from './IGraphQLBackend'
import { createInputContext } from './input/ContextCreator';
import { OBJECT_TYPE_DEFINITION, Type } from './input/ContextTypes';
import { GraphbackDataProvider } from './layers/data/GraphbackDataProvider';
import { DefaultsCRUDService } from './layers/service/DefaultCRUDService';
import {
  DatabaseContextProvider,
  DefaultDataContextProvider,
} from './migrations/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './migrations/DataResourcesManager';
import { logger } from './utils/logger';
import { buildSchemaText } from './utils';
import { ISchemaProvider } from './migrations/schema/ISchemaProvider';
import { Change, diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import { DatabaseInitializationStrategy } from './migrations';

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
// TODO split generator into plugin based architecture without datamigration
// Datamigration should be the component on it's own
// TODO rename to backend
export class GraphQLBackendCreator {
  private dataLayerManager: IDataLayerResourcesManager;
  private dbContextProvider: DatabaseContextProvider;
  private schemaContext: ISchemaProvider;
  private inputContext: Type[];
  private newSchema: string;
  private oldSchema: string;

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(schemaContext: ISchemaProvider, config: GraphQLGeneratorConfig) {
    this.schemaContext = schemaContext;
    this.oldSchema = schemaContext.getOldSchemaText();
    this.newSchema = schemaContext.getNewSchemaText();
    this.inputContext = createInputContext(schemaContext.getNewSchemaText(), config);
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

  public setSchemaContext(provider: ISchemaProvider) {
    this.schemaContext = provider;
  }

  /**
   * Create backend with all related resources
   */
  public async createBackend(database: string): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {};

    const schemaGenerator = new SchemaGenerator(this.inputContext, tsSchemaFormatter)
    backend.schema = schemaGenerator.generate()

    const resolverGenerator = new LegacyResolverGenerator(this.inputContext);
    backend.resolvers = resolverGenerator.generate(database);

    return backend;
  }

  /**
   * Create runtime for backend in form of the schema string and resolve functions
   */
  // tslint:disable-next-line: no-any
  public async createRuntime(db: GraphbackDataProvider): Promise<any> {
    // TODO interface
    const backend = {
      schema: '',
      resolvers: {},
    };

    const schemaGenerator = new SchemaGenerator(this.inputContext);
    backend.schema = schemaGenerator.generate();
    const defaultProvider = new DefaultsCRUDService(db);
    const resolverGenerator = new LayeredRuntimeResolverGenerator(this.inputContext, defaultProvider)
    backend.resolvers = resolverGenerator.generate()

    return backend;
  }

  public async createClient(): Promise<Client> {
    const clientGenerator = new ClientGenerator(this.inputContext);

    return clientGenerator.generate();
  }

  public async migrateDatabase(
    initializationStrategy: DatabaseInitializationStrategy
  ): Promise<void> {
    const context = this.inputContext.filter(
      (t: Type) =>
        t.kind === OBJECT_TYPE_DEFINITION &&
        t.name !== 'Query' &&
        t.name !== 'Mutation' &&
        t.name !== 'Subscription',
    );

    const changes = await this.getSchemaChanges(
      this.oldSchema,
      this.newSchema,
    );

    if (!this.oldSchema || changes.length > 0) {
      this.schemaContext.updateOldSchema(this.newSchema);
    }

    try {
      if (this.dataLayerManager) {
        if (initializationStrategy === DatabaseInitializationStrategy.DropCreate || !this.oldSchema) {
          logger.info('Creating database structure');
          await this.dataLayerManager.createDatabaseResources(
            this.dbContextProvider,
            context,
          );
          await this.dataLayerManager.createDatabaseRelations(
            this.dbContextProvider,
            context,
          );
        } else {
          logger.info('Updating existing database');
          await this.dataLayerManager.updateDatabaseResources(this.dbContextProvider, context, changes)
        }
      } else {
        logger.info('Database structure generation skipped.');
      }
    } catch (error) {
      // logger.error(`Error on Database creation ${error}`)
      throw error;
    }
  }

  private getSchemaChanges(
    oldSchemaText: string,
    newSchemaText: string,
  ): Promise<Change[]> {
    let changes: Change[] = [];

    if (!oldSchemaText || !oldSchemaText.length) {
      return Promise.resolve(changes);
    }

    const oldSchema = buildSchema(oldSchemaText);
    const newSchema = buildSchema(newSchemaText);

    if (oldSchema && newSchema) {
      changes = diff(oldSchema, newSchema);
    }

    return Promise.resolve(changes);
  }
}
