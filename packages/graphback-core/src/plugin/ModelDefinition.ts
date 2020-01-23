import { GraphQLObjectType } from "graphql";
import {GraphbackCRUDGeneratorConfig} from "./GraphbackCRUDGeneratorConfig"

/**
 * Used to encapsulate configuration for the type
 */
export type ModelDefinition = {
    graphqlType: GraphQLObjectType,
    crudOptions: GraphbackCRUDGeneratorConfig
};
