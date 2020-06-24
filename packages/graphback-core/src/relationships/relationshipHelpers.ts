import { parseMetadata } from 'graphql-metadata';
import { GraphQLObjectType, getNamedType, GraphQLField } from 'graphql';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { getInputTypeName, GraphbackOperationType } from '../crud';
import { RelationshipAnnotation, FieldRelationshipMetadata } from './RelationshipMetadataBuilder';

/**
 * Parse relationship metadata string to strongly-typed interface
 *
 * @param description field description
 */
export function parseRelationshipAnnotation(description: string = ''): RelationshipAnnotation | undefined {
  const relationshipKinds = ['oneToMany', 'oneToOne', 'manyToOne'];

  for (const kind of relationshipKinds) {
    const annotation: any = parseMetadata(kind, description);

    if (!annotation) {
      continue;
    }

    // TODO: Should not throw error here
    if (!annotation.field && kind !== 'oneToOne') {
      throw new Error(`'field' is required on "${kind}" relationship annotations`);
    }

    return {
      kind,
      ...annotation
    }
  }

  return undefined;
}

/**
 * Helper to check if a field is a oneToMany
 * @param fieldName
 * @param relationships
 */
export function isOneToManyField(field: GraphQLField<any, any>): boolean {
  const oneToManyAnnotation: any = parseMetadata('oneToMany', field.description)

  return !!oneToManyAnnotation
}

/**
 * Strips all relationship annotations from a string
 * @param fieldDescription
 */
export const stripRelationshipAnnotation = (fieldDescription: string = '') => {
  if (!fieldDescription.includes('\n')) {
    return '';
  }

  const strippedDescription = fieldDescription.split('\n').filter((line: string) => !parseRelationshipAnnotation(line));

  return strippedDescription.join('\n');
}

/**
 * Strips all non-relationship annotations from a string
 *
 * @param fieldDescription
 */
export const getRelationshipAnnotationString = (fieldDescription: string = '') => {
  if (!fieldDescription.includes('\n') && !parseRelationshipAnnotation(fieldDescription)) {
    return '';
  }

  const filteredDescription = fieldDescription.split('\n').filter(parseRelationshipAnnotation);

  return filteredDescription.join('\n').trim();
}

/**
 * Helper to merge two description strings which may or may not have a relationship annotation.
 * This helper keeps non-relationship annotations and merges them together.
 * It chooses the relationship annotation with the `key` field when merging.
 *
 * @param generatedDescription
 * @param customDescription
 */
export const mergeDescriptionWithRelationshipAnnotation = (generatedDescription: string, customDescription: string) => {
  const descriptionLines = [stripRelationshipAnnotation(generatedDescription), stripRelationshipAnnotation(customDescription)];

  for (const description of [customDescription, generatedDescription]) {
    const relationshipDescription = getRelationshipAnnotationString(description);
    const parsedAnnotation = parseRelationshipAnnotation(description);

    if (parsedAnnotation && parsedAnnotation.key) {
      descriptionLines.push(relationshipDescription);
      break;
    }
  }

  return descriptionLines.join('\n').trim();
}

/**
 * Creates an object of relationship fields if fields do not already exist on the model type.
 *
 * @param model
 */
export function buildRelationshipFilterFieldMap(model: ModelDefinition) {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();

  const fieldsObj = {};

  for (const current of model.relationships) {
    if (modelFields[current.ownerField.name]) {
      const fieldNamedType = getNamedType(current.ownerField.type) as GraphQLObjectType

      if (current.kind !== 'oneToMany') {
        continue
      }

      fieldsObj[current.ownerField.name] = {
        type: current.ownerField.type,
        args: {
          filter: getInputTypeName(fieldNamedType.name, GraphbackOperationType.FIND)
        },
        description: current.ownerField.description,
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
  return `@${relationshipKind}(field: '${fieldName}', key: '${columnKey}')`;
}

/**
 * Template for one-to-one relationship annotations
 *
 * @param relationshipKind
 * @param fieldName
 * @param columnKey
 */
export const relationshipOneToOneFieldDescriptionTemplate = (relationshipKind: 'oneToOne' | 'oneToMany' | 'manyToOne', columnKey: string): string => {
  return `@${relationshipKind}(key: '${columnKey}')`;
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
