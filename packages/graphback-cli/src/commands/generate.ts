import { generate } from '../helpers/generate'

export const command = 'generate'

export const desc = 'Generate schema and resolvers'

export const builder = {}

export async function handler() {
  await generate()
}