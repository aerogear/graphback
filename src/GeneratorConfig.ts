
/**
 *  Configuration options for generator.
 *  Represents configuration options supported by generator
 */
export interface GeneratorConfig {

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
  createDatabase?: boolean

  /**
   * Project namespace used to generate database and resolver queries.
   * For example: `myproject`
   */
  namespace?: string
}

/**
 * Default configuration
 */
export const defaultConfig: GeneratorConfig = {
  createDatabase: true,
  generateGraphQLSchema:true,
  includePagination:true,
  generateInputTypes: true
}
