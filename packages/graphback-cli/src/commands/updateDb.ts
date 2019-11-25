import chalk from 'chalk';
import { UpdateDatabaseIfChanges } from 'graphql-migrations-bk';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { connect, createDB, postCommandMessage } from '../helpers'

export const command = 'update-db'

export const desc = 'Update the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const db = await connect(config.db.database, config.db.dbConfig);

  const initializationStrategy = new UpdateDatabaseIfChanges(db, config.folders.migrations);

  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources updated.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
