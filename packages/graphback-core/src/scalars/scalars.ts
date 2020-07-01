import { GraphQLNamedType, GraphQLScalarType } from 'graphql';
import { JSONResolver, JSONObjectResolver } from 'graphql-scalars';

/**
 * GraphbackJSON scalar
 *
 * Wraps Urigo/graphql-scalars JSON
 */
export const GraphbackJSON = new GraphQLScalarType({
  ...JSONResolver.toConfig(),
  name: 'GraphbackJSON'
  // TODO: Custom description
})

/**
 * GraphbackJSONObject scalar
 *
 * Wraps Urigo/graphql-scalars JSONObject
 */
export const GraphbackJSONObject = new GraphQLScalarType({
  ...JSONObjectResolver.toConfig(),
  name: 'GraphbackJSONObject'
  // TODO: Custom description
})

const graphbackScalarTypes: GraphQLScalarType[] = [GraphbackJSON, GraphbackJSONObject]

/**
 * Checks if the type is on the the default Graphback supported scalars
 *
 * @param type - any type
 */
export function isSpecifiedGraphbackScalarType(type: GraphQLNamedType): boolean {
  return graphbackScalarTypes.some(({ name }: GraphQLScalarType) => type.name === name);
}
