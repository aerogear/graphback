import { GraphbackContextCreator, InputContext } from 'graphback'
import { DocumentNode, GraphQLSchema, parse, printSchema, visit } from 'graphql';
import { generateSchema } from './schemaTemplate';
import { buildTargetContext, TargetContext } from './targetType';

export const plugin = (schema: GraphQLSchema) => {

  const inputContext = new GraphbackContextCreator(printSchema(schema)).createInputContext()

  const context: TargetContext = buildTargetContext(inputContext.reverse())

  return generateSchema(context)
}