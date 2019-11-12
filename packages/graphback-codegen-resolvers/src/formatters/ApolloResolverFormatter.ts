import { InputModelTypeContext } from '@graphback/core';
import { CustomResolverContext, ResolverTypeContext, TargetResolverContext } from '../api/resolverTypes';
import { createCustomContext } from '../api/targetResolverContext';
import { generateRuntimeImport } from '../templates/LayeredResolverTemplates';

/**
 * Formats generated source code into Apollo GraphQL format
 * @param context `Type` object
 * @param name name of the Type
 */
// tslint:disable-next-line: max-func-body-length
const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
  const { relations, queries, mutations, subscriptions } = context

  const outputResolvers = []

  if (queries.length) {
    outputResolvers.push(`Query: {
    ${context.queries.join(',\n    ')}
  }`)
  }

  if (mutations.length) {
    outputResolvers.push(`Mutation: {
    ${context.mutations.join(',\n    ')}
  }`)
  }

  if (subscriptions.length) {
    outputResolvers.push(`Subscription: {
    ${context.subscriptions.join(',\n    ')}
  }`)
  }

  return `${generateRuntimeImport()}\n\nexport const ${name.toLowerCase()}Resolvers = {
  ${outputResolvers.join(',\n\n  ')}
}
`
}

const generateResolvers = (context: ResolverTypeContext[]) => {
  return context.map((t: ResolverTypeContext) => {
    return {
      name: t.name.toLowerCase(),
      output: generateTypeResolvers(t.context, t.name)
    }
  })
}

const alphabeticSort = (a: ResolverTypeContext | CustomResolverContext, b: ResolverTypeContext | CustomResolverContext) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }

  return 0
}

/**
 * Generate the index file
 * @param context Array fo `Type`
 * @param hasCustomElements has custom queries or mutations or not
 */
const generateIndexFile = (context: ResolverTypeContext[], hasCustomElements: boolean) => {
  if (hasCustomElements) {
    return `${context.sort(alphabeticSort).map((t: ResolverTypeContext) => `import { ${t.name.toLowerCase()}Resolvers } from './generated/${t.name.toLowerCase()}'`).join('\n')}

import { customResolvers } from './custom'

export const resolvers = [${[...context.map((t: ResolverTypeContext) => `${t.name.toLowerCase()}Resolvers`), '...customResolvers'].join(', ')}]
`
  }

  return `${context.sort(alphabeticSort).map((t: ResolverTypeContext) => `import { ${t.name.toLowerCase()}Resolvers } from './generated/${t.name.toLowerCase()}'`).join('\n')}

export const resolvers = [${context.map((t: ResolverTypeContext) => `${t.name.toLowerCase()}Resolvers`).join(', ')}]
`
}

const generateCustomResolvers = (customResolvers: CustomResolverContext[]) => {
  const index = `${customResolvers.sort(alphabeticSort).map((c: CustomResolverContext) => `import { ${c.name} } from './${c.name}'`).join('\n')}

export const customResolvers = [${customResolvers.map((c: CustomResolverContext) => c.name).join(', ')}]
`
  const outputCustomResolvers = customResolvers.map((c: CustomResolverContext) => {
    return {
      name: c.name,
      output: `
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
 * 
 * @param inputContext name and context object of each type from input datamodel
 */
export const generateGraphbackResolvers = (context: ResolverTypeContext[], inputContext: InputModelTypeContext[]) => {
  const customContext = createCustomContext(inputContext)
  const hasCustomElements = !!customContext.length

  return {
    types: generateResolvers(context),
    index: generateIndexFile(context, hasCustomElements),
    custom: generateCustomResolvers(customContext)
  }
}

