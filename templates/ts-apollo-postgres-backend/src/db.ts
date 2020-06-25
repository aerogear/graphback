import Knex from 'knex'

export function loadDBConfig() {
  let port;
  if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT, 10)
  }
  return {
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: port && !isNaN(port) ? port : 5432
    },
    pool: { min: 5, max: 30 }
  };
}

export function connectDB() {
  const dbConfig = loadDBConfig()
  const db = Knex(dbConfig)

  return db
}
