import { transformOpenApiSpec } from '../components'

export const command = 'openapi'

export const desc = 'Generate GraphQL schema and resolvers based on OpenAPI spec'

export const builder = {}

export async function handler() {
  await transformOpenApiSpec();
}
