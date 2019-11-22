import { ClientDocuments, createClient } from '@graphback/codegen-client';
import { createResolvers, ResolverGeneratorOptions } from "@graphback/codegen-resolvers"
import { SchemaGenerator, tsSchemaFormatter } from '@graphback/codegen-schema';
import { GraphbackCRUDGeneratorConfig, graphQLInputContext, InputModelTypeContext } from '@graphback/core';
import { CRUDService, GraphbackDataProvider, LayeredRuntimeResolverGenerator, RuntimeResolversDefinition } from "@graphback/runtime"
import { PubSub } from 'graphql-subscriptions';
import { IGraphQLBackend } from '.';

/**
 * GraphQLBackend
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 * 
 * @deprecated Please use individual packages and generators 
 */
export class GraphQLBackendCreator {
  private inputContext: InputModelTypeContext[];

  /**
   * @param graphQLSchema string containing graphql types
   * @param config configuration for backend generator
   */
  constructor(schemaText: string, config: GraphbackCRUDGeneratorConfig) {
    this.inputContext = graphQLInputContext.createModelContext(schemaText, config);
  }

  /**
   * Create backend with all related resources
   */
  public async createBackend(resolverOptions?: ResolverGeneratorOptions): Promise<IGraphQLBackend> {
    const backend: IGraphQLBackend = {};
    // FIXME - this is for testing only
    // tslint:disable-next-line: no-parameter-reassignment
    resolverOptions = {
      format: 'ts',
      types: {
        typesImportStatement: 'import { Resolvers } from "../../generated-types"',
        resolverType: 'Resolvers',
      }
    };
    const schemaGenerator = new SchemaGenerator(this.inputContext, tsSchemaFormatter)
    backend.schema = schemaGenerator.generate()

    backend.resolvers = createResolvers(this.inputContext, resolverOptions);

    return backend;
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
