import { parseMetadata } from 'graphql-metadata'

/**
 * Wraps `parseMetadata` to return empty object instead of undefined if no annotation is found.
 *
 * This is a compatibility function to ensure an empty object is r
 * returned when there is no annotationn as graphql-migrations assumes an empty object will be
 * returned and does not do any conditional checking for undefined annotation. This is because
 * `parseAnnotations` (deprecated) from grapqhl-metadata returns an empty object, but parseMetadata
 * returns undefined.
 *
 * Do not use this for new features
 *
 * @param namespace
 * @param description
 */
export function parseAnnotationsCompat(namespace: string, description: string): any {
  const annotation = parseMetadata(namespace, description) || {}

  return annotation
}
