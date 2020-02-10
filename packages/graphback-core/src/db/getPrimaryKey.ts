import { GraphQLField, GraphQLObjectType, isScalarType } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getBaseType } from '../utils/getBaseType';

export function getPrimaryKey(graphqlType: GraphQLObjectType): GraphQLField<any, any> | undefined {
  const fields = Object.values(graphqlType.getFields());

  let primaryKey: GraphQLField<any, any>;
  for (const field of fields) {
    const dbConfig: any = parseDbAnnotations(field);
    const baseType = getBaseType(field.type);

    if (dbConfig.primary) {
      primaryKey = field;
      break;
    } else if (isScalarType(baseType) && baseType.name === 'ID') {
      primaryKey = field;
    }
  }

  return primaryKey;
}