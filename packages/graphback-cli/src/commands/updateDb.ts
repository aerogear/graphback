import chalk from 'chalk';
import { InputModelProvider, KnexMigrationProvider, UpdateDatabaseIfChanges } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { connect, createDB, postCommandMessage } from '../helpers'

export const command = 'update-db'

export const desc = 'Update the database schema'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const schemaProvider = new InputModelProvider(config.folders.model);

  const db = await connect(config.db.database, config.db.dbConfig);

  const initializationStrategy = new UpdateDatabaseIfChanges(db, config.folders.migrations);

  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources updated.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
