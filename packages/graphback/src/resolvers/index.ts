import { InputContext, createInputContext } from '../ContextCreator'
import { generateResolvers } from './resolverTemplate';
import { buildResolverTargetContext, TargetResolverContext } from './targetResolverContext';
import { readFileSync } from 'fs';

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class ResolverGenerator {
  private context: TargetResolverContext
  private inputContext: InputContext[]

  constructor(inputContext: InputContext[]) {
    this.inputContext = inputContext
  }

  public generate() {
    this.context = buildResolverTargetContext(this.inputContext)

    return generateResolvers(this.context)
  }  
}