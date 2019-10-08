import chalk from 'chalk';
import { UpdateDatabaseIfChanges } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage } from '../helpers'

export const command = 'update-db'

export const desc = 'Update the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const initializationStrategy = new UpdateDatabaseIfChanges({ client: config.db.database, connectionOptions: config.db.dbConfig });
  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources updated.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
