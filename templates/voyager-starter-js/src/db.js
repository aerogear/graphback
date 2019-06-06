const knex = require('knex')

async function connect(options) {
  const db = knex({
    client: 'pg',
    connection: options
  })
  return db
}

module.exports = connect
