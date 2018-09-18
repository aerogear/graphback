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
  fieldName: String,

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
  implementation: String
}
