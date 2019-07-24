import knex from 'knex'

export async function connect(options: knex.MySqlConnectionConfig) {
  return knex({
    client: 'pg',
    connection: options
  })
}
