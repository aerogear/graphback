import { loadConfig } from 'graphql-config';
import Knex from 'knex';

export async function getProjectConfig() {
  const config = await loadConfig({
    rootDir: process.cwd(),
    extensions: [
      () => ({ name: 'graphback' }),
      () => ({ name: 'dbmigrations' })
    ]
  });

  if (!config) {
    throw new Error("Can't load GraphQL Config");
  }

  return config.getDefault()
}

export function createDB() {
  let port;
  if (process.env.DB_PORT) {
    port = parseInt(process.env.DB_PORT, 10)
  }

  return Knex({
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: port && !isNaN(port) ? port : 55432
    }
  })
}
