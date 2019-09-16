import { Type } from '../ContextTypes';
import { uniqueBy } from '../utils';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext, createCustomSchemaContext, RelationInfo, TargetContext } from './targetSchemaContext';


/**
 * generate schema using graphql-codegen and visitor pattern
 * using string templates
 */
export class SchemaGenerator {
  private context: TargetContext
  private inputContext: Type[]

  constructor(inputContext: Type[]) {
    this.inputContext = inputContext;
    this.context = buildTargetContext(inputContext);
  }

  public getRelations(name: string): string[] {
    const relations = this.context.relations.filter((r: RelationInfo) => r.name !== name).map((r: RelationInfo) => r.name);

    return [...new Set(relations)];
  }

  /**
   * Generate output schema as string
   */
  public generate() {
    const [ customQueries, customMutations, customSubscriptions ] = createCustomSchemaContext(this.inputContext)

    return generateSchema(this.context, customQueries, customMutations, customSubscriptions)
  }
}
