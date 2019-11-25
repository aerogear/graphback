import chalk from 'chalk';
import { DropCreateDatabaseAlways } from 'graphql-migrations-bk';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { connect, createDB, postCommandMessage } from '../helpers'

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  const configInstance = new ConfigBuilder();
  const config = configInstance.config;

  const db = await connect(config.db.database, config.db.dbConfig);

  const initializationStrategy = new DropCreateDatabaseAlways(config.db.database, db);

  await createDB(initializationStrategy)

  postCommandMessage(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
