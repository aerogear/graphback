import { printSchemaHandler } from '../src/components/printSchemaHandler';
import { buildSchema } from 'graphql';

export const expectedUserSchema = `"""
Directs the executor to skip this field or fragment when the \`if\` argument is true.
"""
directive @skip(
  """Skipped when true."""
  if: Boolean!
) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT

"""
Directs the executor to include this field or fragment only when the \`if\` argument is true.
"""
directive @include(
  """Included when true."""
  if: Boolean!
) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT

"""Marks an element of a GraphQL schema as no longer supported."""
directive @deprecated(
  """
  Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).
  """
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE

"""Exposes a URL that specifies the behaviour of this scalar."""
directive @specifiedBy(
  """The URL that specifies the behaviour of this scalar."""
  url: String!
) on SCALAR

input CreateUserInput {
  id: ID
  name: String
}

input IDInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  in: [ID]
}

input MutateUserInput {
  id: ID!
  name: String
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(input: MutateUserInput!): User!
  deleteUser(input: MutateUserInput!): User!
}

input OrderByInput {
  field: String!
  order: SortDirectionEnum = ASC
}

input PageRequest {
  limit: Int
  offset: Int
}

type Query {
  getUser(id: ID!): User
  findUsers(filter: UserFilter, page: PageRequest, orderBy: OrderByInput): UserResultList!
}

enum SortDirectionEnum {
  DESC
  ASC
}

input StringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  in: [String]
  contains: String
  startsWith: String
  endsWith: String
}

type Subscription {
  newUser(filter: UserSubscriptionFilter): User!
  updatedUser(filter: UserSubscriptionFilter): User!
  deletedUser(filter: UserSubscriptionFilter): User!
}

"""@model"""
type User {
  id: ID!
  name: String
}

input UserFilter {
  id: IDInput
  name: StringInput
  and: [UserFilter]
  or: [UserFilter]
  not: UserFilter
}

type UserResultList {
  items: [User]!
  offset: Int
  limit: Int
  count: Int
}

input UserSubscriptionFilter {
  id: ID
  name: String
}
`

beforeEach(() => process.chdir(__dirname))

test('printSchema from GraphQL file', async () => {
  const modelFile = './files/user-model.graphql'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
  expect(buildSchema(schemaSDL).astNode).toEqual(buildSchema(expectedUserSchema).astNode)
})

test('printSchema from directory', async () => {
  const modelFile = './files'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(buildSchema(schemaSDL).astNode).toEqual(buildSchema(expectedUserSchema).astNode)
})
