import { GraphQLObjectType } from "graphql";
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { GraphbackCRUDGeneratorConfig } from "./GraphbackCRUDGeneratorConfig"

/**
 * Describe the name and type of primary key
 */
export type PrimaryKeyDescriptor = {
  name: string,
  type: string
}

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
  primaryKey: PrimaryKeyDescriptor,
  graphqlType: GraphQLObjectType,
  relationships: FieldRelationshipMetadata[]
  crudOptions: GraphbackCRUDGeneratorConfig,
  config: {
    // Whether to add delta queries; requires datasync package
    deltaSync: boolean
  }
};

export function getModelByName(name: string, models: ModelDefinition[]): ModelDefinition | undefined {
  if (!models) {
    return undefined
  }

  return models.find((m: ModelDefinition) => m.graphqlType.name === name)
}
