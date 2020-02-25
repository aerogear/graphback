import { GraphQLField } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import { RelationshipAnnotation, FieldRelationshipMetadata } from './RelationshipMetadata';

export function parseRelationshipAnnotation(field: GraphQLField<any, any>): RelationshipAnnotation | undefined {
    const relationshipKinds = ['oneToMany', 'oneToOne', 'manyToOne'];

    for (const kind of relationshipKinds) {
        const annotation: any = parseMarker(kind, field.description);

        if (!annotation) {
            continue;
        }

        if (!annotation.field) {
            throw new Error("Field is required on annotation");
        }

        const relationshipAnnotation: RelationshipAnnotation = {
            kind,
            ...annotation
        }

        return relationshipAnnotation;
    }

    return undefined;
}

export function buildRelationshipsFieldObject(fieldRelationships: FieldRelationshipMetadata[] = []): any {
    return fieldRelationships.reduce((fieldsObj: any, current: FieldRelationshipMetadata) => {
        fieldsObj[current.ownerField.name] = {
            type: current.ownerField.type,
            description: current.ownerField.description
        };

        return fieldsObj;
    }, {});
}

export const relationshipFieldDescriptionTemplate = (relationshipKind: 'oneToOne' | 'oneToMany' | 'manyToOne', fieldName: string, columnKey: string): string => {
    return `@${relationshipKind} field: '${fieldName}', key: '${columnKey}'`;
}

export const isRelationshipField = (field: GraphQLField<any, any>): boolean => {
    const relationshipAnnotation = parseRelationshipAnnotation(field);

    return !!relationshipAnnotation;
}