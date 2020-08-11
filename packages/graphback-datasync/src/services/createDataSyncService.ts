import { ModelDefinition, CRUDService, CRUDServiceConfig, GraphbackCRUDService, GraphbackDataProvider } from '@graphback/core';
import { PubSubEngine, PubSub } from 'graphql-subscriptions';
import { isDataSyncModel } from '../util';
import { DataSyncProvider } from '../providers';
import { DataSyncCRUDService } from './DataSyncCRUDService';

export interface CreateDataSyncCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub: PubSubEngine
}

/**
 *
 * @param config
 */
export function createDataSyncCRUDService(config?: CreateDataSyncCRUDServiceOptions) {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {

    const serviceConfig: CRUDServiceConfig = {
      pubSub: new PubSub(),
      ...config,
      crudOptions: model.crudOptions
    }

    if (isDataSyncModel(model)) {
      return new DataSyncCRUDService(model.graphqlType.name, dataProvider as DataSyncProvider, serviceConfig)
    } else {
      return new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
    }
  }
}
