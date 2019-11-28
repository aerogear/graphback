import chalk from 'chalk';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { createDB, postCommandMessage } from '../helpers'

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  await createDB();

  postCommandMessage(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)

  process.exit(0);
}
