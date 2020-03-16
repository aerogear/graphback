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
  expect(adb.tables.length).toEqual(0);
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.name).toEqual('user');
  expect(User.comment).toEqual('A user.');
  expect(User.columns.length).toEqual(2);
  const [colId, colName] = User.columns
  expect(colId.name).toEqual('id');
  expect(colId.type).toEqual('increments');
  expect(colName.name).toEqual('name');
  expect(colName.type).toEqual('string');
  expect(colName.comment).toEqual('Display name.');
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
  expect(adb.tables.length).toEqual(0);
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.name).toEqual('user');
  expect(User.columns.length).toEqual(1);
  const [colId] = User.columns
  expect(colId.name).toEqual('id');
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.columns.length).toEqual(3);
  const [_, colName, colNickname] = User.columns
  expect(colName.nullable).toBeFalsy();
  expect(colNickname.nullable).toBeTruthy();
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
  expect(colSomeOption.defaultValue).toBeTruthy();
  expect(colThatOption.defaultValue).toBeFalsy();
  expect(colThisOption.defaultValue).toEqual('');
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.primaries.length).toEqual(1);
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.indexes.length).toEqual(1);
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.indexes.length).toEqual(2);
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.indexes.length).toEqual(1);
  const [myIndex] = User.indexes
  expect(myIndex.name).toEqual('myIndex');;
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.indexes.length).toEqual(1);
  const [myIndex] = User.indexes
  expect(myIndex.name).toEqual('myIndex');
  expect(myIndex.type).toEqual('string');
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.uniques.length).toEqual(1);
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
  expect(adb.tables.length).toEqual(1)
  const [User] = adb.tables
  expect(User.annotations.name).toEqual('people')
  expect(User.name).toEqual('people')
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
  expect(adb.tables.length).toEqual(1)
  const [User] = adb.tables
  const [_, colName] = User.columns
  expect(colName.name).toEqual('name')
  expect(colName.annotations.type).toEqual('string')
  expect(colName.annotations.length).toEqual(36)
  expect(colName.type).toEqual('string')
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
  expect(adb.tables.length).toEqual(2)
  const [User, Message] = adb.tables
  expect(User.name).toEqual('user')
  expect(Message.name).toEqual('message')
  expect(User.columns.length).toEqual(1)
  expect(Message.columns.length).toEqual(2)
  const [colId, colUserForeign] = Message.columns
  expect(colId.name).toEqual('id')
  expect(colUserForeign.name).toEqual('userId')
  expect(colUserForeign.type).toEqual('integer')
  expect(colUserForeign.foreign && colUserForeign.foreign.tableName === 'user').toBeTruthy()
  expect(colUserForeign.foreign && colUserForeign.foreign.columnName === 'id').toBeTruthy()
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
  expect(adb.tables.length).toEqual(3)
  const Join = adb.tables[2]
  expect(Join.name).toEqual('message_users_join_user_messages');
  const [colMessageUsers, colUserMessages] = Join.columns
  expect(colMessageUsers.name).toEqual('usersId')
  expect(colMessageUsers.type).toEqual('integer')
  expect(colMessageUsers.foreign && colMessageUsers.foreign.tableName === 'message').toBeTruthy()
  expect(colMessageUsers.foreign && colMessageUsers.foreign.columnName === 'id').toBeTruthy()
  expect(colUserMessages.name).toEqual('messagesId')
  expect(colUserMessages.type).toEqual('integer')
  expect(colUserMessages.foreign && colUserMessages.foreign.tableName === 'user').toBeTruthy()
  expect(colUserMessages.foreign && colUserMessages.foreign.columnName === 'id').toBeTruthy()
})

test('many to many on self', async () => {
  const schema = buildSchema(`
      type User {
        id: ID!
        contacts: [User]
      }
    `)
  const adb = await generateAbstractDatabase(schema)
  expect(adb.tables.length).toEqual(2)
  const [User, UserContacts] = adb.tables
  expect(UserContacts.name).toEqual('user_contacts_join_user_contacts')
  expect(User.name).toEqual('user')
  expect(User.columns.length).toEqual(1)
  const [col1, col2] = UserContacts.columns
  expect(col1.name).toEqual('idId')
  expect(col1.type).toEqual('integer')
  expect(col1.foreign && col1.foreign.tableName === 'user').toBeTruthy()
  expect(col1.foreign && col1.foreign.columnName === 'id').toBeTruthy()
  expect(col2.name).toEqual('idId_other')
  expect(col2.type).toEqual('integer')
  expect(col2.foreign && col2.foreign.tableName === 'user').toBeTruthy()
  expect(col2.foreign && col2.foreign.columnName === 'id').toBeTruthy()
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
  expect(adb.tables.length).toEqual(1);
  const [User] = adb.tables
  expect(User.name).toEqual('user');
  expect(User.columns.length).toEqual(2);
  const [colId, colNames] = User.columns
  expect(colId.name).toEqual('id');
  expect(colId.type).toEqual('increments');
  expect(colNames.name).toEqual('names');
  expect(colNames.type).toEqual('json');
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
  expect(adb.tables.length).toEqual(1)
  const [User] = adb.tables
  expect(User.columns.length).toEqual(3)
  const [colId, colName, colNickname] = User.columns
  expect(colId.type).toEqual('increments')
  expect(colName.type).toEqual('text')
  expect(colNickname.type).toEqual('string')
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
  expect(adb.tables.length).toEqual(1)
  const [User] = adb.tables
  expect(User.columns.length).toEqual(2)
  const [_, colNames] = User.columns
  expect(colNames.type).toEqual('json')
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
  expect(adb.tables.length).toEqual(1)
  const [UserTeam] = adb.tables
  expect(UserTeam.name).toEqual('userteam')
  expect(UserTeam.columns.length).toEqual(3)
  const [colId, colName, colYearlyBilling] = UserTeam.columns
  expect(colId.name).toEqual('id')
  expect(colName.name).toEqual('TeamName')
  expect(colYearlyBilling.name).toEqual('yearlyBilling')
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
  expect(adb.tables.length).toEqual(4);
  expect(adb.tables).toMatchSnapshot();
})
