import { GraphQLObjectType } from "graphql";
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { GraphbackCRUDGeneratorConfig } from "./GraphbackCRUDGeneratorConfig"

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
    graphqlType: GraphQLObjectType,
    relationships: FieldRelationshipMetadata[]
    crudOptions: GraphbackCRUDGeneratorConfig,
    config: {
        // Whether to add delta queries; requires datasync package
        deltaSync: boolean
    }
};
