import { PubSub } from 'graphql-subscriptions';
import { DatabaseInitializationStrategy } from './database/initialization/DatabaseInitializationStrategy';
import { DatabaseContextProvider, DefaultDataContextProvider } from './database/migrations/DatabaseContextProvider';
import { IDataLayerResourcesManager } from './database/migrations/DataResourcesManager';
import { GraphQLSchemaManager } from './database/migrations/schema/GraphQLSchemaManager';
import { SchemaProvider } from './database/migrations/schema/SchemaProvider';
import { Client, ClientGenerator } from './generators/client';
import { LayeredRuntimeResolverGenerator, LegacyResolverGenerator } from './generators/resolvers';
import { RuntimeResolversDefinition } from './generators/resolvers/layered/RuntimeResolversDefinition';
import { SchemaGenerator, tsSchemaFormatter } from './generators/schema';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { IGraphQLBackend } from './IGraphQLBackend'
import { createInputContext } from './input/ContextCreator';
import { InputModelTypeContext, OBJECT_TYPE_DEFINITION } from './input/ContextTypes';
import { GraphbackDataProvider } from './layers/data/GraphbackDataProvider';
import { DefaultCRUDService } from './layers/service/DefaultCRUDService';

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {
  private dbContextProvider: DatabaseContextProvider;
  private graphQLSchemaManager: GraphQLSchemaManager;
  private inputContext: InputModelTypeContext[];

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(schemaContext: SchemaProvider, config: GraphQLGeneratorConfig) {
    this.graphQLSchemaManager = new GraphQLSchemaManager({ provider: schemaContext });
    this.inputContext = createInputContext(schemaContext.getCurrentSchemaText(), config);
    this.dbContextProvider = new DefaultDataContextProvider();
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

    const schemaGenerator = new SchemaGenerator(this.inputContext, tsSchemaFormatter)
    backend.schema = schemaGenerator.generate()

    const resolverGenerator = new LegacyResolverGenerator(this.inputContext);
    backend.resolvers = resolverGenerator.generate(database);

    return backend;
  }

  public async initializeDatabase(strategy: DatabaseInitializationStrategy) {
    const typeContext = this.inputContext.filter(
      (t: InputModelTypeContext) =>
        t.kind === OBJECT_TYPE_DEFINITION &&
        t.name !== 'Query' &&
        t.name !== 'Mutation' &&
        t.name !== 'Subscription',
    );

    const schemaChanges = this.graphQLSchemaManager.getChanges();

    await strategy.init(this.dbContextProvider, typeContext, schemaChanges);

    this.graphQLSchemaManager.updateOldSchema();
  }

  /**
   * Create runtime for backend in form of the schema string and resolve functions
   */
  public async createRuntime(db: GraphbackDataProvider, pubSub: PubSub, dbStrategy: DatabaseInitializationStrategy): Promise<RuntimeResolversDefinition> {
    const backend: RuntimeResolversDefinition = {
      schema: "",
      resolvers: {}
    };

    await this.initializeDatabase(dbStrategy);

    const schemaGenerator = new SchemaGenerator(this.inputContext)
    backend.schema = schemaGenerator.generate()
    const defaultProvider = new DefaultCRUDService(db, pubSub);
    const resolverGenerator = new LayeredRuntimeResolverGenerator(this.inputContext, defaultProvider)
    backend.resolvers = resolverGenerator.generate()

    return backend;
  }

  public async createClient(): Promise<Client> {
    const clientGenerator = new ClientGenerator(this.inputContext);

    return clientGenerator.generate();
  }
}
