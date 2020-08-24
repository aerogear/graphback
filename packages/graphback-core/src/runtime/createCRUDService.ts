import { PubSubEngine, PubSub } from 'graphql-subscriptions';
import { ModelDefinition } from '..';
import { CRUDServiceConfig, CRUDService } from './CRUDService';
import { GraphbackDataProvider, GraphbackCRUDService, ServiceCreator } from '.';

export interface CreateCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine
}

export function createCRUDService(config?: CreateCRUDServiceOptions): ServiceCreator {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      pubSub: new PubSub(),
      ...config,
      crudOptions: model.crudOptions
    }

    return new CRUDService(model, dataProvider, serviceConfig)
  }
}
