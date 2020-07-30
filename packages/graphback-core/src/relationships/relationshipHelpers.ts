import { parseMetadata } from 'graphql-metadata';
import { GraphQLObjectType, getNamedType, GraphQLField } from 'graphql';
import { ObjMap, ObjectTypeComposerFieldConfigAsObjectDefinition, SchemaComposer, ObjectTypeComposer, ObjectTypeComposerFieldConfigMapDefinition } from 'graphql-compose';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { getInputTypeName, GraphbackOperationType } from '../crud';
import { RelationshipAnnotation } from './RelationshipMetadataBuilder';

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
 * Generate relationship fields inferred from metadata
 * and add to the model type
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export function addRelationshipFields(model: ModelDefinition, typeComposer: ObjectTypeComposer): void {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();

  const fieldsObj: ObjectTypeComposerFieldConfigMapDefinition<any, any> = {};
  for (const current of model.relationships) {

    if (!modelFields[current.ownerField.name]) {
      fieldsObj[current.ownerField.name] = {
        type: current.ownerField.type,
        description: current.ownerField.description
      };
    }
  }

  typeComposer.addFields(fieldsObj)
}

/**
 * Extends an existing relationship field by adding metadata such as annotations
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export function extendRelationshipFields(model: ModelDefinition, typeComposer: ObjectTypeComposer): void {
  const modelType = model.graphqlType;

  const modelFields = modelType.getFields();

  for (const fieldRelationship of model.relationships) {

    if (modelFields[fieldRelationship.ownerField.name]) {
      const modelField = modelFields[fieldRelationship.ownerField.name];

      const partialConfig: Partial<ObjectTypeComposerFieldConfigAsObjectDefinition<any, any>> = {
        type: modelField.type,
        description: fieldRelationship.ownerField.description
      }

      typeComposer.extendField(fieldRelationship.ownerField.name, partialConfig)
    }
  }
}

/**
 * Extend one-to-many field by adding filter arguments
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export function extendOneToManyFieldArguments(model: ModelDefinition, typeComposer: ObjectTypeComposer): void {
  const modelType = model.graphqlType;
  const modelFields = modelType.getFields();

  for (const current of model.relationships) {
    if (modelFields[current.ownerField.name]) {
      const fieldNamedType = getNamedType(current.ownerField.type) as GraphQLObjectType

      if (current.kind !== 'oneToMany') {
        continue
      }

      const partialConfig: Partial<ObjectTypeComposerFieldConfigAsObjectDefinition<any, any>> = {
        args: {
          filter: getInputTypeName(fieldNamedType.name, GraphbackOperationType.FIND)
        }
      };

      typeComposer.extendField(current.ownerField.name, partialConfig)
    }
  }
}
