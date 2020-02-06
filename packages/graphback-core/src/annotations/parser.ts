import { FieldDefinitionNode, GraphQLField, GraphQLObjectType, TypeDefinitionNode } from 'graphql';
import { parseAnnotations } from "graphql-metadata";

export const parseDbAnnotations = (node: TypeDefinitionNode | FieldDefinitionNode | GraphQLObjectType | GraphQLField<any, any>): any => {
    return node.description ? parseAnnotations('db', String(node.description)) : {};
}

export const parseTypeAnnotations = (node: TypeDefinitionNode | FieldDefinitionNode | GraphQLObjectType | GraphQLField<any, any>): any => {
    return node.description ? parseAnnotations('crud', String(node.description)) : {};
}