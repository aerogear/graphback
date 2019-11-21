import { InputModelTypeContext } from '@graphback/core';
import { ResolverGeneratorOptions } from '../api/ResolverGeneratorOptions';
import { CustomResolverContext, ResolverTypeContext, TargetResolverContext } from '../api/resolverTypes';
import { buildResolverTargetContext, createCustomContext } from '../api/targetResolverContext';

const generateRuntimeImport = (): string => {
  return `const validateRuntimeContext = require("@graphback/runtime");`
};

/**
 * Formats generated source code into Apollo GraphQL format
 * @param context `Type` object
 * @param name name of the Type
 */
// tslint:disable-next-line: max-func-body-length
const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
  const { relations, queries, mutations, subscriptions } = context

  const outputResolvers = []

  if(relations.length) {
    outputResolvers.push(`${name}: {
    ${relations.join(',\n    ')}
  }`)
  }

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

  return `${generateRuntimeImport()}\n\ exports.${name.toLowerCase()}Resolvers = {
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
    return `${context.sort(alphabeticSort).
      map((t: ResolverTypeContext) => 
      `const { ${t.name.toLowerCase()}Resolvers } = require('./generated/${t.name.toLowerCase()}')`).join('\n')}

const { customResolvers } = require('./custom')

exports.resolvers = [${[...context.map((t: ResolverTypeContext) => `${t.name.toLowerCase()}Resolvers`), '...customResolvers'].join(', ')}]
`
  }

  return `${context.sort(alphabeticSort).
    map((t: ResolverTypeContext) => 
    `const ${t.name.toLowerCase()}Resolvers  = require('./generated/${t.name.toLowerCase()}').${t.name.toLowerCase()}Resolvers `).join('\n')}

exports.resolvers = [${context.map((t: ResolverTypeContext) => `${t.name.toLowerCase()}Resolvers`).join(', ')}]
`
}

const generateCustomResolvers = (customResolvers: CustomResolverContext[]) => {
  const index = `${customResolvers.sort(alphabeticSort).map((c: CustomResolverContext) => `const { ${c.name} } = require('./${c.name}')`).join('\n')}

exports.customResolvers = [${customResolvers.map((c: CustomResolverContext) => c.name).join(', ')}]
`
  const outputCustomResolvers = customResolvers.map((c: CustomResolverContext) => {
    return {
      name: c.name,
      output: `
exports.${c.name} = {
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
export const generateJSResolvers = (inputContext: InputModelTypeContext[], options: ResolverGeneratorOptions) => {
  const context = buildResolverTargetContext(inputContext)
  const customContext = createCustomContext(inputContext)
  const hasCustomElements = !!customContext.length

  return {
    types: generateResolvers(context),
    index: generateIndexFile(context, hasCustomElements),
    custom: generateCustomResolvers(customContext)
  }
}

