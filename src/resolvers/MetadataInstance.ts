import { ResolverType } from './ResolverType'

/**
 * Defines format for created resolvers
 */
// FIXME maybe diferent name - this is not resolver specific
/// GeratorMEtadataInstance
export interface MetadataInstance {

  /**
   * Name of filed that should be used for this resolver.
   * For example for:
   *
   * type Query {
   *  getUser: User!
   * }
   *
   * Field name will be getUser
   */
  fieldName: string,

  /**
   * Raw user schema that will be used to generate schema
   */
  schemaDefinition: string,

  /**
   * String that contains implementation
   * This could be javascript source code, sql query or json
   */
  implementation: string
}


export interface MetadataFormat {
  query: MetadataInstance[]
  mutation: MetadataInstance[]
}
