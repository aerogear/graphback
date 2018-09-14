
/**
 * Configuration options for generator
 */
export interface IGraphQLConfig {

  /**
   * Generate human readable schema
   */
  generateGraphQLSchema?: boolean,

  /**
   * Support pagination for this type
   */
  includePagination?: boolean,

  /**
   * Generate input types for queries and mutations
   */
  generateInputTypes?: boolean

  /**
   * Create database schema
   */
  createDatabaseSchema?: boolean
}
