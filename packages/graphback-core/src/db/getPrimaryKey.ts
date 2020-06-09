import { GraphQLField, GraphQLObjectType, getNamedType } from "graphql";
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

  let primaryKeyFromScalarID: GraphQLField<any, any>;
  let primaryKey: GraphQLField<any, any>;
  let primariesCount = 0;
  for (const field of fields) {
    const hasIdMarker = parseMetadata("id", field);
    const baseType = getNamedType(field.type);

    if (hasIdMarker) {
      primaryKey = field;
      primariesCount += 1;
    } else if (field.name === 'id' && baseType.name === 'ID') {
      primaryKeyFromScalarID = field;
    }
  }
  
  if (primariesCount > 1) {
    throw new Error(`${graphqlType.name} type should not have multiple '@id' annotations.`)
  }

  primaryKey = primaryKey || primaryKeyFromScalarID;

  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`)
  }

  return primaryKey;
}