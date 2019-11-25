# Getting started

GraphQL Migrate automatically create/update tables and columns from a GraphQL schema.

## Installation

```bash
npm i graphql-migrations
```

Or using yarn:

```bash
yarn add graphql-migrations
```

## Basic Usage

The `migrate` methods is able to create and update tables and columns. It will execute those steps:

- Read your database and construct an abstraction.
- Read your GraphQL schema and turn it to an equivalent abstraction.
- Compare both abstractions and generate database operations.
- Convert to SQL and execute the queries from operations using [knex](https://knexjs.org).

All the operations executed on the database will be wrapped in a transaction: if an error occurs, it will be fully rollbacked to the initial state.

```js
import { buildSchema } from 'graphql'
import { migrate } from 'graphql-migrations'

const config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'some-user',
    password: 'secret-password',
    database: 'my-app',
  },
}

const schema = buildSchema(`
type User {
  id: ID!
  name: String
  messages: [Message]
  contacts: [User]
}

type Message {
  id: ID!
  user: User
}
`)

migrate(config, schema, {
  // Additional options here
}).then(() => {
  console.log('Your database is up-to-date!')
})
```
