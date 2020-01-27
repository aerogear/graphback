import { getBaseType } from '@graphback/core';
import { GraphQLField, GraphQLObjectType } from "graphql";

export function getCustomTypeResolverKeys(graphqlType: GraphQLObjectType, resolverObject: GraphQLObjectType, generatedResolverKeys: string[]) {
    const typeResolverFields = getTypeResolvers(graphqlType, resolverObject);
    const modelKeys = typeResolverFields.map((field: GraphQLField<any, any>) => field.name);

    return findUniqueKeys(generatedResolverKeys, modelKeys);
}

function getTypeResolvers(graphqlType: GraphQLObjectType, resolverType: GraphQLObjectType) {
    const resolverFields = Object.values(resolverType.getFields());

    return resolverFields.filter((field: GraphQLField<any, any>) => getBaseType(field.type).name === graphqlType.name);
}

// Finds the keys that are unique to `allKeys`
function findUniqueKeys(defaultKeys: string[], allKeys: string[]): string[] {
    return allKeys.filter((key: string) => defaultKeys.indexOf(key) === -1);
}