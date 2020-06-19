import { GraphQLObjectType, GraphQLSchema, GraphQLType } from 'graphql';

/**
 *
 * Get all GraphQL types from schema without:
 *
 * - Query, Mutation, Subscription objects
 * - Internal scalars added by parser
 *
 * @param schema
 * @deprecated Please use `getUserTypes` from @graphql-toolkit/common
 */
//FIXME: Swap with https://github.com/ardatan/graphql-toolkit/pull/422
export const getModelTypesFromSchema = (schema: GraphQLSchema): GraphQLObjectType[] => {
  const allTypesMap = schema.getTypeMap();
  const types = Object.values(allTypesMap);

  return types.filter((graphqlType: GraphQLType) => {
    if (graphqlType instanceof GraphQLObjectType) {
      //Filter out private types
      if (graphqlType.name.startsWith('__')) {
        return false;
      }
      if (schema.getMutationType() && graphqlType.name === schema.getMutationType().name) {
        return false;
      }
      if (schema.getQueryType() && graphqlType.name === schema.getQueryType().name) {
        return false;
      }
      if (schema.getSubscriptionType() && graphqlType.name === schema.getSubscriptionType().name) {
        return false;
      }

      return true
    }

    return false;
  }) as GraphQLObjectType[]
}
