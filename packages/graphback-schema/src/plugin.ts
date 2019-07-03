import { GraphQLSchema, parse, printSchema, visit } from 'graphql';
import { buildContext } from './context';
import { generateSchema } from './schema';
import { visitor } from './visitor'



export const plugin = (schema: GraphQLSchema) => {
  const printedSchema = printSchema(schema)
  const astNode = parse(printedSchema)
  
  const result = visit(astNode, { leave: visitor })

  const context = buildContext(result.definitions.reverse())

  return generateSchema(context)
}