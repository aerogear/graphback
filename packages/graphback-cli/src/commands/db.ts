import { createDB } from '../components'
import { logInfo } from '../utils';

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  await createDB();

  logInfo(`Database resources created.`)

  process.exit(0);
}
