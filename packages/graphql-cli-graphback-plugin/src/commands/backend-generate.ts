import { generate } from 'graphback-cli'
import { commandRoot } from '../commandRoot'

export const command = 'backend-generate'

export const desc = 'Generate GraphQL schema and resolvers'

export const builder = {}

export async function handler() {
  await generate(commandRoot)
}