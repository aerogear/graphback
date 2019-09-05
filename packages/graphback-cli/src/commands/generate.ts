import { CLI_NAME } from '../cliName'
import { generate } from '../helpers'

export const command = 'generate'

export const desc = 'Generate schema and resolvers'

export const builder = {}

export async function handler() {
  await generate(CLI_NAME)
}