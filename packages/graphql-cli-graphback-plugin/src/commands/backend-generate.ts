import { generate } from 'graphback-cli'

export const command = 'backend generate'

export const desc = 'Generate schema and resolvers'

export const builder = {}

export async function handler() {
  await generate()
}