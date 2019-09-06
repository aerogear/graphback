import { commandRoot } from '../commandRoot'
import { generate, transformOpenApiSpec } from '../helpers'

export const command = 'openapi'

export const desc = 'Generate GraphQL schema and resolvers based on Open Api spec'

export const builder = {}

export async function handler() {
  await transformOpenApiSpec();
  await generate(commandRoot)
}