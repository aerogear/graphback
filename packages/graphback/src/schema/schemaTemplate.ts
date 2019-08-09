import { TargetContext, TargetType } from './targetSchemaContext';

// const pagination = (inputContext: Type[]): string => {
//   return `
// ${inputContext.map((i: Type) => `type ${i.name}Page {
//   items: [${i.name}]!
//   pageInfo: PaginationInfo!
// }`).join('\n\n')}
// `
// }

const inputs = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `input ${d.name}Input {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

const nodeTypes = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `type ${d.name} {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

const filters = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `input ${d.name}Filter {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}` 
}

const imports = `import gql from 'graphql-tag'`

/**
 * Patch together generated and custom queries
 * @param queries queries generated from the types (CRUD)
 * @param custom custom queries inputted by the user
 */
const generateQueries = (queries: string[], customQueries: string[]) => {
  if(customQueries.length) {
    return `type Query {
    ${queries.join('\n    ')}
    ## Custom queries
    ${customQueries.join('\n    ')}
  }`
  } else {
    return `type Query {
    ${queries.join('\n    ')}
  }`
  }
}

/**
 * Patch together generated and custom mutations
 * @param mutations mutations generated from the types (CRUD)
 * @param custom custom mutations inputted by the user
 */
const generateMutations = (mutations: string[], customMutations: string[]) => {
  if(customMutations.length) {
    return `type Mutation {
    ${mutations.join('\n    ')}
    ## Custom mutations
    ${customMutations.join('\n    ')}
  }`
  } else {
    return `type Mutation {
    ${mutations.join('\n    ')}
  }`
  }
}

/**
 * Patch together generated and custom subscriptions
 * @param subscriptions subscriptions generated from the types (CRUD)
 * @param custom custom subscriptions inputted by the user
 */
const generateSubscriptions = (subscriptions: string[], customSubs: string[]) => {
  if(customSubs.length) {
    return `type Subscription {
    ${subscriptions.join('\n    ')}
    ## Custom subscriptions
    ${customSubs.join('\n    ')}
  }`
  } else {
    return `type Subscription {
    ${subscriptions.join('\n    ')}
  }`
  }
}

/**
 * String template having placeholders for definitions which is received 
 * from targetcontext
 * @param context target context module contains definition for each of the fields
 * in the schema such as Inputs, Filters, Queries etc
 */
const outputSchema = (context: TargetContext, customQueries: string[], customMutations: string[], customSubscriptions: string[], templateType: string): string => {
  const { inputFields, nodes, filterFields, queries, mutations, subscriptions } = context
  if(templateType === 'graphql-js') {
    if(context.subscriptions.length) {
      return `export const typeDefs = \`
  ${nodeTypes(nodes)}

  ${inputs(inputFields)}

  ${filters(filterFields)}

  ${generateQueries(queries, customQueries)}

  ${generateMutations(mutations, customMutations)}

  ${generateSubscriptions(subscriptions, customSubscriptions)}
\`
`
    } else {
      return `export const typeDefs = \`
  ${nodeTypes(nodes)}

  ${inputs(inputFields)}

  ${filters(filterFields)}

  ${generateQueries(queries, customQueries)}

  ${generateMutations(mutations, customMutations)}
\`
`
    }
  } else {
    if(context.subscriptions.length) {
      return `${imports}
  
export const typeDefs = gql\`
  ${nodeTypes(nodes)}

  ${inputs(inputFields)}

  ${filters(filterFields)}

  ${generateQueries(queries, customQueries)}

  ${generateMutations(mutations, customMutations)}

  ${generateSubscriptions(subscriptions, customSubscriptions)}
\`
`
    } else {
      return `${imports}

export const typeDefs = gql\`
  ${nodeTypes(nodes)}

  ${inputs(inputFields)}

  ${filters(filterFields)}

  ${generateQueries(queries, customQueries)}
  
  ${generateMutations(mutations, customMutations)}
\`
`
    }
  }
  
}

/**
 * Generate the output schema
 */
export const generateSchema = (context: TargetContext, queries: string[], mutations: string[], subscriptions: string[], templateType: string): string => {
  return outputSchema(context, queries, mutations, subscriptions, templateType)
}