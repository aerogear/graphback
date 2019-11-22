export interface ResolverGeneratorOptions {
  // output format
  format: 'ts' | 'js'

  // Provides extension for graphql-code-generator types
  // generated for resolvers
  types?: {
    /**
     * for example `Resolvers`
     */
    resolverType: string

    /**
     * For example: 
     * import { Resolvers } from '../dist/types
     */
    typesImportStatement: string
  }

}
