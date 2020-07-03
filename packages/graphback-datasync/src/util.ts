import { ModelDefinition, GraphbackCRUDService } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { DataSyncCRUDService } from "./services";

export function isDataSyncModel(model: ModelDefinition): any {
  // (Both delta and versioned) or (just datasync)
  return (
    (parseMetadata("versioned", model.graphqlType) && parseMetadata("delta", model.graphqlType))
    ||
    (parseMetadata('datasync', model.graphqlType))
  )
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
export interface ConflictStateMap {
  serverState: any,
  clientState: any
}

/**
 * Error that signifies conflict between server-side and client-side data
 */
export class ConflictError extends Error {
  public conflictInfo: ConflictStateMap;
  public constructor(stateMap: ConflictStateMap) {
    super();
    this.conflictInfo = stateMap;
  }
}
