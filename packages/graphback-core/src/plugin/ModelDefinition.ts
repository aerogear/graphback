import { GraphQLObjectType, GraphQLField } from "graphql";
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { GraphbackCRUDGeneratorConfig } from "./GraphbackCRUDGeneratorConfig"

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
  primaryKey: string
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
