import { Type } from 'graphql-codegen-core';
import { DatabaseContextProvider } from '../datasource/DatabaseContextProvider';
import { logger } from '../logger';
import { MetadataFormat } from './MetadataInstance'
import { ResolverBuilder } from './ResolverBuilder';
import { ResolverType } from './ResolverType'

/**
 * Manager interface responsible for creating resolvers for specified types
 */
export interface ResolverManager {
  /**
   * Build resolvers for specified graphql types
   *
   * @param context database context
   * @param types types that should be source for generating resolvers
   * @param resolverTypes determines what resolvers should be generated
   *
   * Limitation: Method do allows only to define ResolverType's for all GraphQL object
   * which means that the same operations will be generated for all the types
   */
  build(context: DatabaseContextProvider, types: Type[], resolverTypes: ResolverType[]): Promise<MetadataFormat>
}

/**
 * Resolver that builds queries using knex library
 */
export class KnexResolverManager implements ResolverManager {

  private builder: ResolverBuilder;

  /**
   * Creates resolver manager for knex
   *
   * @param argumentContext context for generated arguments
   * @param knexContext name of knex object that was exposed
   * @param prefix table prefix
   */
  constructor(argumentContext: string = 'args', knexContext: string = 'context.db') {
    this.builder = new ResolverBuilder(argumentContext, knexContext);
  }

  public build(context: DatabaseContextProvider, types: Type[], resolverTypes: ResolverType[]): Promise<MetadataFormat> {
    this.builder.setContext(context);
    const resolverFormats: MetadataFormat = {
      query: [],
      mutation: []
    };
    types.forEach((gqlType: Type) => {
      resolverTypes.forEach((resolverType: ResolverType) => {
        if (resolverType === ResolverType.FIND_ALL) {
          resolverFormats.query.push(this.builder.buildFindAll(gqlType));
        } else if (resolverType === ResolverType.CREATE) {
          resolverFormats.mutation.push(this.builder.buildCreate(gqlType));
        } else if (resolverType === ResolverType.READ) {
          resolverFormats.query.push(this.builder.buildRead(gqlType));
        } else if (resolverType === ResolverType.FIND) {
          resolverFormats.query.push(this.builder.buildFind(gqlType));
        } else if (resolverType === ResolverType.UPDATE) {
          resolverFormats.mutation.push(this.builder.buildUpdate(gqlType));
        } else if (resolverType === ResolverType.DELETE) {
          resolverFormats.mutation.push(this.builder.buildDelete(gqlType));
        } else {
          logger.error(`Unsupported format when generating resolver ${gqlType.name.toLowerCase()} for resolver type ${resolverType} `)
        }
      })
    })

    return Promise.resolve(resolverFormats);
  }



}
