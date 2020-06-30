import { GraphQLNamedType, GraphQLScalarType } from 'graphql';
import { GraphbackJSON } from './scalars';

const graphbackScalarTypes: GraphQLScalarType[] = [GraphbackJSON]

/**
 * Checks if the type is on the the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackScalarType(type: GraphQLNamedType): boolean {
  return graphbackScalarTypes.some(({ name }: GraphQLScalarType) => type.name === name);
}
