import { Type } from '../ContextTypes'
import { buildResolverTargetContext, createCustomContext, TypeContext } from './knex/targetResolverContext';
import { generateCustomResolvers, generateIndexFile, generateResolvers } from './outputResolvers/apollo';

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

  public generate() {
    this.context = buildResolverTargetContext(this.inputContext)

    const customContext = createCustomContext(this.inputContext)

    let hasCustomElements = false
    if(customContext.queries.length || customContext.mutations.length || customContext.subscriptions.length) {
      hasCustomElements = true
    }

    return {
      resolvers: generateResolvers(this.context),
      index: generateIndexFile(this.context, hasCustomElements),
      custom: generateCustomResolvers(customContext)
    }
  }  
}