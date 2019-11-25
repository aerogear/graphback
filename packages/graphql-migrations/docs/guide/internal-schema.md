# Internal types and fields

You may want to have internal types and fields that shouldn't be exposed on the GraphQL API. To accomplish this, you can make two different GraphQL schemas:

- The first one only have the public types and fields.
- The second one also have the internal types and fields and will only be used to migrate the database.

Here is an example with Apollo Server:

```js
import { makeExecutableSchema } from 'apollo-server'

const publicTypeDefs = [
  gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    user (id: ID!): User
  }
  `,
]

const resolvers = {
  Query: {
    user: () => { /* ... */ },
  },
}

// Not exposed in final API
const internalTypeDefs = [
  gql`
  extend type User {
    encryptedPassword: String!
  }
  `,
]

// For Database only
const dbSchema = makeExecutableSchema({
  typeDefs: publicTypeDefs.concat(...internalTypeDefs),
})

const ops = await migrate(knexConfig, dbSchema)
console.log(`Migrated DB (${ops.length} ops).`)

// For Apollo server
const schema = makeExecutableSchema({
  typeDefs: publicTypeDefs,
  resolvers,
})
```
