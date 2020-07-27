import { createHash } from 'crypto'
import { ModelDefinition, GraphbackCRUDService } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { ObjectId } from 'mongodb';
import { GraphQLScalarType, GraphQLInt, GraphQLString } from 'graphql';
import { DataSyncMongoDBDataProvider, DeltaMongoDBDataProvider, DataSyncProvider } from "./providers";
import { DataSyncCRUDService } from "./services";
import { parse } from 'path';

export function isDataSyncModel(model: ModelDefinition): boolean {
  // (Both delta and versioned) or (just datasync)
  return (
    (parseMetadata("delta", model.graphqlType) && parseMetadata("versioned", model.graphqlType))
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

export interface ConflictEngine {
  readonly conflictFieldName: string

  next(prev?: string, updateSets?: any): any

  resolveConflicts?(serverData: any, clientData: any): ConflictStateMap | undefined
}

/**
 * v
 */
export const VersionConflictEngine: ConflictEngine = {
  conflictFieldName: "_version",

  next(prev?: string) {
    const prevState = parseInt(prev, 10);
    if (!isNaN(prevState)) {
      return `${prevState + 1}`;
    }

    return "1";
  }
}

export const HashConflictEngine: ConflictEngine = {
  conflictFieldName: "_rev",

  next(prev?: string, updateSets?: any) {
    const hash = createHash('sha256')
    hash.update(Date.now().toString());
    if (prev !== undefined) {
      hash.update(prev.toString());
    }

    if (updateSets !== undefined) {
      hash.update(JSON.stringify(updateSets))
    }

    return hash.digest('hex');
  }
}
