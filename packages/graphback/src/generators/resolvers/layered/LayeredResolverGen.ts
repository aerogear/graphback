import { Type } from '../../../input/ContextTypes'

/**
 * Generate source code for resolvers layer using Apollo GraphQL format
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 */
export class LayeredResolverGen {
  private inputContext: Type[]
  private serviceContext: string

  constructor(inputContext: Type[], serviceContext: string) {
    this.inputContext = inputContext
    this.serviceContext = serviceContext;
  }

  public generate() {
    const resolvers = {};
    // FIXME implement more cases here
    // Supports create only for the moment
    for (const resolverElement of this.inputContext) {
      //TODO 
    }

    return resolvers;
  }
}