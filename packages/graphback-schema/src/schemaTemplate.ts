import { Type, TargetContext } from './targetType';

const pagination = (types: string[]): string => {
  return `type PaginationInfo {
  totalPages: Int!
  totalItems: Int!
  page: Int!
  perPage: Int!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
}

${types.map((name: string) => `type ${name}Pagination {
  items: [${name}]!
  pageInfo: PaginationInfo!
}`).join('\n\n')}`
}

const inputs = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `input ${d.name}Input {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}`
}

const nodeTypes = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `type ${d.name} implements Node {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}`
}

const filters = (defs: Type[]): string => {
  return `${defs.map((d: Type) => `type ${d.name}Filter {
  ${d.fields.join('\n  ')}
}`).join('\n\n')}` 
}

const outputSchema = (context: TargetContext): string =>  `interface Node {
  id: ID!
}

${inputs(context.inputFields)}

${nodeTypes(context.nodes)}

${filters(context.filterFields)}

${pagination(context.types)}

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

export const generateSchema = (context: TargetContext): string => {
  return outputSchema(context)
}