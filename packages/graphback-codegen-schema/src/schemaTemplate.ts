import { createImplementsInterfaceString } from '@graphback/core';
import { TargetContext, TargetType } from './targetSchemaContext';

const inputs = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `input ${d.name}Input {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

const nodeTypes = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `type ${d.name} ${d.interfaces.length ? createImplementsInterfaceString(d.interfaces) : ''}{
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

const nodeInterfaces = (defs: TargetType[]): string => {
  if (defs.length === 0) {
    return '';
  }
  
  return `${defs.map((d: TargetType) => `interface ${d.name} {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

const filters = (defs: TargetType[]): string => {
  return `${defs.map((d: TargetType) => `input ${d.name}Filter {
    ${d.fields.join('\n    ')}
  }`).join('\n\n  ')}`
}

/**
 * Patch together generated and custom queries
 * @param queries queries generated from the types (CRUD)
 * @param custom custom queries inputted by the user
 */
const generateQueries = (queries: string[], customQueries: string[]) => {
  if (!queries.length && !customQueries.length) {
    return '';
  }
  let queryOutput = `type Query {`

  if (queries.length) {
    queryOutput += `\n    ${queries.join('\n    ')}`
  }

  if (customQueries.length) {
    queryOutput += `\n    ## Custom queries`
    queryOutput += `\n    ${customQueries.join('\n    ')}`
  }

  queryOutput += `\n  }`

  return queryOutput
}

/**
 * Patch together generated and custom mutations
 * @param mutations mutations generated from the types (CRUD)
 * @param custom custom mutations inputted by the user
 */
const generateMutations = (mutations: string[], customMutations: string[]) => {
  if (!mutations.length && !customMutations.length) {
    return ``
  }
  let mutationOutput = `type Mutation {`

  if (mutations.length) {
    mutationOutput += `\n    ${mutations.join('\n    ')}`
  }

  if (customMutations.length) {
    mutationOutput += `\n    ## Custom mutations`
    mutationOutput += `\n    ${customMutations.join('\n    ')}`
  }

  mutationOutput += `\n  }`

  return mutationOutput
}

/**
 * Patch together generated and custom subscriptions
 * @param subscriptions subscriptions generated from the types (CRUD)
 * @param custom custom subscriptions inputted by the user
 */
const generateSubscriptions = (subscriptions: string[], customSubs: string[]) => {
  if (!subscriptions.length && !customSubs.length) {
    return ``
  }
  let subsOutput = `type Subscription {`

  if (subscriptions.length) {
    subsOutput += `\n    ${subscriptions.join('\n    ')}`
  }

  if (customSubs.length) {
    subsOutput += `\n    ## Custom subscriptions`
    subsOutput += `\n    ${customSubs.join('\n    ')}`
  }

  subsOutput += `\n  }`

  return subsOutput
}

/**
 * Contains additional elements that should be added to schema
 */
export interface CustomSchemaContext {
  customQueries: string[]
  customMutations: string[]
  customSubscriptions: string[]
}

/**
 * String template having placeholders for definitions which is received
 * from targetcontext
 * @param context target context module contains definition for each of the fields
 * in the schema such as Inputs, Filters, Queries etc
 */
export const generateSchemaString = (context: TargetContext, customContext?: CustomSchemaContext): string => {

  const { inputFields, types, interfaces, filterFields, queries, mutations, subscriptions } = context

  const allQueries = generateQueries(queries, customContext.customQueries)
  const allMutations = generateMutations(mutations, customContext.customMutations)
  const allSubs = generateSubscriptions(subscriptions, customContext.customSubscriptions)
  let output = `
  ${nodeInterfaces(interfaces)}

  ${nodeTypes(types)}

  ${inputs(inputFields)}

  ${filters(filterFields)}
  `

  if (allQueries) {
    output += `\n\n  ${allQueries}`
  }

  if (allMutations) {
    output += `\n\n  ${allMutations}`
  }

  if (allSubs) {
    output += `\n\n  ${allSubs}`
  }

  output += `\n`;

  return output;
}


