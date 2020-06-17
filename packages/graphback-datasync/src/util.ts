import { ModelDefinition, GraphbackCRUDService } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata';
import { DataSyncCRUDService } from "./services";

export function isDataSyncModel(model: ModelDefinition): boolean {
  return parseMetadata("delta", model.graphqlType) && parseMetadata("versioned", model.graphqlType)
}

export function getDataSyncService(service: GraphbackCRUDService): DataSyncCRUDService {
  if (service instanceof DataSyncCRUDService) {
    return service;
  }

  throw Error("Service is not a DataSyncCRUDService. Please use DataSyncCRUDService and DataSync-compliant DataProvider with DataSync Plugin to get Delta Queries.")
}
