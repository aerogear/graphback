---
id: plugins
title: Custom logic with Plugins
sidebar_label: Plugins
---

It's possible to write custom queries to be executed during migrations using Plugins.

Currently a plugin can only declare tap on the Writer system, with the `write` and `tap` methods:

```ts
import { MigratePlugin, WriteParams } from 'graphql-migrations'

class MyPlugin extends MigratePlugin {
  write ({ tap }: WriteParams) {
    tap('op-type', 'before', (op: any, transaction: any) => {
      // or 'after'
    })

    return true;
  }
}
```

The arguments are:

- `operation: string`, can be one of the following:
  - `table.create`
  - `table.rename`
  - `table.comment.set`
  - `table.drop`
  - `table.index.create`
  - `table.index.drop`
  - `table.primary.set`
  - `table.primary.drop`
  - `table.unique.create`
  - `table.unique.drop`
  - `table.foreign.create`
  - `table.foreign.drop`
  - `column.create`
  - `column.rename`
  - `column.alter`
  - `column.drop`
- `type: 'before' | 'after'`
- `callback: function` which get those parameters:
  - `operation`: the operation object (see [Operation.ts](https://github.com/aerogear/graphback/blob/master/packages/graphql-migrations/src/diff/Operation.ts))
  - `transaction`: the [Knex SQL transaction](http://knexjs.org/#Transactions)

Then, instantiate the plugin in the `plugins` option array of the `migrateDB` method.

For example, let's say we have the following schema:

```graphql
"""
@model
"""
type User {
  id: ID!
  fname: String
  lname: String
}
```

Now we want to migrate the `user` table from two columns `fname` and `lname` into one:

```ts
fullname = fname + ' ' + lname
```

Here is the example code to achieve this:

```ts
import { migrateDB, MigratePlugin, WriteParams } from 'graphql-migrations';

const schema = `
"""
@model
"""
type User {
  id: ID!

  """
  db(oldNames: ['lname'])
  """ 
  fullname: String
}
`;

class MyPlugin implements MigratePlugin {
  write ({ tap }: WriteParams) {
    tap('column.drop', 'before', async (op: any, transaction: any) => {
      // Check the table and column
      if (op.table === 'user' && op.column === 'fname') {
        // Update the users lname with fname + ' ' + lname
        const users = await transaction
          .select('id', 'fname', 'lname')
          .from('user');
        for (const user of users) {
          await transaction('user')
            .where({ id: user.id })
            .update({
              lname: `${user.fname} ${user.lname}`
            })
        }
      }
    })

    return true;
  }
}

const dbConfig = {
    // Knex database configuration
}

migrateDB(dbConfig, schema, {
  plugins: [
    new MyPlugin(),
  ]
})
```

The above code does the following:

- Remove the `fname` field from the schema.
- Rename `lname` to `fullname` in the schema.
- Annotate the `fullname` field to indicate it's the new name of `lname`.
- We declare a plugin that tap into the `column.drop` write operation.
- In this hook, we read the users and update each one of them to merge the two columns into `lname` before the `fname` column is dropped.
