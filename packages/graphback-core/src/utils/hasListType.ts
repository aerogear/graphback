import { GraphQLOutputType, isWrappingType, isListType } from 'graphql';

export function hasListType(outputType: GraphQLOutputType): boolean {
  if (isListType(outputType)) {
    return true;
  } else if (isWrappingType(outputType)) {
    return hasListType(outputType.ofType)
  }

  return false;
}
