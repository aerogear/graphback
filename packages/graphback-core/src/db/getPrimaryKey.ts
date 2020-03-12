import { GraphQLField, GraphQLObjectType, getNamedType } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';

/**
 * Returns the primary key field of a GraphQL object.
 * First looks for the existence of a `@db.primary` field annotation,
 * otherwise tries to find an `id: ID` field.
 * 
 * @param graphqlType 
 */
export function getPrimaryKey(graphqlType: GraphQLObjectType): GraphQLField<any, any> {
  const fields = Object.values(graphqlType.getFields());

  let primaryKey: GraphQLField<any, any>;
  let primariesCount = 0;
  for (const field of fields) {
    const dbConfig: any = parseDbAnnotations(field);
    const baseType = getNamedType(field.type);

    if (dbConfig.primary) {
      primaryKey = field;
      primariesCount += 1;
    } else if (field.name === 'id' && baseType.name === 'ID') {
      primaryKey = field;
    }
  }
  
  if (primariesCount > 1) {
    throw new Error(`${graphqlType.name} type should not have multiple '@db.primary' annotations.`)
  }

  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`)
  }

  return primaryKey;
}