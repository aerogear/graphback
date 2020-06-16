import { GraphQLSchema } from 'graphql';
import { GraphbackPlugin, GraphbackPluginEngine, GraphbackCRUDGeneratorConfig, printSchemaWithDirectives, ModelDefinition } from '@graphback/core';
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';
import { mergeSchemas } from '@graphql-tools/merge';
import { GraphbackCRUDService, createCRUDService, GraphbackDataProvider, GraphbackServiceConfigMap, GraphbackContext } from '@graphback/runtime';
import { PubSub } from 'graphql-subscriptions';

export interface GraphbackAPIConfig {
  /**
   * Global CRUD configuration
   */
  crud?: GraphbackCRUDGeneratorConfig
  /**
   * Schema plugins to perform automatic changes to the schema
   */
  plugins?: GraphbackPlugin[]
  /**
   * Function which creates a default CRUD Service for every data model
   */
  serviceCreator?(...args: any[]): GraphbackCRUDService;
  /**
   * Function which creates a default data provicer for every data model
   */
  dataProviderCreator(...args: any): GraphbackDataProvider;
}

/**
 * Defines the individual components created in the Graphback API
 */
export interface GraphbackAPI {
  /**
   * GraphQL schema as a string
   */
  typeDefs: string
  /**
   * GraphQL schema object
   */
  schema: GraphQLSchema
  /**
   * CRUD resolvers for every data model
   */
  resolvers: any
  /**
   * Model:Service map of CRUD services for every data model
   */
  services: GraphbackServiceConfigMap

  /**
   * Creates context to be attached to the running server
   */
  contextCreator(context?: any): GraphbackContext
}

function createServices(models: ModelDefinition[], createService: Function, createProvider: Function) {
  const services: GraphbackServiceConfigMap = {}

  for (const model of models) {
    const modelType = model.graphqlType;
    const modelProvider = createProvider(model)
    const modelService = createService(model, modelProvider)
    services[modelType.name] = modelService
  }

  return services
}

/**
 * Creates all of the components needed for the GraphQL server - resolvers, schema and services.
 *
 * @param {GraphQLSchema|string} model - Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database
 * @param {GraphbackAPIConfig} config
 * @param {Function} [config.serviceCreator] - Creator class specifying which default CRUD service should be created for each model.
 * @param {Function} config.dataProviderCreator - Creator class specifying which default database provider should be created for each model.
 * @param {GraphbackCRUDGeneratorConfig} [config.crud] - Global CRUD configuration for the Graphback API.
 * @param {GraphbackPlugin[]} [config.plugins] - Schema plugins to perform automatic changes to the generated schema
 *
 * @returns {GraphbackAPI} Generated schema, CRUD resolvers and services
 */
export function buildGraphbackAPI(model: string | GraphQLSchema, config: GraphbackAPIConfig): GraphbackAPI {
  const schemaPlugins: GraphbackPlugin[] = [
    new SchemaCRUDPlugin,
    ...config.plugins || []
  ]

  const pluginEngine = new GraphbackPluginEngine({
    schema: model,
    plugins: schemaPlugins,
    config: { crudMethods: config.crud }
  })

  const metadata = pluginEngine.createResources()
  const models = metadata.getModelDefinitions()

  // Set a default ServiceCreator in the event the config does not have one
  const serviceCreator = config.serviceCreator || createCRUDService({ pubSub: new PubSub() })

  const services = createServices(models, serviceCreator, config.dataProviderCreator)
  const contextCreator = (context: any) => {
    return {
      ...context,
      graphback: services
    }
  }

  const resolvers = metadata.getResolvers()

  // merge resolvers into schema to make it executable
  const schema = mergeSchemas({ schemas: [metadata.getSchema()], resolvers })

  const typeDefs = printSchemaWithDirectives(schema)

  return {
    schema,
    typeDefs,
    resolvers,
    services,
    contextCreator
  }
}
