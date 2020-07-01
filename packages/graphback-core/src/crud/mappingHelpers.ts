import { GraphQLObjectType, GraphQLSchema, GraphQLField, getNamedType, isObjectType, isScalarType, GraphQLInputType, isEnumType } from 'graphql';
import { parseMetadata } from 'graphql-metadata';
import * as pluralize from 'pluralize'
import { getUserTypesFromSchema } from '@graphql-toolkit/common';
import { SchemaComposer } from 'graphql-compose';
import { parseRelationshipAnnotation, transformForeignKeyName, getPrimaryKey } from '..';
import { GraphbackOperationType } from './GraphbackOperationType';

//TODO it is esential to document this element

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
 *   getUser()
 * }
 * ```
 * This method is compatible with Graphback CRUD specification
 *
 * @param typeName
 * @param action
 */
export const getFieldName = (typeName: string, action: GraphbackOperationType): string => {
  const finalName = upperCaseFirstChar(typeName);

  switch (action) {
    case GraphbackOperationType.FIND_ONE:
      return `get${finalName}`
    case GraphbackOperationType.FIND:
      return `find${pluralize(finalName)}`
    default:
      return `${action}${finalName}`
  }
}

/**
 * Returns the input type assocatiated with a CRUD operation
 * @param typeName
 * @param action
 */
export const getInputTypeName = (typeName: string, action: GraphbackOperationType): string => {
  const finalName = upperCaseFirstChar(typeName);
  switch (action) {
    case GraphbackOperationType.FIND:
      return `${finalName}Filter`
    case GraphbackOperationType.CREATE:
      return `Create${finalName}Input`
    case GraphbackOperationType.UPDATE:
    case GraphbackOperationType.DELETE:
      return `Mutate${finalName}Input`
    case GraphbackOperationType.SUBSCRIPTION_CREATE:
    case GraphbackOperationType.SUBSCRIPTION_UPDATE:
    case GraphbackOperationType.SUBSCRIPTION_DELETE:
      return `${finalName}SubscriptionFilter`
    default:
      return ''
  }
}

/**
 * Provides naming patterns for CRUD subscriptions
 */
export const getSubscriptionName = (typeName: string, action: GraphbackOperationType): string => {
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

export function isModelType(graphqlType: GraphQLObjectType): boolean {
  return !!parseMetadata('model', graphqlType.description);
}

/**
 * Get only user types annotated by ```@model```
 *
 * @param schema
 */
export function filterModelTypes(schema: GraphQLSchema): GraphQLObjectType[] {
  return getUserTypesFromSchema(schema).filter(isModelType)
}

/**
 * Get only user types not annotated by ```@model```
 *
 * @param schema
 */
export function filterNonModelTypes(schema: GraphQLSchema): GraphQLObjectType[] {
  return getUserTypesFromSchema(schema).filter((t: GraphQLObjectType) => !isModelType(t))
}

export function getUserModels(modelTypes: GraphQLObjectType[]): GraphQLObjectType[] {
  return modelTypes.filter(isModelType);
}

export function isInputField(field: GraphQLField<any, any>): boolean {
  const relationshipAnnotation = parseRelationshipAnnotation(field.description);

  return !relationshipAnnotation || relationshipAnnotation.kind !== 'oneToMany';
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

export function getInputFieldNamedType(schemaComposer: SchemaComposer<any>, field: GraphQLField<any, any>, operation: GraphbackOperationType): GraphQLInputType {
  const fieldType = getNamedType(field.type);

  if (isObjectType(fieldType) && isModelType(fieldType)) {
    const idField = getPrimaryKey(fieldType);

    return getNamedType(idField.type) as GraphQLInputType
  }

  if (isScalarType(fieldType) || isEnumType(fieldType)) {
    return fieldType
  }

  if (isObjectType(fieldType) && !isModelType(fieldType)) {
    // TODO: Filtering on JSON fields
    if (operation === GraphbackOperationType.FIND) {
      return undefined
      // return GraphQLJSON
    }

    const typeName = getInputTypeName(fieldType.name, operation)

    return schemaComposer.getITC(typeName).getType()
  }

  return undefined;
}
