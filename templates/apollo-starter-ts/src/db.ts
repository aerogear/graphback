import * as knex from 'knex'

export async function connect(options: object) {
  return knex({
    client: 'pg',
    connection: options
  })
}
