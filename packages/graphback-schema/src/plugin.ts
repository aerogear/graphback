import { inputTypeVisitor } from 'graphback'
import { DocumentNode, GraphQLSchema, parse, printSchema, visit } from 'graphql';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext, InputContext, TargetContext } from './targetType';

export const plugin = (schema: GraphQLSchema) => {
  const printedSchema: string = printSchema(schema)
  const astNode: DocumentNode = parse(printedSchema)
  
  const inputTypes = visit(astNode, { leave: inputTypeVisitor })

  const context: TargetContext = buildTargetContext(inputTypes.definitions.reverse())

  return generateSchema(context)
}