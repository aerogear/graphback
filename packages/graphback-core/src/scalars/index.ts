import { ObjectID } from "bson";
import { GraphQLNamedType, GraphQLScalarType, ValueNode } from 'graphql';
import { TimeResolver, TimestampResolver, DateResolver, DateTimeResolver, ObjectIDResolver, JSONResolver, JSONObjectResolver } from 'graphql-scalars';

export const GraphbackTime = new GraphQLScalarType({
  ...extractConfig(TimeResolver),
  name: "GraphbackTime"
});

export const GraphbackTimestamp = new GraphQLScalarType({
  ...extractConfig(TimestampResolver),
  name: "GraphbackTimestamp"
});

export const GraphbackDate = new GraphQLScalarType({
  ...extractConfig(DateResolver),
  name: "GraphbackDate"
});

export const GraphbackDateTime = new GraphQLScalarType({
  ...extractConfig(DateTimeResolver),
  name: "GraphbackDateTime"
});

const { parseLiteral, parseValue, ...objectIDConfig } = extractConfig(ObjectIDResolver);

/* eslint-disable */
export const GraphbackObjectID = new GraphQLScalarType({
  ...objectIDConfig,
  parseLiteral: (ast: ValueNode, variables: { [key: string]: any}) => {
    let ObjectIDFinal = ObjectID;
    try {
      ObjectIDFinal = require('bson-ext').ObjectID;
    } catch {}

    return new ObjectIDFinal(parseLiteral(ast, variables));
  },
  parseValue: (value: any) => {
    let ObjectIDFinal = ObjectID;
    try {
      ObjectIDFinal = require('bson-ext').ObjectID;
    } catch {}

    return new ObjectID(parseValue(value));
  },
  name: "GraphbackObjectID"
});

/* eslint-enable */

export const GraphbackJSON = new GraphQLScalarType({
  ...extractConfig(JSONResolver),
  name: "GraphbackJSON"
});

export const GraphbackJSONObject = new GraphQLScalarType({
  ...extractConfig(JSONObjectResolver),
  name: "GraphbackJSONObject"
});

export const graphbackScalarsTypes = [ GraphbackTime, GraphbackDate, GraphbackJSON, GraphbackObjectID, GraphbackDateTime, GraphbackTimestamp, GraphbackJSONObject ];

/**
 * Checks if the type is on the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackScalarType(type: GraphQLNamedType): boolean {
  return graphbackScalarsTypes.some(({ name }: GraphQLScalarType) => type.name === name);
}

/**
 * Checks if the type is on the known JSON Graphback supported scalars
 *
 * @param type - GraphQL type
 */
export function isSpecifiedGraphbackJSONScalarType(type: GraphQLNamedType): boolean {
  const name = type.name;

  return name === GraphbackJSONObject.name || name === GraphbackJSON.name;
}

/**
 * Extract config from wrapped scalar type
 * @param scalar
 */
function extractConfig(wrappedScalar: GraphQLScalarType) {
  const {name, ...config} = wrappedScalar.toConfig();

  return config
}
