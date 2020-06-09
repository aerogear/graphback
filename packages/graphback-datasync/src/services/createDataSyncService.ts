import { ModelDefinition } from '@graphback/core';
import { PubSubEngine } from 'graphql-subscriptions';
import { CRUDService, CRUDServiceConfig, GraphbackCRUDService } from '@graphback/runtime';
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
export function createDataSyncCRUDService(config: CreateDataSyncCRUDServiceOptions): (...args: any[]) => GraphbackCRUDService {
  return (model: ModelDefinition, dataProvider: DataSyncProvider): GraphbackCRUDService => {

    const serviceConfig: CRUDServiceConfig = {
      ...config,
      crudOptions: model.crudOptions
    }

    if (isDataSyncModel(model)) {
      return new DataSyncCRUDService(model.graphqlType.name, dataProvider, serviceConfig)
    } else {
      return new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
    }
  }
}
