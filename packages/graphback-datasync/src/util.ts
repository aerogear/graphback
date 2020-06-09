import { ModelDefinition } from '@graphback/core';
import { parseMetadata } from 'graphql-metadata'

export function isDataSyncModel(model: ModelDefinition): boolean {
  return parseMetadata("delta", model.graphqlType) && parseMetadata("versioned", model.graphqlType)
}
