import { getBaseType } from '@graphback/core';
import { GraphQLField, GraphQLObjectType } from "graphql";

export function getCustomTypeResolverFieldNames(graphqlTypeName: string, resolverObject: GraphQLObjectType, generatedResolverKeys: string[]) {
    const typeResolverFields = getTypeResolvers(graphqlTypeName, resolverObject);
    const modelKeys = typeResolverFields.map((field: GraphQLField<any, any>) => field.name);

    return findUniqueKeys(generatedResolverKeys, modelKeys);
}

function getTypeResolvers(graphqlTypeName: string, resolverType: GraphQLObjectType) {
    const resolverFields = Object.values(resolverType.getFields());

    return resolverFields.filter((field: GraphQLField<any, any>) => getBaseType(field.type).name === graphqlTypeName);
}

// Finds the keys that are unique to `allKeys`
function findUniqueKeys(defaultKeys: string[], allKeys: string[]): string[] {
    return allKeys.filter((key: string) => defaultKeys.indexOf(key) === -1);
}