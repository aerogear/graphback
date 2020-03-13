/*eslint-disable max-lines*/
import { buildSchema } from 'graphql';
import { generateAbstractDatabase } from '../../src'

test('skip root types', async () => {
  const schema = buildSchema(`
      type Query {
        hello: String
      }

      type Mutation {
        do: Boolean
      }

      type Subscription {
        notif: String
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 0)
})

test('simple type', async () => {
  const schema = buildSchema(`
      """
      A user.
      """
      type User {
        id: ID!
        """
        Display name.
        """
        name: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.name === 'user')
  t.assert(User.comment === 'A user.')
  t.assert(User.columns.length === 2)
  const [colId, colName] = User.columns
  t.assert(colId.name === 'id')
  t.assert(colId.type === 'increments')
  t.assert(colName.name === 'name')
  t.assert(colName.type === 'string')
  t.assert(colName.comment === 'Display name.')
})

test('skip table', async () => {
  const schema = buildSchema(`
      """
      @db.skip
      """
      type User {
        id: ID!
        name: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 0)
})

test('skip field', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.skip
        """
        name: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.name === 'user')
  t.assert(User.columns.length === 1)
  const [colId] = User.columns
  t.assert(colId.name === 'id')
})

test('not null', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        name: String!
        nickname: String
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 3)
  const [_, colName, colNickname] = User.columns
  t.assert(colName.nullable === false)
  t.assert(colNickname.nullable === true)
})

test('default value', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.default: true
        """
        someOption: Boolean
        """
        @db.default: false
        """
        thatOption: Boolean
        """
        @db.default: ''
        """
        thisOption: Boolean
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  const [User] = adb.tables
  const [_, colSomeOption, colThatOption, colThisOption] = User.columns
  t.assert(colSomeOption.defaultValue === true)
  t.assert(colThatOption.defaultValue === false)
  t.assert(colThisOption.defaultValue === '')
})

test('default primary index', async () => {
  const schema = buildSchema(`
      type User {
        """
        This will get a primary index
        """
        id: ID!
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.primaries.length === 1)
  const [id] = User.primaries
  expect(id.columns).toEqual(['id'])
})

test('simple index', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.index
        """
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.indexes.length === 1)
  const [email] = User.indexes
  expect(email.columns).toEqual(['email'])
})

test('multiple indexes', async () => {
  const schema = buildSchema(`
      type User {
        """
        @db.index
        """
        id: ID!
        """
        @db.index
        """
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.indexes.length === 2)
  const [id, email] = User.indexes
  expect(id.columns).toEqual(['id'])
  expect(email.columns).toEqual(['email'])
})

test('named index', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.index: 'myIndex'
        """
        email: String!
        """
        @db.index: 'myIndex'
        """
        name: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.indexes.length === 1)
  const [myIndex] = User.indexes
  t.assert(myIndex.name === 'myIndex')
  expect(myIndex.columns).toEqual(['email', 'name'])
})

test('object index', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.index: { name: 'myIndex', type: 'string' }
        """
        email: String!
        """
        @db.index: 'myIndex'
        """
        name: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.indexes.length === 1)
  const [myIndex] = User.indexes
  t.assert(myIndex.name === 'myIndex')
  t.assert(myIndex.type === 'string')
  expect(myIndex.columns).toEqual(['email', 'name'])
})

test('unique index', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.unique
        """
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.uniques.length === 1)
  const [email] = User.uniques
  expect(email.columns).toEqual(['email'])
})

test('custom name', async () => {
  const schema = buildSchema(`
      """
      @db.name: 'people'
      """
      type User {
        id: ID!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.annotations.name === 'people')
  t.assert(User.name === 'people')
})

test('custom type', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.type: 'string'
        @db.length: 36
        """
        name: String
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  const [_, colName] = User.columns
  t.assert(colName.name === 'name')
  t.assert(colName.annotations.type === 'string')
  t.assert(colName.annotations.length === 36)
  t.assert(colName.type === 'string')
  expect(colName.args).toEqual([36])
})

test('foreign key', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        messages: [Message!]!
      }

      type Message {
        id: ID!
        user: User
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 2)
  const [User, Message] = adb.tables
  t.assert(User.name === 'user')
  t.assert(Message.name === 'message')
  t.assert(User.columns.length === 1)
  t.assert(Message.columns.length === 2)
  const [colId, colUserForeign] = Message.columns
  t.assert(colId.name === 'id')
  t.assert(colUserForeign.name === 'userId')
  t.assert(colUserForeign.type === 'integer')
  t.assert(colUserForeign.foreign && colUserForeign.foreign.tableName === 'user')
  t.assert(colUserForeign.foreign && colUserForeign.foreign.columnName === 'id')
})

test('many to many', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.manyToMany: 'users'
        """
        messages: [Message!]!
      }

      type Message {
        id: ID!
        """
        @db.manyToMany: 'messages'
        """
        users: [User]
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 3)
  const Join = adb.tables[2]
  t.assert(Join.name === 'message_users_join_user_messages')
  const [colMessageUsers, colUserMessages] = Join.columns
  t.assert(colMessageUsers.name === 'usersId')
  t.assert(colMessageUsers.type === 'integer')
  t.assert(colMessageUsers.foreign && colMessageUsers.foreign.tableName === 'message')
  t.assert(colMessageUsers.foreign && colMessageUsers.foreign.columnName === 'id')
  t.assert(colUserMessages.name === 'messagesId')
  t.assert(colUserMessages.type === 'integer')
  t.assert(colUserMessages.foreign && colUserMessages.foreign.tableName === 'user')
  t.assert(colUserMessages.foreign && colUserMessages.foreign.columnName === 'id')
})

test('many to many on self', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        contacts: [User]
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 2)
  const [User, UserContacts] = adb.tables
  t.assert(UserContacts.name === 'user_contacts_join_user_contacts')
  t.assert(User.name === 'user')
  t.assert(User.columns.length === 1)
  const [col1, col2] = UserContacts.columns
  t.assert(col1.name === 'idId')
  t.assert(col1.type === 'integer')
  t.assert(col1.foreign && col1.foreign.tableName === 'user')
  t.assert(col1.foreign && col1.foreign.columnName === 'id')
  t.assert(col2.name === 'idId_other')
  t.assert(col2.type === 'integer')
  t.assert(col2.foreign && col2.foreign.tableName === 'user')
  t.assert(col2.foreign && col2.foreign.columnName === 'id')
})

test('simple list', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.type: 'json'
        """
        names: [String]
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.name === 'user')
  t.assert(User.columns.length === 2)
  const [colId, colNames] = User.columns
  t.assert(colId.name === 'id')
  t.assert(colId.type === 'increments')
  t.assert(colNames.name === 'names')
  t.assert(colNames.type === 'json')
})

test('custom scalar map', async () => {
  const schema = buildSchema(`
      type User {
        id: ID
        name: String
        nickname: String
      }
    `)
  const adb = await generateAbstractDatabase(schema, {
    scalarMap: (field: any) => {
      if (field.name === 'name') {
        return {
          type: 'text',
          args: [],
        }
      }

      return undefined
    },
  })
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 3)
  const [colId, colName, colNickname] = User.columns
  t.assert(colId.type === 'increments')
  t.assert(colName.type === 'text')
  t.assert(colNickname.type === 'string')
})

test('map lists to json', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        names: [String]
      }
    `)
  const adb = await generateAbstractDatabase(schema, {
    mapListToJson: true,
  })
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 2)
  const [_, colNames] = User.columns
  t.assert(colNames.type === 'json')
})

test('default name transforms', async () => {
  const schema = buildSchema(`
      type UserTeam {
        id: ID!
        TeamName: String!
        yearlyBilling: Boolean!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [UserTeam] = adb.tables
  t.assert(UserTeam.name === 'userteam')
  t.assert(UserTeam.columns.length === 3)
  const [colId, colName, colYearlyBilling] = UserTeam.columns
  t.assert(colId.name === 'id')
  t.assert(colName.name === 'TeamName')
  t.assert(colYearlyBilling.name === 'yearlyBilling')
})

test('sandbox', async () => {
  const schema = buildSchema(`
      scalar Date

      """
      A user.
      """
      type User {
        id: ID!
        """
        Display name
        @db.length: 200
        """
        name: String!
        email: String!
        score: Int
        """
        @db.type: 'json'
        """
        scores: [Int]
        messages: [Message]
        """
        @db.manyToMany: 'users'
        """
        sharedMessages: [Message]
        contacts: [User]
      }

      type Message {
        id: ID!
        user: User!
        """
        @db.manyToMany: 'sharedMessages'
        """
        users: [User]
        """
        @db.type: 'datetime'
        """
        created: Date!
        title: String!
        """
        @db.type: 'text'
        """
        content: String!
      }

      type Query {
        users: [User]
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 4)
  expect(adb.tables).toMatchSnapshot();
})
