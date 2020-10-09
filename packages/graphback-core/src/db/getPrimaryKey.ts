import { GraphQLField, GraphQLObjectType, getNamedType, isScalarType, GraphQLInputField } from "graphql";
import { parseMetadata } from 'graphql-metadata';

/**
 * Returns the primary key field of a GraphQL object.
 * First looks for the existence of a `@id` field annotation,
 * otherwise tries to find an `id: ID` field.
 *
 * @param graphqlType
 */
export function getPrimaryKey(graphqlType: GraphQLObjectType): GraphQLField<any, any> {
  const fields = Object.values(graphqlType.getFields());

  const autoPrimaryKeyFromScalar: GraphQLField<any, any>[] = [];
  let primaryKey: GraphQLField<any, any>;
  let primariesCount = 0;
  for (const field of fields) {
    const hasIdMarker = parseMetadata("id", field);
    if (hasIdMarker) {
      primaryKey = field;
      primariesCount += 1;
    } else if (isAutoPrimaryKey(field)) {
      autoPrimaryKeyFromScalar.push(field);
    }
  }

  if (primariesCount > 1) {
    throw new Error(`${graphqlType.name} type should not have multiple '@id' annotations.`)
  }

  if (primaryKey) {
    return primaryKey;
  }

  if (autoPrimaryKeyFromScalar.length > 1) {
    throw new Error(`${graphqlType.name} type should not have two potential primary keys: "_id" and "id". Use '@id' annotations to indicate which one is to be used.`);
  }

  primaryKey = autoPrimaryKeyFromScalar.shift();

  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`)
  }

  return primaryKey;
}

/**
 * Check if a GraphQLField can be inferred as a primary key, specific for each database:
 * A field is a potential primary key if:
 * - is named "id" and has type "ID", auto increment primary key for relational database
 * - is named "_id" and has scalar type "GraphbackObectID", a BSON primary key for MongoDB
 * @param field
 */
export function isAutoPrimaryKey(field: GraphQLField<any, any> | GraphQLInputField): boolean {
  const { type, name: fieldName } = field;
  const baseType = getNamedType(type);
  const name = baseType.name;

  return ((fieldName === 'id' && name === 'ID') || (fieldName === "_id" && name === "GraphbackObjectID")) && isScalarType(baseType);
}
