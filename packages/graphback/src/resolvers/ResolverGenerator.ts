import { MetadataFormat } from './MetadataInstance';

/**
 * Generate Typescript compatible schema
 */
export class GraphQLResolverGenerator {

  /**
   * Generate Typescript compatible schema
   * @param resolvers Array of MetadataInstance
   */
  public generateResolvers(resolvers: MetadataFormat): string {
    let queryResolvers = resolvers.query.map(value => value.implementation)
    let mutationResolvers = resolvers.mutation.map(value => value.implementation)
    let queryString = queryResolvers.join(',\n')
    let mutationString = mutationResolvers.join(',\n')
    
    return this.generateString(queryString, mutationString)
  }
  /**
   * 
   * @param queryString joined query resolvers as a string
   * @param mutationString joined mutation resolvers as a string
   */
  public generateString(queryString, mutationString) {
    return `export const resolvers = {
      Query: {
        ${queryString}
      },
      Mutation: {
        ${mutationString}
      },
    }`
  }
}