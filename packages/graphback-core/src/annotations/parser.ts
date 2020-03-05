import { FieldDefinitionNode, GraphQLField, GraphQLObjectType, TypeDefinitionNode } from 'graphql';
import { parseAnnotations, parseMarker } from "graphql-metadata";

export const parseDbAnnotations = (node: TypeDefinitionNode | FieldDefinitionNode | GraphQLObjectType | GraphQLField<any, any>): any => {
    return node.description ? parseAnnotations('db', String(node.description)) : {};
}

export const parseTypeAnnotations = (node: TypeDefinitionNode | FieldDefinitionNode | GraphQLObjectType | GraphQLField<any, any>): any => {
    return node.description ? parseAnnotations('crud', String(node.description)) : {};
}

export const parseRelationshipAnnotations = (node: GraphQLField<any, any>): { oneToMany: string | boolean, oneToOne: string | boolean; manyToOne: string | boolean } => {
    const maybeOneToMany: any = parseMarker('oneToMany', node.description);
    const maybeOneToOne: any = parseMarker('oneToOne', node.description);
    const maybeManyToOne: any = parseMarker('manyToOne', node.description);

    return {
        oneToMany: typeof maybeOneToMany === 'string' ?  maybeOneToMany : false,
        oneToOne: typeof maybeOneToOne === 'string' ? maybeOneToOne : false,
        manyToOne: typeof maybeManyToOne === 'string' ? maybeManyToOne : false
    }
}