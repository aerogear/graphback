# Cookbook

Schema annotations are parsed using [graphql-annotations](https://github.com/Akryum/graphql-annotations).

## Simple type with comments

```graphql
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
```

## Skip table or field

```graphql
"""
@db.skip
"""
type MutationResult {
  success: Boolean!
}

type OtherType {
  id: ID!
  """
  @db.skip
  """
  computedField: String
}
```

## Rename

```graphql
"""
@db.oldNames: ['user']
"""
type People {
  id: ID!

  """
  @db.oldNames: ['name']
  """
  nickname: String!
}
```

## Not null field

```graphql
type User {
  """
  Not null
  """
  name: String!

  """
  Nullable
  """
  nickname: String
}
```

## Default field value

```graphql
type User {
  """
  @db.default: true
  """
  someOption: Boolean
}
```

## Default primary index

By default, `id` fields of type `ID` will be the primary key on the table:

```graphql
type User {
  """
  This will get a primary index
  """
  id: ID!
  email: String!
}
```

In this example, no primary key will be generated automatically:

```graphql
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
```

You can disable the automatic primary key:

```graphql
type User {
  """
  @db.primary: false
  """
  id: ID!

  email: String!
}
```

## Primary key

In this example, the primary key will be on `email` instead of `id`:

```graphql
type User {
  id: ID!

  """
  @db.primary
  """
  email: String!
}
```

## Simple index

```graphql
type User {
  id: ID!

  """
  @db.index
  """
  email: String!
}
```

## Multiple index

```graphql
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
```

## Named index

```graphql
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
```

You can also specify an index type on PostgresSQL or MySQL:

```graphql
type User {
  """
  @db.index: { name: 'myIndex', type: 'hash' }
  """
  email: String!

  """
  You don't need to specify the type again.
  @db.index: 'myIndex'
  """
  name: String!
}
```

## Unique constraint

```graphql
type User {
  id: ID!
  """
  @db.unique
  """
  email: String!
}
```

## Custom name

```graphql
"""
@db.name: 'people'
"""
type User {
  """
  @db.name: 'uuid'
  """
  id: ID!
}
```

## Custom column type

```graphql
type User {
  """
  @db.type: 'string'
  @db.length: 36
  """
  id: ID!
}
```

See [knex schema builder methods](https://knexjs.org/#Schema-increments) for the supported types.

## Simple list

```graphql
type User {
  id: ID!

  """
  @db.type: 'json'
  """
  names: [String]
}
```

You can set the `mapListToJson` option to automatically map scalar and enum lists to JSON:

```js
const schema = buildSchema(`
  type User {
    names: [String]
  }
`)
const adb = await generateAbstractDatabase(schema, {
  mapListToJson: true,
})
```

## Foreign key

```graphql
type User {
  id: ID!
  messages: [Message]
}

type Message {
  id: ID!
  user: User
}
```

This will create the following tables:

```js
{
  user: {
    id: uuid primary
  },
  message: {
    id: uuid primary
    user_foreign: uuid foreign key references 'user.id'
  }
}
```

## Many-to-many

```graphql
type User {
  id: ID!
  """
  @db.manyToMany: 'users'
  """
  messages: [Message]
}

type Message {
  id: ID!
  """
  @db.manyToMany: 'messages'
  """
  users: [User]
}
```

This will create an additional join table:

```js
{
  message_users_join_user_messages: {
    users_foreign: uuid foreign key references 'message.id',
    messages_foreign: uuid foreign key references 'user.id',
  }
}
```

## Many-to-many on same type

```graphql
type User {
  id: ID!
  contacts: [User]
}
```

This will create an additional join table:

```js
{
  user_contacts_join_user_contacts: {
    id_foreign: uuid foreign key references 'user.id',
    id_foreign_other: uuid foreign key references 'user.id',
  }
}
```
