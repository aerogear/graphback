import { GraphQLField } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import { RelationshipAnnotation } from './RelationshipMetadata';

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