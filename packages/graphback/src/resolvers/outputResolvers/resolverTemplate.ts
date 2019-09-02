import { Custom, TargetResolverContext, TypeContext } from '../knex/targetResolverContext';

const imports = `import { GraphQLContext } from '../../context'`

/**
 * Generate resolvers for each type
 * @param context `Type` object
 * @param name name of the Type
 */
// tslint:disable-next-line: max-func-body-length
const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
  const { relations, queries, mutations, subscriptions, subscriptionTypes } = context

  const outputResolvers = []

  if(relations.length) {
    outputResolvers.push(`${name}: {
    ${relations.join(',\n    ')}
  }`)
  }

  if(queries.length) {
    outputResolvers.push(`Query: {
    ${context.queries.join(',\n    ')}
  }`)
  }

  if(mutations.length) {
    outputResolvers.push(`Mutation: {
    ${context.mutations.join(',\n    ')}
  }`)
  }

  if(subscriptions.length) {
    outputResolvers.push(`Subscription: {
    ${context.subscriptions.join(',\n    ')}
  }`)
  }

  let output = `${imports}`

  if(context.subscriptions.length) {
    output += `\n\nenum Subscriptions {
  ${context.subscriptionTypes}
}`
  }

  output += `\n\nexport const ${name.toLowerCase()}Resolvers = {
  ${outputResolvers.join(',\n\n  ')}
}
`

  return output
}

const generateResolvers = (context: TypeContext[]) => {
  return context.map((t: TypeContext) => {
    return {
      name: t.name.toLowerCase(),
      output: generateTypeResolvers(t.context, t.name)
    }
  })
}

const alphabeticSort = (a: TypeContext | Custom, b: TypeContext | Custom) => {
  if(a.name < b.name) {
    return -1
  }
  if(a.name > b.name) {
    return 1
  }

  return 0
}

/**
 * Generate the index file
 * @param context Array fo `Type`
 * @param hasCustomElements has custom queries or mutations or not
 */
const generateIndexFile = (context: TypeContext[], hasCustomElements: boolean) => {
  if(hasCustomElements) {
    return `${context.sort(alphabeticSort).map((t: TypeContext) => `import { ${t.name.toLowerCase()}Resolvers } from './generated/${t.name.toLowerCase()}'`).join('\n')}

import { customResolvers } from './custom'

export const resolvers = [${[...context.map((t: TypeContext) => `${t.name.toLowerCase()}Resolvers`), '...customResolvers'].join(', ')}]
`
  }

  return `${context.sort(alphabeticSort).map((t: TypeContext) => `import { ${t.name.toLowerCase()}Resolvers } from './generated/${t.name.toLowerCase()}'`).join('\n')}

export const resolvers = [${context.map((t: TypeContext) => `${t.name.toLowerCase()}Resolvers`).join(', ')}]
`
}

const generateCustomResolvers = (customResolvers: Custom[]) => {
  const index = `${customResolvers.sort(alphabeticSort).map((c: Custom) => `import { ${c.name} } from './${c.name}'`).join('\n')}

export const customResolvers = [${customResolvers.map((c: Custom) => c.name).join(', ')}]
`
  const outputCustomResolvers = customResolvers.map((c: Custom) => {
    return {
      name: c.name,
      output: `${imports}

export const ${c.name} = {
  ${c.operationType}: {
    ${c.implementation}
  }
}
`
    }
  })

  outputCustomResolvers.push({
    name: 'index',
    output: index
  })

  return outputCustomResolvers
}

/**
 * Generate resolvers from target context and using string templates
 * types - contains original generated CRUD resolvers based on the types
 * custom - contains custom empty stubs if hasCustomElements===true
 * index - maps together the resolvers from the above.
 * @param context name and context object of each type from input datamodel
 * @param customContext custom queries/ mutations/ subscriptions if any
 * @param hasCustomElements specifies if above mentioned custom elements are present or not
 */
export const generateGraphbackResolvers = (context: TypeContext[], customContext: Custom[], hasCustomElements: boolean) => {
  return {
    types: generateResolvers(context),
    index: generateIndexFile(context, hasCustomElements),
    custom: generateCustomResolvers(customContext)
  }
}

