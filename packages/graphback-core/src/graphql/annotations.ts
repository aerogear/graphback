import { FieldDefinitionNode, TypeDefinitionNode } from 'graphql';
import { parseAnnotations } from 'graphql-annotations';
import { InputModelFieldAnnotations } from '../api';

export const parseFieldAnnotations = (node: FieldDefinitionNode): InputModelFieldAnnotations => {
    const fieldAnnotations: InputModelFieldAnnotations = {};

    const dbAnnotations: any = node.description ? parseAnnotations('db', String(node.description)) : undefined;

    if (!dbAnnotations) {
        return fieldAnnotations;
    }

    if (dbAnnotations.oneToOne) {
        fieldAnnotations.OneToOne = {
            field: dbAnnotations.oneToOne
        }
    }
    if (dbAnnotations.oneToMany) {
        fieldAnnotations.OneToMany = {
            field: dbAnnotations.oneToMany
        }
    }
    if (dbAnnotations.manyToOne) {
        fieldAnnotations.ManyToOne = {
            field: dbAnnotations.manyToOne
        }
    }
    if (dbAnnotations.manyToMany) {
        fieldAnnotations.ManyToMany = {
            field: dbAnnotations.manyToMany
        }
    }

    return fieldAnnotations;
}


export const parseTypeAnnotations = (node: TypeDefinitionNode): InputModelFieldAnnotations => {

    return node.description ? parseAnnotations('crud', String(node.description)) : undefined;
}