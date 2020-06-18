import { ModelDefinition, GraphbackCRUDService } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { DataSyncCRUDService } from "./services";

export function isDataSyncModel(model: ModelDefinition): boolean {
  return parseMetadata("delta", model.graphqlType) && parseMetadata("versioned", model.graphqlType)
}

export function isDataSyncService(service: GraphbackCRUDService): DataSyncCRUDService {
  if (service instanceof DataSyncCRUDService) {
    return service;
  }

  return undefined;
}
