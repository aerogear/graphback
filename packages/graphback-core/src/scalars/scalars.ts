import { GraphQLNamedType, GraphQLScalarType } from 'graphql';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-compose';

const graphbackScalarTypes: GraphQLScalarType[] = [GraphQLJSON, GraphQLJSONObject]

/**
 * Checks if the type is on the the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackScalarType(type: GraphQLNamedType): boolean {
  return graphbackScalarTypes.some(({ name }: GraphQLScalarType) => type.name === name);
}
