import { getFieldName, getTableName, ResolverType } from '../../..'
import { Type } from '../../../input/ContextTypes'
import { TypeContext } from '../api'
import { generateGraphbackResolvers } from '../formatters/ApolloResolverTemplate'
import { buildResolverTargetContext, createCustomContext } from '../legacy-knex/targetResolverContext'

/**
 * Generate runtime resolver layer using Apollo GraphQL format 
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 */
export class ServiceTSResolverGen {
  private inputContext: Type[]
  private serviceContext: string

  constructor(inputContext: Type[], serviceContext: string) {
    this.inputContext = inputContext
    this.serviceContext = serviceContext;
  }

  public generate() {
    const resolvers = {};
    // FIXME implement more cases here
    // Supports create only for the moment
    for (const resolverElement of this.inputContext) {
      // TODO
    }
    
    return resolvers;
  }
}