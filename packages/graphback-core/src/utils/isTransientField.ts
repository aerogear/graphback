import { GraphQLField } from 'graphql';
import { parseMetadata } from 'graphql-metadata';

/**
 *  Return true if the GraphQL field has a @transient annotation
 * 
 * @param {GraphQLField} field 
 */
export function isTransientField(field: GraphQLField<any, any>): boolean {
  return parseMetadata('transient', field);
}