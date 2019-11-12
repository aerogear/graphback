import { InputModelTypeContext } from "@graphback/core"
import { generateGraphbackResolvers } from '../formatters/ApolloResolverFormatter';
import { ResolverTypeContext } from './resolverTypes';
import { buildResolverTargetContext } from './targetResolverContext';

/**
 * Generate resolvers layer that connects with service
 */
export class ApolloServiceResolverGenerator {
    private context: ResolverTypeContext[]
    private inputContext: InputModelTypeContext[]

    constructor(inputContext: InputModelTypeContext[]) {
      this.inputContext = inputContext
    }

    public generate() {
      this.context = buildResolverTargetContext(this.inputContext)

      return generateGraphbackResolvers(this.context, this.inputContext)
    }
  }
