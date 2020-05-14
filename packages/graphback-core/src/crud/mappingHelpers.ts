import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import * as pluralize from 'pluralize'
import { getUserTypesFromSchema } from '@graphql-toolkit/common';
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
      return `get${typeName}`
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
  switch (action) {
    case GraphbackOperationType.FIND:
      return `${typeName}FilterInput`
    case GraphbackOperationType.CREATE:
      return `Create${typeName}Input`
    case GraphbackOperationType.UPDATE:
      return `Update${typeName}Input`
    case GraphbackOperationType.DELETE:
      return `Delete${typeName}Input`
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
