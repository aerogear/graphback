import { InputModelTypeContext } from "@graphback/core"
import { ResolverTypeContext } from './api/resolverTypes';
import { buildResolverTargetContext } from './api/targetResolverContext';
import { generateGraphbackResolvers } from './formatters/ApolloResolverFormatter';

/**
 * Generate resolvers layer that connects with service
 */
export class ApolloServiceResolverGenerator {
    private context: ResolverTypeContext[]
    private inputContext: InputModelTypeContext[]

    constructor(inputContext: InputModelTypeContext[]) {
      this.inputContext = inputContext
    }

    public generate(database: string) {
      this.context = buildResolverTargetContext(this.inputContext)

      return generateGraphbackResolvers(this.context, this.inputContext)
    }
  }
