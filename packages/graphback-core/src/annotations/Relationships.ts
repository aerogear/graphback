import { FieldDefinitionNode, TypeDefinitionNode } from 'graphql';
import { parseAnnotations } from 'graphql-metadata';

export const parseFieldAnnotations = (node: FieldDefinitionNode) => {
    const fieldAnnotations: any = {};

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

    return fieldAnnotations;
}

