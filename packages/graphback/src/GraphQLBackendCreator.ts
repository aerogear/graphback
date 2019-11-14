import { ClientDocuments, createClient } from '@graphback/codegen-client';
import { ApolloServiceResolverGenerator} from "@graphback/codegen-resolvers"
import { SchemaGenerator, tsSchemaFormatter } from '@graphback/codegen-schema';
import { GraphbackGeneratorConfig, graphQLInputContext, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from '@graphback/core';
import { DatabaseManager, DatabaseContextProvider, DefaultDataContextProvider, SchemaProvider, DatabaseInitializationStrategy } from '@graphback/db-manage';
import { DefaultCRUDService, GraphbackDataProvider, LayeredRuntimeResolverGenerator, RuntimeResolversDefinition } from "@graphback/runtime"
import { PubSub } from 'graphql-subscriptions';
import { IGraphQLBackend } from '.';
import knex from 'knex';

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphQLBackendCreator {
  private dbContextProvider: DatabaseContextProvider;
  private inputContext: InputModelTypeContext[];

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(schemaContext: SchemaProvider, config: GraphbackGeneratorConfig) {
    this.inputContext = graphQLInputContext.createModelContext(schemaContext.getSchemaText(), config);
    this.dbContextProvider = new DefaultDataContextProvider();
  }

  /**
   * @param types - array of resolver operations that shoulI just said Ill keep an d be supported
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

    const resolverGenerator = new ApolloServiceResolverGenerator(this.inputContext);
    backend.resolvers = resolverGenerator.generate();

    return backend;
  }

  public async initializeDatabase(databaseStrategy: DatabaseInitializationStrategy): Promise<void> {
    await databaseStrategy.init(this.dbContextProvider, this.inputContext);
  }

  /**
   * Create runtime for backend in form of the schema string and resolve functions
   */
  public async createRuntime(db: GraphbackDataProvider, pubSub: PubSub): Promise<RuntimeResolversDefinition> {
    const backend: RuntimeResolversDefinition = {
      schema: "",
      resolvers: {}
    };

    const schemaGenerator = new SchemaGenerator(this.inputContext)
    backend.schema = schemaGenerator.generate()
    const defaultProvider = new CRUDService(db, pubSub);
    const resolverGenerator = new LayeredRuntimeResolverGenerator(this.inputContext, defaultProvider)
    backend.resolvers = resolverGenerator.generate()

    return backend;
  }

  public async createClient(): Promise<ClientDocuments> {
    return createClient(this.inputContext);
  }
}
