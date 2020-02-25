import { GraphQLObjectType } from "graphql";
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadata';
import { GraphbackCRUDGeneratorConfig } from "./GraphbackCRUDGeneratorConfig"

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
    graphqlType: GraphQLObjectType,
    relationships: FieldRelationshipMetadata[]
    crudOptions: GraphbackCRUDGeneratorConfig
};
