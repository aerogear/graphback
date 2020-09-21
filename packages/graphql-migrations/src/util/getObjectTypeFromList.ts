import { GraphQLField, isListType, isNonNullType, isObjectType } from 'graphql';

// eslint-disable-next-line import/no-default-export
export default function(field: GraphQLField<any, any, { [key: string]: any; }>) {
  //comments: [Comment]
  if (isListType(field.type) && isObjectType(field.type.ofType)) {
    return field.type.ofType;
  }
  //comments: [Comment!]
  if (isListType(field.type) && isNonNullType(field.type.ofType) && isObjectType(field.type.ofType.ofType)) {
    return field.type.ofType.ofType;
  }
  //comments: [Comment]!
  if (isNonNullType(field.type) && isListType(field.type.ofType) && isObjectType(field.type.ofType.ofType)) {
    return field.type.ofType.ofType;
  }
  //comments: [Comment!]!
  if (isNonNullType(field.type) && isListType(field.type.ofType) && isNonNullType(field.type.ofType.ofType) &&
    isObjectType(field.type.ofType.ofType.ofType)) {
    return field.type.ofType.ofType.ofType;
  }

  return undefined;
}
