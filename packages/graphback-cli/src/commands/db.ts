import chalk from 'chalk';
import { DropCreateDatabaseAlways, InputModelProvider } from 'graphback'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage } from '../helpers'

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const schemaProvider = new InputModelProvider(config.folders.migrations, config.folders.model);

  const initializationStrategy = new DropCreateDatabaseAlways({
    client: config.db.database,
    connectionOptions: config.db.dbConfig,
    schemaProvider
  });

  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
