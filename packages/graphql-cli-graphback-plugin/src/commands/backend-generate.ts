import { generate } from 'graphback-cli'
import { CLI_NAME } from '../cliName'

export const command = 'backend-generate'

export const desc = 'Generate schema and resolvers'

export const builder = {}

export async function handler() {
  await generate(CLI_NAME)
}