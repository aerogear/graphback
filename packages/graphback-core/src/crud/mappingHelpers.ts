import { GraphQLObjectType } from 'graphql';
import { parseMarker } from 'graphql-metadata';
import * as pluralize from 'pluralize'
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

/**
 * Provides naming pattern for InputType
 * 
 * @param typeName 
 */
export const getInputTypeName = (typeName: string): string => {
  return `${typeName}Input`;
}

export function isModelType(graphqlType: GraphQLObjectType): boolean {
  return !!parseMarker('model', graphqlType.description);
}

export function getUserModels(modelTypes: GraphQLObjectType[]): GraphQLObjectType[] {
  return modelTypes.filter(isModelType);
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
