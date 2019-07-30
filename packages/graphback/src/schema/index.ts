import { Type } from '../ContextTypes';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext, TargetContext } from './targetSchemaContext';


/**
 * generate schema using graphql-codegen and visitor pattern
 * using string templates
 */
export class SchemaGenerator {
  private context: TargetContext
  private inputContext: Type[]

  constructor(inputContext: Type[]) {
    this.inputContext = inputContext
  }

  /**
   * Generate output schema as string
   */
  public generate() {
    this.context = buildTargetContext(this.inputContext)
    const queryType = this.inputContext.filter((t: Type) => t.name === 'Query')
    let customQueries = []
    if(queryType.length) {
      customQueries = queryType[0].fields
    }

    const mutationType = this.inputContext.filter((t: Type) => t.name === 'Mutation')
    let customMutations = []
    if(mutationType.length) {
      customMutations = mutationType[0].fields
    }

    const subscriptionType = this.inputContext.filter((t: Type) => t.name === 'Subscription')
    let customSubscriptions = []
    if(subscriptionType.length) {
      customSubscriptions = subscriptionType[0].fields
    }

    return generateSchema(this.context, customQueries, customMutations, customSubscriptions)
  }
}