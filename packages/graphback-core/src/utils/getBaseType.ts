import { GraphQLNamedType, GraphQLOutputType, isWrappingType } from 'graphql';

export function getBaseType(outputType: GraphQLOutputType): GraphQLNamedType {
    if (isWrappingType(outputType)) {
        return getBaseType(outputType.ofType);
    } else {
        return outputType;
    }
}
