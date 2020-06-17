import { ModelDefinition, GraphbackCRUDService, GraphbackDataProvider } from '@graphback/core';
import { PubSubEngine } from 'graphql-subscriptions';
import { GraphbackMessageLogger } from '../utils/Logger';
import { CRUDServiceConfig, CRUDService } from './CRUDService';

export interface CreateCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub: PubSubEngine
  /**
   * Optional logger
   */
  logger?: GraphbackMessageLogger
}

/**
 *
 * @param config
 */
export function createCRUDService(config: CreateCRUDServiceOptions): (...args: any[]) => GraphbackCRUDService {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      ...config,
      crudOptions: model.crudOptions
    }

    return new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
  }
}
