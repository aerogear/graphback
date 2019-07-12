import { InputContext } from '../ContextCreator';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext, TargetContext } from './targetSchemaContext';


/**
 * generate schema using graphql-codegen and visitor pattern
 * using string templates
 */
export class SchemaGenerator {
  private context: TargetContext
  private inputContext: InputContext[]

  constructor(inputContext: InputContext[]) {
    this.inputContext = inputContext
  }

  /**
   * Generate output schema as string
   */
  public generate() {
    this.context = buildTargetContext(this.inputContext)
    
    return generateSchema(this.context)
  }
}