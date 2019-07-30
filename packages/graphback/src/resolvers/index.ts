import { Type } from '../ContextTypes'
import { buildResolverTargetContext, TypeContext } from './knex/targetResolverContext';
import { generateIndexFile, generateResolvers } from './outputResolvers/apollo';

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

    return {
      resolvers: generateResolvers(this.context),
      index: generateIndexFile(this.context)
    }
  }  
}