import { ResolverType } from './ResolverType'

/**
 * Defines format for created resolvers
 */
export interface ResolverInstance {

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
   * Name of the type
   * For example User
   */
  typeName: string,


  /**
   * Raw user schema that will be used to generate schema
   */
  schemaDefinition: string,

  /**
   * Type of resolver
   */
  resolverType: 'Mutation' | 'Query',

  /**
   * Type of action for resolver
   */
  action: ResolverType,

  /**
   * String that contains implementation
   * This could be javascript source code, sql query or json
   */
  implementation: string
}
