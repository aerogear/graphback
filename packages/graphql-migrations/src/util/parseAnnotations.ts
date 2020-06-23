import { parseMetadata } from 'graphql-metadata'

/**
 * Wraps `parseMetadata` to return empty object instead of undefined
 * As lots of graphql-migration uses this.
 * 
 * @param namespace
 * @param description
 */
export function parseAnnotations(namespace: string, description: string): any {
  const annotation = parseMetadata(namespace, description) || {}

  return annotation
}
