import { Type } from '../../../input/ContextTypes'
import { TypeContext } from '../api';
import { generateGraphbackResolvers } from '../formatters/ApolloResolverTemplate';
import { buildResolverTargetContext, createCustomContext } from './targetResolverContext';

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class LegacyResolverGenerator {
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
