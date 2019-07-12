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
    
    return generateSchema(this.context)
  }
}