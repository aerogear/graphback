import { CRUDService, CRUDServiceConfig, ModelDefinition, getSelectedFieldsFromResolverInfo } from '@graphback/core';
import { GraphQLResolveInfo } from 'graphql';
import { DataSyncProvider } from "../providers";
import { DataSyncFieldNames } from '../util';

export interface SyncList<T> {
  items: T[],
  lastSync: Date,
  limit: number
}

/**
 * CRUD Service for datasync
 */
export class DataSyncCRUDService<T = any> extends CRUDService<T> {

  public constructor(model: ModelDefinition, db: DataSyncProvider, config: CRUDServiceConfig) {
    super(model, db, config);
  }
  /**
   * sync
   * For delta queries
   */
  public async sync(lastSync: Date, info?: GraphQLResolveInfo, filter?: any, limit?: number): Promise<SyncList<T>> {
    let selectedFields: string[];
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model, 'items');
      selectedFields.push(DataSyncFieldNames.deleted);
    }
    const res = await (this.db as DataSyncProvider).sync(lastSync, selectedFields, filter, limit);

    return {
      items: res,
      lastSync: new Date(),
      limit
    }
  }
}
