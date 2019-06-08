import { MetadataFormat, MetadataInstance } from './MetadataInstance';

/**
 * Generate Typescript compatible schema
 */
export class GraphQLResolverGenerator {

  /**
   * Generate Typescript compatible schema
   * @param resolvers Array of MetadataInstance
   */
  public generateResolvers(resolvers: MetadataFormat): string {
// tslint:disable-next-line: typedef
    const queryResolvers = resolvers.query.map(value => value.implementation)
// tslint:disable-next-line: typedef
    const mutationResolvers = resolvers.mutation.map(value => value.implementation)
    const queryString = queryResolvers.join(',\n')
    const mutationString = mutationResolvers.join(',\n')
    
    return this.generateString(queryString, mutationString)
  }
  /**
   * 
   * @param queryString joined query resolvers as a string
   * @param mutationString joined mutation resolvers as a string
   */
  public generateString(queryString: string, mutationString: string) {
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