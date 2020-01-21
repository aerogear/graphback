import { getUserTypesFromSchema } from '@graphback/core';
import { GraphQLObjectType, print } from 'graphql';

export function printSortedSchema(schema) {
    const userTypes = getUserTypesFromSchema(schema).sort((userType1: GraphQLObjectType, userType2: GraphQLObjectType) => {
        return userType1.name.localeCompare(userType2.name);
    });

    let schemaString = '';

    const nonUserTypes = Object.values(schema.getTypeMap()).filter((graphqlType: any) => {
        if (graphqlType.name.startsWith('__')) {
            return false;
        }
        if (graphqlType instanceof GraphQLObjectType) {
            return false;
        }

        return true;
    });

    schemaString += schema.getDirectives().map((directive: any) => {
        if (directive.astNode) {
            return `${print(directive.astNode)}`
        }

        return undefined;
    }).filter(value => !!value).join('\n\n');

    schemaString += '\n\n';
    schemaString += nonUserTypes.map((graphqlType: any) => {
        if (graphqlType.astNode) {
            return `${print(graphqlType.astNode)}`
        }

        return undefined;
    }).filter(value => !!value).join('\n\n');

    schemaString += '\n\n';
    schemaString += userTypes.map((userType: GraphQLObjectType) => {
        return `${print(userType.astNode)}`
    }).join('\n\n');
    
    schemaString += '\n\n';
    schemaString += `${print(schema.getQueryType().astNode)} \n\n`
    schemaString += `${print(schema.getMutationType().astNode)} \n\n`
    schemaString += `${print(schema.getSubscriptionType().astNode)} \n\n`

    return schemaString;
}