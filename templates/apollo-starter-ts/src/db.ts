import knex = require('knex')

export async function connect(options) {
  const db = knex({
    client: 'pg',
    connection: options
  })
  return db
}
