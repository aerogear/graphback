import { Type } from '../ContextTypes'
import { generateResolvers } from './resolverTemplate';
import { buildResolverTargetContext, TargetResolverContext } from './targetResolverContext';

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class ResolverGenerator {
  private context: TargetResolverContext
  private inputContext: Type[]

  constructor(inputContext: Type[]) {
    this.inputContext = inputContext
  }

  public generate() {
    this.context = buildResolverTargetContext(this.inputContext)

    return generateResolvers(this.context)
  }  
}