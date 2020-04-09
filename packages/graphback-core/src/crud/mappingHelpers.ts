import { GraphQLObjectType, GraphQLField, isObjectType, getNullableType, getNamedType, GraphQLOutputType, isNonNullType, GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import * as pluralize from 'pluralize'
import { parseRelationshipAnnotation } from '../relationships/relationshipHelpers';
import { transformForeignKeyName, getPrimaryKey } from '../db';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder';
import { GraphbackOperationType } from './GraphbackOperationType';

//TODO is is esential to document this element

/**
 * Graphback CRUD Mapping helpers
 */

export function lowerCaseFirstChar(text: string) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

export function upperCaseFirstChar(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

/**
 * Get name of the field for query and mutation using our crud model.
 * Method trasform specific CRUD operation into compatible name
 *
 * Example:
 * ```
 * type Query {
 *   findAllNotes
 *   findBy()
 * }
 * ```
 * This method is compatible with Graphback CRUD specification
 *
 * @param typeName
 * @param action
 */
export const getFieldName = (typeName: string, action: GraphbackOperationType): string => {
  let finalName = upperCaseFirstChar(typeName);
  if (action === GraphbackOperationType.FIND_ALL || action === GraphbackOperationType.FIND) {
    finalName = pluralize(finalName);
  }

  return `${action}${finalName}`
}

export function getInputFieldName(field: GraphQLField<any, any>): string {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);

  if (!relationshipAnnotation) {
    return field.name;
  }

  if (relationshipAnnotation.kind === 'oneToMany') {
    throw new Error('Not inputtable field!');
  }

  return relationshipAnnotation.key || transformForeignKeyName(field.name);
}

/**
 * Provides naming patterns for CRUD subscriptions
 */
export const getSubscriptionName = (typeName: string, action: GraphbackOperationType, ): string => {
  const finalName = upperCaseFirstChar(typeName);
  if (action === GraphbackOperationType.CREATE) {
    return `new${finalName}`
  }

  if (action === GraphbackOperationType.UPDATE) {
    return `updated${finalName}`
  }

  if (action === GraphbackOperationType.DELETE) {
    return `deleted${finalName}`
  }

  return "";
}

export const inputDataVariableName = 'data';
export const inputFilterVariableName = 'filter';

/**
 * Provides naming pattern for InputType
 *
 * @param typeName
 */
export const getInputTypeName = (typeName: string): string => {
  return `${typeName}Data`;
}

/**
 * Provides naming pattern for InputType
 *
 * @param typeName
 */
export const getFilterInputTypeName = (typeName: string): string => {
  return `${typeName}Filter`;
}

export function isModelType(graphqlType: GraphQLObjectType): boolean {
  return !!parseMarker('model', graphqlType.description);
}

export function getUserModels(modelTypes: GraphQLObjectType[]): GraphQLObjectType[] {
  return modelTypes.filter(isModelType);
}

export function isInputField(field: GraphQLField<any, any>): boolean {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);

  return !relationshipAnnotation || relationshipAnnotation.kind !== 'oneToMany';
}

export function isPrimaryKey(field: GraphQLField<any, any>, modelType: GraphQLObjectType) {
  const primaryKey = getPrimaryKey(modelType)

  return primaryKey?.name === field.name;
}

//tslint:disable-next-line: no-reserved-keywords
export function getRelationFieldName(field: any, type: any) {
  let fieldName: string;
  if (field.annotations.OneToOne) {
    fieldName = field.annotations.OneToOne.field;
  }
  else if (field.annotations.ManyToOne) {
    fieldName = field.annotations.ManyToOne.field;
  }
  else if (field.annotations.OneToMany) {
    fieldName = field.annotations.OneToMany.field;
  }
  else {
    fieldName = type.name;
  }

  return fieldName;
}

export function getInputFieldOutputType(field: GraphQLField<any, any>, modelType?: GraphQLObjectType): GraphQLOutputType {
  if (modelType && isPrimaryKey(field, modelType)) {
    return getNamedType(field.type) as GraphQLOutputType;
  }

  let namedType = getNamedType(field.type);

  if (isObjectType(namedType) && isModelType(namedType)) {
    const idField = getPrimaryKey(namedType);
    namedType = getNamedType(idField.type);

    if (isNonNullType(field.type)) {
      return idField.type;
    }

    return namedType as GraphQLOutputType;
  }

  return field.type
}

export function getNonObjectFields(graphqlType: GraphQLObjectType) {
  const allFields = Object.values(graphqlType.getFields());

  return allFields.filter((field: GraphQLField<any, any>) => {
    const namedType = getNamedType(field.type);

    return !isObjectType(namedType)
  });
}

export function getModelFields({ graphqlType, relationships }: ModelDefinition): GraphQLField<any, any>[] {
  const modelFields = getNonObjectFields(graphqlType)

  const relationshipFields = relationships.map((relationship: FieldRelationshipMetadata) => relationship.ownerField);

  const allModelFields = [...modelFields, ...relationshipFields];

  return allModelFields;
}

export function mapInputFields(fields: GraphQLField<any, any>[], graphqlType?: GraphQLObjectType) {
  return fields.filter(isInputField).map((field: GraphQLField<any, any>) => ({
    name: getInputFieldName(field),
    type: getInputFieldOutputType(field, graphqlType),
    description: undefined
  }))
}
