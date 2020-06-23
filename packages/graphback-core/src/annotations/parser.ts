import { FieldDefinitionNode, GraphQLField, GraphQLObjectType, TypeDefinitionNode } from 'graphql';
import { parseMetadata } from "graphql-metadata";

export const parseDbAnnotations = (node: TypeDefinitionNode | FieldDefinitionNode | GraphQLObjectType | GraphQLField<any, any>): any => {
  return parseMetadata('db', String(node.description))
}
