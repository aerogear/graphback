import knex from 'knex'
import * as config from '../graphback.json'

export async function connect(options: knex.MySqlConnectionConfig) {
  return knex({
    client: config.db.database,
    connection: options
  })
}
