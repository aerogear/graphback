import { Type } from '../ContextTypes'
import { buildResolverTargetContext, createCustomContext, TypeContext } from './knex/targetResolverContext';
import { generateApolloResolvers } from './outputResolvers/apollo';
import { generateGraphQLjsResolvers } from './outputResolvers/graphql-js';

export interface OutputResolver {
  name: string
  output: string
}

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class ResolverGenerator {
  private context: TypeContext[]
  private inputContext: Type[]

  constructor(inputContext: Type[]) {
    this.inputContext = inputContext
  }

  public generate(database: string, templateType: string) {
    this.context = buildResolverTargetContext(this.inputContext, database)

    const customContext = createCustomContext(this.inputContext, templateType)

    let hasCustomElements = false
    if(customContext.length) {
      hasCustomElements = true
    }

    if(templateType === 'graphql-js') {
      return generateGraphQLjsResolvers(this.context, customContext, hasCustomElements)
    } else {
      return generateApolloResolvers(this.context, customContext, hasCustomElements)
    }
  }  
}