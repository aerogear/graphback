import ava, { ExecutionContext } from 'ava';
import { buildSchema } from 'graphql'
import { generateAbstractDatabase } from '../../src'

ava('skip root types', async (t: ExecutionContext) => {
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

ava('simple type', async (t: ExecutionContext) => {
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
  t.assert(colId.type === 'uuid')
  t.assert(colName.name === 'name')
  t.assert(colName.type === 'string')
  t.assert(colName.comment === 'Display name.')
})

ava('skip table', async (t: ExecutionContext) => {
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

ava('skip field', async (t: ExecutionContext) => {
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

ava('not null', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        name: String!
        nickname: String
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 2)
  const [colName, colNickname] = User.columns
  t.assert(colName.nullable === false)
  t.assert(colNickname.nullable === true)
})

ava('default value', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
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
  const [colSomeOption, colThatOption, colThisOption] = User.columns
  t.assert(colSomeOption.defaultValue === true)
  t.assert(colThatOption.defaultValue === false)
  t.assert(colThisOption.defaultValue === '')
})

ava('default primary index', async (t: ExecutionContext) => {
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
  t.deepEqual(id.columns, ['id'])
})

ava('no default primary index', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        """
        This will NOT get a primary index
        """
        foo: ID!
        """
        Neither will this
        """
        id: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  const [User] = adb.tables
  t.assert(User.primaries.length === 0)
})

ava('skip default primary index', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        """
        @db.primary: false
        """
        id: ID!
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.primaries.length === 0)
})

ava('change primary index', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        id: ID!
        """
        @db.primary
        """
        email: String!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.primaries.length === 1)
  const [email] = User.primaries
  t.deepEqual(email.columns, ['email'])
})

ava('simple index', async (t: ExecutionContext) => {
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
  t.deepEqual(email.columns, ['email'])
})

ava('multiple indexes', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        """
        @db.index
        """
        id: String!
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
  t.deepEqual(id.columns, ['id'])
  t.deepEqual(email.columns, ['email'])
})

ava('named index', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
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
  t.deepEqual(myIndex.columns, ['email', 'name'])
})

ava('object index', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
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
  t.deepEqual(myIndex.columns, ['email', 'name'])
})

ava('unique index', async (t: ExecutionContext) => {
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
  t.deepEqual(email.columns, ['email'])
})

ava('custom name', async (t: ExecutionContext) => {
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

ava('custom type', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        """
        @db.type: 'string'
        @db.length: 36
        """
        id: ID!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  const [colId] = User.columns
  t.assert(colId.name === 'id')
  t.assert(colId.annotations.type === 'string')
  t.assert(colId.annotations.length === 36)
  t.assert(colId.type === 'string')
  t.deepEqual(colId.args, [36])
})

ava('foreign key', async (t: ExecutionContext) => {
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
  t.assert(colUserForeign.name === 'user_foreign')
  t.assert(colUserForeign.type === 'uuid')
  t.assert(colUserForeign.foreign && colUserForeign.foreign.tableName === 'user')
  t.assert(colUserForeign.foreign && colUserForeign.foreign.columnName === 'id')
})

ava('many to many', async (t: ExecutionContext) => {
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
  t.assert(colMessageUsers.name === 'users_foreign')
  t.assert(colMessageUsers.type === 'uuid')
  t.assert(colMessageUsers.foreign && colMessageUsers.foreign.tableName === 'message')
  t.assert(colMessageUsers.foreign && colMessageUsers.foreign.columnName === 'id')
  t.assert(colUserMessages.name === 'messages_foreign')
  t.assert(colUserMessages.type === 'uuid')
  t.assert(colUserMessages.foreign && colUserMessages.foreign.tableName === 'user')
  t.assert(colUserMessages.foreign && colUserMessages.foreign.columnName === 'id')
})

ava('many to many on self', async (t: ExecutionContext) => {
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
  t.assert(col1.name === 'id_foreign')
  t.assert(col1.type === 'uuid')
  t.assert(col1.foreign && col1.foreign.tableName === 'user')
  t.assert(col1.foreign && col1.foreign.columnName === 'id')
  t.assert(col2.name === 'id_foreign_other')
  t.assert(col2.type === 'uuid')
  t.assert(col2.foreign && col2.foreign.tableName === 'user')
  t.assert(col2.foreign && col2.foreign.columnName === 'id')
})

ava('simple list', async (t: ExecutionContext) => {
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
  t.assert(colId.type === 'uuid')
  t.assert(colNames.name === 'names')
  t.assert(colNames.type === 'json')
})

ava('custom scalar map', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        name: String
        nickname: String
      }
    `)
  const adb = await generateAbstractDatabase(schema, {
    scalarMap: (field) => {
      if (field.name === 'name') {
        return {
          type: 'text',
          args: [],
        }
      }
      return null
    },
  })
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 2)
  const [colName, colNickname] = User.columns
  t.assert(colName.type === 'text')
  t.assert(colNickname.type === 'string')
})

ava('map lists to json', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type User {
        names: [String]
      }
    `)
  const adb = await generateAbstractDatabase(schema, {
    mapListToJson: true,
  })
  t.assert(adb.tables.length === 1)
  const [User] = adb.tables
  t.assert(User.columns.length === 1)
  const [colNames] = User.columns
  t.assert(colNames.type === 'json')
})

ava('default name transforms', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type UserTeam {
        id: ID!
        name: String!
        yearlyBilling: Boolean!
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  t.assert(adb.tables.length === 1)
  const [UserTeam] = adb.tables
  t.assert(UserTeam.name === 'user_team')
  t.assert(UserTeam.columns.length === 3)
  const [colId, colName, colYearlyBilling] = UserTeam.columns
  t.assert(colId.name === 'id')
  t.assert(colName.name === 'name')
  t.assert(colYearlyBilling.name === 'yearly_billing')
})

ava('custom name transforms', async (t: ExecutionContext) => {
  const schema = buildSchema(`
      type UserTeam {
        id: ID!
        name: String!
        yearlyBilling: Boolean!
      }
    `)
  const adb = await generateAbstractDatabase(schema, {
    transformTableName: (name, direction) => {
      if (direction === 'to-db') {
        return `Foo${name}`
      }
      return name
    },
    transformColumnName: (name, direction) => {
      if (direction === 'to-db') {
        return `bar_${name}`
      }
      return name
    },
  })
  t.assert(adb.tables.length === 1)
  const [UserTeam] = adb.tables
  t.assert(UserTeam.name === 'FooUserTeam')
  t.assert(UserTeam.columns.length === 3)
  const [colId, colName, colYearlyBilling] = UserTeam.columns
  t.assert(colId.name === 'bar_id')
  t.assert(colName.name === 'bar_name')
  t.assert(colYearlyBilling.name === 'bar_yearlyBilling')
})

ava('sandbox', async (t: ExecutionContext) => {
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
})
