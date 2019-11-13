import chalk from 'chalk';
import { DropCreateDatabaseAlways, InputModelProvider, KnexMigrationProvider } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage, connect } from '../helpers'

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const schemaProvider = new InputModelProvider(config.folders.migrations);

  const db = await connect(config.db.database, config.db.dbConfig);

  const migrationProvider = new KnexMigrationProvider(db, config.folders.migrations);

  const initializationStrategy = new DropCreateDatabaseAlways({
    db,
    schemaProvider,
    migrationProvider
  });

  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
