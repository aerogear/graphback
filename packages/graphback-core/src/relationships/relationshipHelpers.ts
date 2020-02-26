import { GraphQLField } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { RelationshipAnnotation } from './RelationshipMetadata';

/**
 * Parse relationship metadata string to strongly-typed interface
 * 
 * @param description field description
 */
export function parseRelationshipAnnotation(description: string = ''): RelationshipAnnotation | undefined {
    const relationshipKinds = ['oneToMany', 'oneToOne', 'manyToOne'];

    for (const kind of relationshipKinds) {
        const annotation: any = parseMarker(kind, description);

        if (!annotation) {
            continue;
        }

        if (!annotation.field) {
            throw new Error("'field' is required on relationship annotations");
        }

        return {
            kind,
            ...annotation
        }
    }

    return undefined;
}

/**
 * Creates an object of relationship fields if fields do not already exist on the model type.
 * 
 * @param model 
 */
export function buildGeneratedRelationshipsFieldObject(model: ModelDefinition) {
    const modelType = model.graphqlType;
    const modelFields = modelType.getFields();

    const fieldsObj = {};
    for (const current of model.relationships) {

        if (!modelFields[current.ownerField.name]) {
            fieldsObj[current.ownerField.name] = {
                type: current.ownerField.type,
                description: current.ownerField.description
            };
        }
    }

    return fieldsObj;
}

/**
 * Strips all relationship annotations from a string 
 * @param fieldDescription 
 */
export const stripRelationshipAnnotation = (fieldDescription: string = '') => {
    if (!fieldDescription.includes('\n')) {
        return fieldDescription;
    }

    const filteredDescription = fieldDescription.split('\n').filter((line: string) => !parseRelationshipAnnotation(line));

    return filteredDescription.slice(0, -1).join('\n');
}

/**
 * Creates an object of relationship fields which already exist on a model type.
 * 
 * @param model 
 */
export function buildModifiedRelationshipsFieldObject(model: ModelDefinition) {
    const modelType = model.graphqlType;
    const modelFields = modelType.getFields();

    const fieldsObj = {};
    for (const fieldRelationship of model.relationships) {

        if (modelFields[fieldRelationship.ownerField.name]) {
            const modelField = modelFields[fieldRelationship.ownerField.name];

            fieldsObj[fieldRelationship.ownerField.name] = {
                type: modelField.type,
                description: fieldRelationship.ownerField.description
            };
        }
    }

    return fieldsObj;
}

/**
 * Generic template for relationship annotations
 * 
 * @param relationshipKind 
 * @param fieldName 
 * @param columnKey 
 */
export const relationshipFieldDescriptionTemplate = (relationshipKind: 'oneToOne' | 'oneToMany' | 'manyToOne', fieldName: string, columnKey: string): string => {
    return `@${relationshipKind} field: '${fieldName}', key: '${columnKey}'`;
}