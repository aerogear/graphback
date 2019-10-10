import { InputModelTypeContext } from '../../../input/ContextTypes'

/**
 * Generate source code for resolvers layer using Apollo GraphQL format
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 */
export class LayeredResolverGen {
  private inputContext: InputModelTypeContext[]
  private serviceContext: string

  constructor(inputContext: InputModelTypeContext[], serviceContext: string) {
    this.inputContext = inputContext
    this.serviceContext = serviceContext;
  }

  public generate() {
    const resolvers = {};
    for (const resolverElement of this.inputContext) {
      //TODO 
    }

    return resolvers;
  }
}