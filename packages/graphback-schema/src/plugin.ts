import { inputTypeVisitor } from 'graphback'
import { GraphQLSchema, parse, printSchema, visit } from 'graphql';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext } from './targetType';



export const plugin = (schema: GraphQLSchema) => {
  const printedSchema = printSchema(schema)
  const astNode = parse(printedSchema)
  
  const inputTypes = visit(astNode, { leave: inputTypeVisitor })

  const context = buildTargetContext(inputTypes.definitions.reverse())

  return generateSchema(context)
}