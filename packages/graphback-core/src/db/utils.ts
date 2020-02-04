import { GraphQLField, GraphQLObjectType, isScalarType } from "graphql";
import { parseAnnotations } from 'graphql-metadata';
import { getBaseType } from '../utils/getBaseType';

export function getPrimaryKey(graphqlType: GraphQLObjectType): string | undefined {
  const fields = Object.values(graphqlType.getFields());

  const primaryKey = fields.find(isPrimary);

  return primaryKey ? primaryKey.name : undefined;
}

function isPrimary(field: GraphQLField<any, any>) {
  const dbConfig: any = parseAnnotations('db', field.description);

  if (dbConfig.primary) {
    return true;
  }

  const baseType = getBaseType(field.type);

  if (isScalarType(baseType) && baseType.name !== 'ID') {
    return true;
  }

  return false;
}