import knex from 'knex'
import * as config from '../config.json'

export async function connect(options: knex.MySqlConnectionConfig) {
  return knex({
    client: config.database,
    connection: options
  })
}
