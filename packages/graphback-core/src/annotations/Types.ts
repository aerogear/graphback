import { TypeDefinitionNode } from 'graphql';
import { parseAnnotations } from 'graphql-metadata';

export const parseTypeAnnotations = (node: TypeDefinitionNode) => {

    return node.description ? parseAnnotations('crud', String(node.description)) : undefined;
}
