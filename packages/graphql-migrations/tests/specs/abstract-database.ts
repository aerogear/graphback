import { buildSchema } from 'graphql'
import { generateAbstractDatabase } from '../../src'

describe('create abstract database', () => {
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
    expect(adb.tables.length).toBe(0)
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.name).toBe('user')
    expect(User.comment).toBe('A user.')
    expect(User.columns.length).toBe(2)
    const [colId, colName] = User.columns
    expect(colId.name).toBe('id')
    expect(colId.type).toBe('uuid')
    expect(colName.name).toBe('name')
    expect(colName.type).toBe('string')
    expect(colName.comment).toBe('Display name.')
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
    expect(adb.tables.length).toBe(0)
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.name).toBe('user')
    expect(User.columns.length).toBe(1)
    const [colId] = User.columns
    expect(colId.name).toBe('id')
  })

  test('not null', async () => {
    const schema = buildSchema(`
      type User {
        name: String!
        nickname: String
      }
    `)
    const adb = await generateAbstractDatabase(schema)
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.columns.length).toBe(2)
    const [colName, colNickname] = User.columns
    expect(colName.nullable).toBe(false)
    expect(colNickname.nullable).toBe(true)
  })

  test('default value', async () => {
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
    expect(colSomeOption.defaultValue).toBe(true)
    expect(colThatOption.defaultValue).toBe(false)
    expect(colThisOption.defaultValue).toBe('')
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.primaries.length).toBe(1)
    const [id] = User.primaries
    expect(id.columns).toEqual(['id'])
  })

  test('no default primary index', async () => {
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
    expect(User.primaries.length).toBe(0)
  })

  test('skip default primary index', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.primaries.length).toBe(0)
  })

  test('change primary index', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.primaries.length).toBe(1)
    const [email] = User.primaries
    expect(email.columns).toEqual(['email'])
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.indexes.length).toBe(1)
    const [email] = User.indexes
    expect(email.columns).toEqual(['email'])
  })

  test('multiple indexes', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.indexes.length).toBe(2)
    const [id, email] = User.indexes
    expect(id.columns).toEqual(['id'])
    expect(email.columns).toEqual(['email'])
  })

  test('named index', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.indexes.length).toBe(1)
    const [myIndex] = User.indexes
    expect(myIndex.name).toBe('myIndex')
    expect(myIndex.columns).toEqual(['email', 'name'])
  })

  test('object index', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.indexes.length).toBe(1)
    const [myIndex] = User.indexes
    expect(myIndex.name).toBe('myIndex')
    expect(myIndex.type).toBe('string')
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.uniques.length).toBe(1)
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.annotations.name).toBe('people')
    expect(User.name).toBe('people')
  })

  test('custom type', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    const [colId] = User.columns
    expect(colId.name).toBe('id')
    expect(colId.annotations.type).toBe('string')
    expect(colId.annotations.length).toBe(36)
    expect(colId.type).toBe('string')
    expect(colId.args).toEqual([36])
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
    expect(adb.tables.length).toBe(2)
    const [User, Message] = adb.tables
    expect(User.name).toBe('user')
    expect(Message.name).toBe('message')
    expect(User.columns.length).toBe(1)
    expect(Message.columns.length).toBe(2)
    const [colId, colUserForeign] = Message.columns
    expect(colId.name).toBe('id')
    expect(colUserForeign.name).toBe('user_foreign')
    expect(colUserForeign.type).toBe('uuid')
    expect(colUserForeign.foreign && colUserForeign.foreign.tableName).toBe('user')
    expect(colUserForeign.foreign && colUserForeign.foreign.columnName).toBe('id')
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
    expect(adb.tables.length).toBe(3)
    const Join = adb.tables[2]
    expect(Join.name).toBe('message_users_join_user_messages')
    const [colMessageUsers, colUserMessages] = Join.columns
    expect(colMessageUsers.name).toBe('users_foreign')
    expect(colMessageUsers.type).toBe('uuid')
    expect(colMessageUsers.foreign && colMessageUsers.foreign.tableName).toBe('message')
    expect(colMessageUsers.foreign && colMessageUsers.foreign.columnName).toBe('id')
    expect(colUserMessages.name).toBe('messages_foreign')
    expect(colUserMessages.type).toBe('uuid')
    expect(colUserMessages.foreign && colUserMessages.foreign.tableName).toBe('user')
    expect(colUserMessages.foreign && colUserMessages.foreign.columnName).toBe('id')
  })

  test('many to many on self', async () => {
    const schema = buildSchema(`
      type User {
        id: ID!
        contacts: [User]
      }
    `)
    const adb = await generateAbstractDatabase(schema)
    expect(adb.tables.length).toBe(2)
    const [User, UserContacts] = adb.tables
    expect(UserContacts.name).toBe('user_contacts_join_user_contacts')
    expect(User.name).toBe('user')
    expect(User.columns.length).toBe(1)
    const [col1, col2] = UserContacts.columns
    expect(col1.name).toBe('id_foreign')
    expect(col1.type).toBe('uuid')
    expect(col1.foreign && col1.foreign.tableName).toBe('user')
    expect(col1.foreign && col1.foreign.columnName).toBe('id')
    expect(col2.name).toBe('id_foreign_other')
    expect(col2.type).toBe('uuid')
    expect(col2.foreign && col2.foreign.tableName).toBe('user')
    expect(col2.foreign && col2.foreign.columnName).toBe('id')
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.name).toBe('user')
    expect(User.columns.length).toBe(2)
    const [colId, colNames] = User.columns
    expect(colId.name).toBe('id')
    expect(colId.type).toBe('uuid')
    expect(colNames.name).toBe('names')
    expect(colNames.type).toBe('json')
  })

  test('custom scalar map', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.columns.length).toBe(2)
    const [colName, colNickname] = User.columns
    expect(colName.type).toBe('text')
    expect(colNickname.type).toBe('string')
  })

  test('map lists to json', async () => {
    const schema = buildSchema(`
      type User {
        names: [String]
      }
    `)
    const adb = await generateAbstractDatabase(schema, {
      mapListToJson: true,
    })
    expect(adb.tables.length).toBe(1)
    const [User] = adb.tables
    expect(User.columns.length).toBe(1)
    const [colNames] = User.columns
    expect(colNames.type).toBe('json')
  })

  test('default name transforms', async () => {
    const schema = buildSchema(`
      type UserTeam {
        id: ID!
        name: String!
        yearlyBilling: Boolean!
      }
    `)
    const adb = await generateAbstractDatabase(schema)
    expect(adb.tables.length).toBe(1)
    const [UserTeam] = adb.tables
    expect(UserTeam.name).toBe('user_team')
    expect(UserTeam.columns.length).toBe(3)
    const [colId, colName, colYearlyBilling] = UserTeam.columns
    expect(colId.name).toBe('id')
    expect(colName.name).toBe('name')
    expect(colYearlyBilling.name).toBe('yearly_billing')
  })

  test('custom name transforms', async () => {
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
    expect(adb.tables.length).toBe(1)
    const [UserTeam] = adb.tables
    expect(UserTeam.name).toBe('FooUserTeam')
    expect(UserTeam.columns.length).toBe(3)
    const [colId, colName, colYearlyBilling] = UserTeam.columns
    expect(colId.name).toBe('bar_id')
    expect(colName.name).toBe('bar_name')
    expect(colYearlyBilling.name).toBe('bar_yearlyBilling')
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
    expect(adb.tables.length).toBe(4)
  })
})
