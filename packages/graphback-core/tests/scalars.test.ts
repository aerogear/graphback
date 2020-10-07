import { GraphQLInt, GraphQLFloat, GraphQLString } from 'graphql';
import { TimeResolver, ObjectIDResolver, JSONResolver, JSONObjectResolver } from 'graphql-scalars';
import { isSpecifiedGraphbackScalarType, GraphbackTime, GraphbackDateTime, GraphbackTimestamp, GraphbackDate, GraphbackObjectID, GraphbackJSON, GraphbackJSONObject, isSpecifiedGraphbackJSONScalarType } from "../src";

describe("Graphback scalars", () => {
  test('should return false for none GraphbackScalars', () => {
    const scalars = [TimeResolver, ObjectIDResolver, JSONResolver, JSONObjectResolver, GraphQLInt, GraphQLFloat, GraphQLString];

    for (const scalar of scalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(scalar);
      expect(isGraphbackScalar).toBeFalsy();
    }
  });

  test('should return true for all Graphback scalars', () => {
    const graphbackScalars = [GraphbackTime, GraphbackDateTime, GraphbackTimestamp, GraphbackDate, GraphbackObjectID, GraphbackJSON, GraphbackJSONObject];

    for (const graphbackScalar of graphbackScalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(graphbackScalar);
      expect(isGraphbackScalar).toBeTruthy();
    }
  });

  test('should return true for all Graphback JSON scalars', () => {
    const graphbackJSONScalars = [GraphbackJSON, GraphbackJSONObject];

    for (const graphbackJSONScalar of graphbackJSONScalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(graphbackJSONScalar);
      expect(isGraphbackJSONScalar).toBeTruthy();
    }
  });

  test('should return true for all non Graphback JSON scalars', () => {
    const scalars = [GraphbackTime, GraphbackDateTime, GraphbackTimestamp, GraphbackDate, GraphbackObjectID, GraphQLFloat, GraphQLString, ObjectIDResolver, JSONObjectResolver, JSONResolver];

    for (const scalar of scalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(scalar);
      expect(isGraphbackJSONScalar).toBeFalsy();
    }
  });
})
