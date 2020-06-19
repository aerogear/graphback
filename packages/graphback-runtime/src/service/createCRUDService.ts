import { ModelDefinition, GraphbackCRUDService, GraphbackDataProvider } from '@graphback/core';
import { PubSubEngine, PubSub } from 'graphql-subscriptions';
import { CRUDServiceConfig, CRUDService } from './CRUDService';

export interface CreateCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine
}

/**
 * Creates a CRUDService for every data model
 *
 * @param {PubSubEngine} [config.pubSub] - Pub usb mechanism to use
 * @param {CreateCRUDServiceOptions} [config.logger] - Optional custom logger
 */
export function createCRUDService(config?: CreateCRUDServiceOptions): (...args: any[]) => GraphbackCRUDService {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      pubSub: new PubSub(),
      ...config,
      crudOptions: model.crudOptions
    }

    return new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
  }
}
