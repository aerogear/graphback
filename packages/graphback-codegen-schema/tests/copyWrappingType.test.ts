import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql'
import { copyWrappingType } from '../src/definitions/copyWrappingType'

describe('copyWrappingType', () => {
  test('Boolean should become Boolean!', () => {
    const oldType = GraphQLNonNull(GraphQLString)
    const newType = GraphQLBoolean

    const copiedType = copyWrappingType(oldType, newType)
    expect(copiedType.toString()).toEqual('Boolean!')
  })

  test('Float should become [Float]', () => {
    const oldType = GraphQLList(GraphQLString)
    const newType = GraphQLFloat

    const copiedType = copyWrappingType(oldType, newType)
    expect(copiedType.toString()).toEqual('[Float]')
  })

  test('Int should become [Int]!', () => {
    const oldType = GraphQLNonNull(GraphQLList(GraphQLString))
    const newType = GraphQLInt

    const copiedType = copyWrappingType(oldType, newType)
    expect(copiedType.toString()).toEqual('[Int]!')
  })

  test('String should become [String!]!', () => {
    const oldType = GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLInt)))
    const newType = GraphQLString

    const copiedType = copyWrappingType(oldType, newType)
    expect(copiedType.toString()).toEqual('[String!]!')
  })

  test('User should become User!', () => {
    const oldType = GraphQLNonNull(GraphQLString)
    const newType = new GraphQLObjectType({
      name: 'User',
      fields: {
        test: {
          type: GraphQLString
        }
      }
    })

    const copiedType = copyWrappingType(oldType, newType)
    expect(copiedType.toString()).toEqual('User!')
  })
})
