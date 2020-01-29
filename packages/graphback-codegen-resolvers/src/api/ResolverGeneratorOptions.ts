export interface ResolverGeneratorOptions {
  //output format
  format: 'ts' | 'js'

  //Provides extension for graphql-code-generator types
  //generated for resolvers
  types?: {
    /**
     * Name of the resolver import
     * For example `Resolvers`
     */
    resolverRootType: string

    /**
     * Relative location for root resolver typings.
     * For example: '../../types'
     */
    resolverRootLocation: string
  }
}
