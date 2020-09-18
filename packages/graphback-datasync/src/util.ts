import { ModelDefinition, GraphbackCRUDService, GraphbackOperationType } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { GraphQLObjectType } from 'graphql';
import { DataSyncCRUDService } from "./services";

export function isDataSyncModel(model: ModelDefinition): boolean {
  return isDataSyncType(model.graphqlType);
}

export function isDataSyncType(graphqlType: GraphQLObjectType) {
  return !!(parseMetadata('datasync', graphqlType))
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
 * Interface for global configuration of conflicts
 */
export interface GlobalConflictConfig extends DataSyncModelConflictConfig {
  models?: DataSyncModelConfigMap
}

/**
 * Function to get conflict configuration of specific model from specified global configuration
 * @param {string} modelName Name of the model's GraphQL type
 * @param {GlobalConflictConfig} globalConfig Specified global config
 */
export function getModelConfigFromGlobal(modelName: string, globalConfig: GlobalConflictConfig = {}): DataSyncModelConflictConfig {
  const {models, ...defaultConfig} = {
    enabled: false,
    conflictResolution: ClientSideWins,
    deltaTTL: 172800,
    ...globalConfig
  }
  if (models) {
    return {
      ...defaultConfig,
      ...models[modelName]
    };
  } else {
    return defaultConfig;
  }
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


/**
 * Interface for specifying conflict configuration of a model
 */
export interface DataSyncModelConflictConfig {
  /**
   * Flag that enables conflict resolution
   */
  enabled?: boolean
  /**
   * One of the conflict resolutions strategies:
   * - ThrowOnConflict, 
   * - ClientSideWins, 
   * - ServerSideWins
   */
  conflictResolution?: ConflictResolutionStrategy
  /**
   * Value in seconds used to delete old history entries wth diffs that may no longer be needed.
   */
  deltaTTL?: number
}

/**
 * Interface for creating a map of modelName to conflict configuration
 */
export interface DataSyncModelConfigMap {
  [modelName: string]: DataSyncModelConflictConfig
}

/**
 * Interface for implementing conflict resolution strategies
 */
export interface ConflictResolutionStrategy {
  resolveUpdate(conflict: ConflictMetadata): any
  resolveDelete(conflict: ConflictMetadata): any
}

/**
 * The ServerSideWins conflict resolution strategy
 */
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

/**
 * The ClientSideWins conflict resolution strategy
 */
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

export const ThrowOnConflict: ConflictResolutionStrategy = {
  resolveUpdate(conflict: ConflictMetadata): any {
    throw new ConflictError(conflict);
  },
  resolveDelete(conflict: ConflictMetadata): any {
    throw new ConflictError(conflict);
  }
}
