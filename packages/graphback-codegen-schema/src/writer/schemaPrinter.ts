import { GraphQLObjectType, GraphQLSchema, print } from 'graphql';

/**
 * Allows to transform schema into string by perserving original order
 * and including directives
 * 
 * @param schema 
 */
// TODO remove this method and use `printSchema(lexicographicSortSchema(schema))`
export function printSortedSchema(schema: GraphQLSchema) {
    const schemaTypes = Object.values(schema.getTypeMap());

    const orderedTypes = schemaTypes.filter((schemaType: GraphQLObjectType) => {
        if (isQueryType(schema, schemaType)) {
            return false;
        }
        if (isSubscriptionType(schema, schemaType)) {
            return false;
        }
        if (isMutationType(schema, schemaType)) {
            return false;
        }

        return schemaType.astNode?.loc !== undefined;
    }).sort((type1: GraphQLObjectType, type2: GraphQLObjectType) => {
        return type1.astNode.loc.start - type2.astNode.loc.start
    })

    let schemaString = '';

    schemaString += schema.getDirectives().map((directive: any) => {
        if (directive.astNode) {
            return `${print(directive.astNode)}`
        }

        return undefined;
    }).filter((value: any) => !!value).join('\n\n');

    schemaString += '\n\n';
    schemaString += orderedTypes.map((graphqlType: any) => {
        return `${print(graphqlType.astNode)}`
    }).join('\n\n');

    schemaString += '\n\n';
    if (schema.getQueryType() && Object.keys(schema.getQueryType().getFields()).length) {
        schemaString += `${print(schema.getQueryType().astNode)} \n\n`
    }

    if (schema.getMutationType() && Object.keys(schema.getMutationType().getFields()).length) {
        schemaString += `${print(schema.getMutationType().astNode)} \n\n`
    }

    if (schema.getSubscriptionType() && Object.keys(schema.getSubscriptionType().getFields()).length) {
        schemaString += `${print(schema.getSubscriptionType().astNode)} \n\n`
    }

    return schemaString;
}

/**
 * Checks if type is query
 *
 * @internal
 */
export function isQueryType(schema: GraphQLSchema, providedType: any) {
    const schemaType = schema.getQueryType();
    if (schemaType) {
        return schemaType.name === providedType.name;
    }

    return false;
}

/**
 * Checks if type is mutation
 *
 * @internal
 */
export function isMutationType(schema: GraphQLSchema, providedType: any) {
    const schemaType = schema.getMutationType();
    if (providedType.name && schemaType) {
        return schemaType.name === providedType.name;
    }

    return false;
}

/**
 * Checks if type is subscription
 *
 * @internal
 */
export function isSubscriptionType(
    schema: GraphQLSchema, providedType: any) {
    const schemaType = schema.getSubscriptionType();
    if (schemaType) {
        return schemaType.name === providedType.name;
    }

    return false;
}
