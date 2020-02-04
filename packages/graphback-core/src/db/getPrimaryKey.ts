import { GraphQLObjectType, isScalarType } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getBaseType } from '../utils/getBaseType';

export function getPrimaryKey(graphqlType: GraphQLObjectType): string | undefined {
  const fields = Object.values(graphqlType.getFields());

  let primaryKey: string;
  for (const field of fields) {
    const dbConfig: any = parseDbAnnotations(field);
    const baseType = getBaseType(field.type);

    if (dbConfig.primary) {
      return field.name;
    } else if (isScalarType(baseType) && baseType.name === 'ID') {
      primaryKey = field.name;
    }
  }

  return primaryKey;
}