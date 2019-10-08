import { InputModelTypeContext } from '../../../input/ContextTypes'
import { generateGraphbackResolvers } from './LegacyApolloResolverTemplate';
import { ResolverTypeContext } from './resolverTypes';
import { buildResolverTargetContext, createCustomContext } from './targetResolverContext';

/**
 * generate schema using context created using visitor pattern
 * and string templates
 */
export class LegacyResolverGenerator {
    private context: ResolverTypeContext[]
    private inputContext: InputModelTypeContext[]

    constructor(inputContext: InputModelTypeContext[]) {
      this.inputContext = inputContext
    }

    public generate(database: string) {
      this.context = buildResolverTargetContext(this.inputContext, database)

      const customContext = createCustomContext(this.inputContext)
      const hasCustomElements = !!customContext.length

      return generateGraphbackResolvers(this.context, customContext, hasCustomElements)
    }
  }
