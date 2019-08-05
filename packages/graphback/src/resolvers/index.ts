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

  public generate(database: string) {
    this.context = buildResolverTargetContext(this.inputContext, database)

    const customContext = createCustomContext(this.inputContext)

    let hasCustomElements = false
    if(customContext.length) {
      hasCustomElements = true
    }

    return {
      types: generateResolvers(this.context),
      index: generateIndexFile(this.context, hasCustomElements),
      custom: generateCustomResolvers(customContext)
    }
  }  
}