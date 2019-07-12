import { InputContext } from '../ContextCreator';
import { TargetContext, Type } from './targetSchemaContext';

const pagination = (inputContext: InputContext[]): string => {
  return `
${inputContext.map((i: InputContext) => `type ${i.name}Page {
  items: [${i.name}]!
  pageInfo: PaginationInfo!
}`).join('\n\n')}
`
}

const inputs = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `input ${d.name}Input {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}`
}

const nodeTypes = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `type ${d.name} {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}`
}

const filters = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `input ${d.name}Filter {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}` 
}

/**
 * String template having placeholders for definitions which is received 
 * from targetcontext
 * @param context target context module contains definition for each of the fields
 * in the schema such as Inputs, Filters, Queries etc
 */
const outputSchema = (context: TargetContext): string =>  `${nodeTypes(context.nodes)}

${inputs(context.inputFields)}

${filters(context.filterFields)}

type Query {
  ${context.queries.join('\n  ')}
}

type Mutation {
  ${context.mutations.join('\n  ')}
}

type Subscription {
  ${context.subscriptions.join('\n  ')}
}
`
/**
 * Generate the output schema
 */
export const generateSchema = (context: TargetContext): string => {
  return outputSchema(context)
}