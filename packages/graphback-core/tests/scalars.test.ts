import { ObjectId } from 'bson';
import { GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import {
  JSONObjectResolver,
  JSONResolver,
  ObjectIDResolver,
  TimeResolver,
} from 'graphql-scalars';
import {
  GraphbackDate,
  GraphbackDateTime,
  GraphbackJSON,
  GraphbackJSONObject,
  GraphbackObjectID,
  GraphbackTime,
  GraphbackTimestamp,
  isSpecifiedGraphbackJSONScalarType,
  isSpecifiedGraphbackScalarType,
} from '../src';
import { isObjectID } from '../src/scalars/objectId';

describe('Graphback scalars', () => {
  test('should validate objectId as hex string', () => {
    const objectId = new ObjectId();
    const hex = objectId.toHexString();
    const result = isObjectID(hex);
    expect(result).toBeTruthy();
  });
  test('should not validate objectId as hex string', () => {
    const result = isObjectID('zzzzzzz');
    expect(result).toBeFalsy();
  });

  test('should return false for none GraphbackScalars', () => {
    const scalars = [
      TimeResolver,
      ObjectIDResolver,
      JSONResolver,
      JSONObjectResolver,
      GraphQLInt,
      GraphQLFloat,
      GraphQLString,
    ];

    for (const scalar of scalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(scalar);
      expect(isGraphbackScalar).toBeFalsy();
    }
  });

  test('should return true for all Graphback scalars', () => {
    const graphbackScalars = [
      GraphbackTime,
      GraphbackDateTime,
      GraphbackTimestamp,
      GraphbackDate,
      GraphbackObjectID,
      GraphbackJSON,
      GraphbackJSONObject,
    ];

    for (const graphbackScalar of graphbackScalars) {
      const isGraphbackScalar = isSpecifiedGraphbackScalarType(graphbackScalar);
      expect(isGraphbackScalar).toBeTruthy();
    }
  });

  test('should return true for all Graphback JSON scalars', () => {
    const graphbackJSONScalars = [GraphbackJSON, GraphbackJSONObject];

    for (const graphbackJSONScalar of graphbackJSONScalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(
        graphbackJSONScalar,
      );
      expect(isGraphbackJSONScalar).toBeTruthy();
    }
  });

  test('should return true for all non Graphback JSON scalars', () => {
    const scalars = [
      GraphbackTime,
      GraphbackDateTime,
      GraphbackTimestamp,
      GraphbackDate,
      GraphbackObjectID,
      GraphQLFloat,
      GraphQLString,
      ObjectIDResolver,
      JSONObjectResolver,
      JSONResolver,
    ];

    for (const scalar of scalars) {
      const isGraphbackJSONScalar = isSpecifiedGraphbackJSONScalarType(scalar);
      expect(isGraphbackJSONScalar).toBeFalsy();
    }
  });
});
