import { isWrappingType, GraphQLNonNull, isListType, GraphQLList, GraphQLType, getNamedType, GraphQLInputType, GraphQLOutputType } from 'graphql';

type WrappingTypeName = 'GraphQLList' | 'GraphQLNonNull'
type InputOrOutTypeType = GraphQLInputType | GraphQLOutputType

/**
 * Copies the wrapping type(s) from one GraphQLType to another
 *
 * @param {GraphQLType} copyFromType - Get the wrapping types from this type
 * @param {GraphQLType} copyToType - Add the wrapping types to this type
 */
export function copyWrappingType(copyFromType: InputOrOutTypeType, copyToType: InputOrOutTypeType): InputOrOutTypeType {
  const wrappers: WrappingTypeName[] = []

  let oldTypeCopy = copyFromType
  while (isWrappingType(oldTypeCopy)) {
    if (isListType(oldTypeCopy)) {
      wrappers.push('GraphQLList')
    } else {
      wrappers.push('GraphQLNonNull')
    }
    oldTypeCopy = oldTypeCopy.ofType
  }

  let namedNewType: GraphQLType = getNamedType(copyToType)
  while (wrappers.length > 0) {
    const wrappingType = wrappers.pop()
    if (wrappingType === 'GraphQLList') {
      namedNewType = GraphQLList(namedNewType)
    } else {
      namedNewType = GraphQLNonNull(namedNewType)
    }
  }

  return namedNewType
}