import { GraphbackPubSubModel, GraphbackDataProvider, CRUDService } from '@graphback/runtime'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { PubSubEngine } from 'apollo-server-express'
import { CrudServicesAuthConfig } from './definitions'
import { KeycloakCrudService } from './KeycloakCrudService'

export interface KeycloakRuntimeContextOptions<Provider extends GraphbackDataProvider, Service extends CRUDService> {
  models: GraphbackPubSubModel[]
  db: any
  schema: GraphQLSchema
  pubSub: PubSubEngine
  authConfig: CrudServicesAuthConfig
  dataProvider: new (...args: any[]) => Provider
  crudService?: new (...args: any[]) => Service
}

/**
 * Helper function for creating mongodb runtime context used in Graphback
 * 
 * @param schema 
 * @param db 
 * @param pubSub 
 */
export function createKeycloakRuntimeContext<Provider extends GraphbackDataProvider, Service extends CRUDService>
  ({ models, db, schema, pubSub, dataProvider, crudService, authConfig }: KeycloakRuntimeContextOptions<Provider, Service>) {
  if (!models || models.length === 0) {
      throw new Error(`No models provided`)
  }

  return models.reduce((services: any, model: GraphbackPubSubModel) => {
      const modelType = schema.getType(model.name) as GraphQLObjectType
      if (modelType === undefined) {
          throw new Error(`
      Schema is missing provided type. 
      Please make sure that you pass the right schema to createCRUDRuntimeContext`)
      }

      const objectDB = new dataProvider(modelType, db)

      // default to the KeycloakCrudService class but allow user to provide their own class
      // useful in cases where they extend the class.
      // example: datasync-starter extends the CrudService class to change some pubsub behaviour
      const service = crudService || KeycloakCrudService

      services[model.name] = new service({
          modelType,
          db: objectDB,
          subscriptionConfig: {
              pubSub,
              ...model.pubSub
          },
          authConfig: authConfig[model.name]
      })

      return services;
  }, {})

}