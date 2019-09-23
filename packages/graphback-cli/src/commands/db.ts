import { createDB } from '../helpers'

export const command = 'db'

export const desc = 'Create database resources'

export const builder = {}

export async function handler() {
  await createDB()
  process.exit(0);
}