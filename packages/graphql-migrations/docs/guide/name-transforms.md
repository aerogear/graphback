# Name transforms

You can customize the way table and column names are transformed before being applied to the database with the `transformTableName` and `transformColumnName` options.

By default, they will convert the table and column names to Snake case:

```js
import Case from 'case'

migrate(nkexConfig, schema, {
  transformTableName: (name, direction) => {
    if (direction === 'to-db') {
      return Case.snake(name)
    }
    return name
  },
  transformColumnName: (name, direction) => {
    if (direction === 'to-db') {
      return Case.snake(name)
    }
    return name
  },
})
```

For example, let's consider this schema:

```graphql
type UserTeam {
  id: ID!
  name: String!
  yearlyBilling: Boolean!
}
```

We will create a `user_team` table with those columns:

- `id`
- `name`
- `yearly_billing`

## Usage with Knex

Since by default table and columns names will be transformed to `snake_case`, you may want to automatically convert the names when using knex for your GraphQL API.

Here is some knex configuration you'll need to do:

```js
import Case from 'case'

export const knex = Knex({
  /* Knex config here ... */

  // Convert identifiers to snake_case
  wrapIdentifier: (value, origImpl, queryContext) => origImpl(Case.snake(value)),

  // Convert column names back to camelCase
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map((row: any) => convertColumns(row))
    } else {
      return convertColumns(result)
    }
  },
})

function convertColumns (row: any) {
  const result: any = {}
  for (const key of Object.keys(row)) {
    result[Case.camel(key)] = row[key]
  }
  return result
}
```

::: warning
Don't apply those to the same Knex configuration object as `migrate`.
:::

Considering the example schema we had in the previous section, here is an example query that inserts a `UserTeam` object to the DB:

```js
await knex.table('UserTeam').insert({
  id: '34211bef-6815-4b49-958a-f89b24449958',
  name: 'Acme',
  yearlyBilling: false,
})
```

Knex will then execute the following SQL query:

```sql
INSERT INTO 'user_team' ('id', 'name', 'yearly_billing')
VALUES ('34211bef-6815-4b49-958a-f89b24449958', 'Acme', false);
```

Then we can query the data like this:

```js
await knex.table('UserTeam')
  .where('id', '34211bef-6815-4b49-958a-f89b24449958')
  .first()
```

Which will return:

```json
{
  "id": "34211bef-6815-4b49-958a-f89b24449958",
  "name": "Acme",
  "yearlyBilling": false
}
```
