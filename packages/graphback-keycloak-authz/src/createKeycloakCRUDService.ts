import { ModelDefinition } from '@graphback/core';
import { PubSubEngine, PubSub } from 'graphql-subscriptions';
import { GraphbackCRUDService, GraphbackDataProvider } from '@graphback/runtime'
import { KeycloakCrudServiceOptions, KeycloakCrudService } from './KeycloakCrudService';
import { CrudServiceAuthConfig } from './definitions';

export interface CreateKeycloakCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub: PubSubEngine
  /**
   * Auth config for entire data model
   */
  authConfig: CrudServiceAuthConfig
}

/**
 * Creates a new KeycloakCrudService
 *
 * @param config
 * @param {PubSub} pubSub - PubSub engine
 * @this {authConfig} authConfig - CRUD auth config for entire model
 */
export function createCRUDService(config: CreateKeycloakCRUDServiceOptions): Function {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: KeycloakCrudServiceOptions = {
      ...config,
      modelType: model.graphqlType,
      db: dataProvider,
      crudOptions: model.crudOptions
    }

    return new KeycloakCrudService(serviceConfig)
  }
}
