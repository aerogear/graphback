import { GraphQLField, GraphQLObjectType } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getBaseType } from '../utils/getBaseType';

export function getPrimaryKey(graphqlType: GraphQLObjectType): GraphQLField<any, any> {
  const fields = Object.values(graphqlType.getFields());

  let primaryKey: GraphQLField<any, any>;
  for (const field of fields) {
    const dbConfig: any = parseDbAnnotations(field);
    const baseType = getBaseType(field.type);

    if (dbConfig.primary) {
      primaryKey = field;
      break;
    } else if (field.name === 'id' && baseType.name === 'ID') {
      primaryKey = field;
    }
  }
  
  // TODO: Move primary key validation to Schema generation
  if (!primaryKey) {
    throw new Error(`Primary key field not found on ${graphqlType.name} type.`)
  }

  return primaryKey;
}