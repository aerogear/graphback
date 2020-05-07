import { GraphQLObjectType, GraphQLField, GraphQLNamedType, isObjectType, getNullableType, getNamedType, GraphQLSchema, BREAK } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import * as pluralize from 'pluralize'
import { getUserTypesFromSchema } from '@graphql-toolkit/common';
import { parseRelationshipAnnotation } from '../relationships/relationshipHelpers';
import { transformForeignKeyName, getPrimaryKey } from '../db';
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
  const finalName = upperCaseFirstChar(typeName);

  switch (action) {
    case GraphbackOperationType.FIND_ONE:
      return `get${typeName}`
    case GraphbackOperationType.FIND:
      return `find${pluralize(finalName)}`
    case GraphbackOperationType.FIND_ALL:
      return `findAll${pluralize(finalName)}`
    default:
      return `${action}${finalName}`
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

/**
 * Provides naming pattern for InputType
 *
 * @param typeName
 * @deprecated
 * @todo remove usages of this
 */
export const getInputTypeName = (typeName: string): string => {
  return `${typeName}Input`;
}

export function isModelType(graphqlType: GraphQLObjectType): boolean {
  return !!parseMarker('model', graphqlType.description);
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
