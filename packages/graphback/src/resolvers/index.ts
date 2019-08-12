import { Type } from '../ContextTypes'
import { buildResolverTargetContext, createCustomContext, TypeContext } from './knex/targetResolverContext';
import { generateGraphbackResolvers } from './outputResolvers/resolverTemplate';

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

  public generate(database: string) {
    this.context = buildResolverTargetContext(this.inputContext, database)

    const customContext = createCustomContext(this.inputContext)

    let hasCustomElements = false
    if(customContext.length) {
      hasCustomElements = true
    }

    return generateGraphbackResolvers(this.context, customContext, hasCustomElements)
  }  
}