import { GraphQLObjectType } from "graphql";
import { GraphbackCRUDGeneratorConfig } from "./GraphbackCRUDGeneratorConfig"
import { RelationshipMetadata } from './ModelRelationshipMetadata';

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
    graphqlType: GraphQLObjectType,
    relationships: RelationshipMetadata[]
    crudOptions: GraphbackCRUDGeneratorConfig
};
