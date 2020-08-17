import { ModelDefinition, GraphbackCRUDService, GraphbackOperationType } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { DataSyncCRUDService } from "./services";

export function isDataSyncModel(model: ModelDefinition): boolean {
  return !!(parseMetadata('datasync', model.graphqlType))
}

export function getDataSyncAnnotationData(model: ModelDefinition): any {
  return parseMetadata('datasync', model.graphqlType);
}

export function isDataSyncService(service: GraphbackCRUDService): DataSyncCRUDService {
  if (service instanceof DataSyncCRUDService) {
    return service;
  }

  return undefined;
}

/**
 * Interface for holding the conflicting states
 * between server and client
 */
export interface ConflictMetadata {
  base: any;
  serverData: any;
  serverDiff: any;
  clientData: any;
  clientDiff: any;
  operation: GraphbackOperationType;
}


/**
 * Error that signifies conflict between server-side and client-side data
 */
export class ConflictError extends Error {
  public conflictInfo: ConflictMetadata;
  public constructor(stateMap: ConflictMetadata) {
    super();
    this.conflictInfo = stateMap;
  }
}

export const DataSyncFieldNames = {
  version: '_version',
  lastUpdatedAt: '_lastUpdatedAt',
  deleted: '_deleted',
  ttl:"_ttl"
}



export interface DataSyncModelConflictConfig {
  enabled: boolean
  conflictResolution?: ConflictResolutionStrategy
  deltaTTL: number
}

export interface DataSyncModelConfigMap {
  [modelName: string]: DataSyncModelConflictConfig
}

export interface ConflictResolutionStrategy {
  resolveUpdate(conflict: ConflictMetadata): any
  resolveDelete(conflict: ConflictMetadata): any
}

export const ServerSideWins: ConflictResolutionStrategy = {
  resolveUpdate(conflict: ConflictMetadata): any {
    const { serverData, serverDiff, clientDiff, base } = conflict;

    if (!base || !serverData || serverData[DataSyncFieldNames.deleted] === true) {
      throw new ConflictError(conflict);
    }

    const resolved = Object.assign(serverData, clientDiff, serverDiff);

    return resolved
  },
  resolveDelete(conflict: ConflictMetadata): any {

    throw new ConflictError(conflict);
  }
}

export const ClientSideWins: ConflictResolutionStrategy = {
  resolveUpdate(conflict: ConflictMetadata): any {
    const { serverData, clientDiff } = conflict

    const resolved = Object.assign(serverData, clientDiff);

    if (serverData[DataSyncFieldNames.deleted] === true) {
      resolved[DataSyncFieldNames.deleted] = false;
    }

    return resolved;
  },
  resolveDelete(conflict: ConflictMetadata): any {
    const { serverData, clientData } = conflict;

    if (serverData[DataSyncFieldNames.deleted] === true) {
      throw new ConflictError(conflict);
    }

    const resolved = Object.assign({}, serverData, { [DataSyncFieldNames.deleted]: true });

    return resolved
  }
}

