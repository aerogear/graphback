import { InputModelTypeContext } from '@graphback/core';
import { ResolverGeneratorOptions } from '../api/ResolverGeneratorOptions';
import { CustomResolverContext, ResolverTypeContext, TargetResolverContext } from '../api/resolverTypes';
import { buildResolverTargetContext, createCustomContext } from '../api/targetResolverContext';


const generateRuntimeImport = (): string => {
  return `import { validateRuntimeContext } from "@graphback/runtime";`
};

/**
 * Formats generated source code into Apollo GraphQL format
 * @param context `Type` object
 * @param name name of the Type
 */
// tslint:disable-next-line: max-func-body-length
export const generateTypeResolvers = (context: TargetResolverContext, name: string, options: ResolverGeneratorOptions): string => {
  const { relations, queries, mutations, subscriptions } = context

  const outputResolvers = []

  if (relations.length) {
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

  let resolverType = '';
  let typedImports = ''
  if (options.types) {
    resolverType = `as ${options.types.resolverRootType}`
    typedImports = `import { ${options.types.resolverRootType} } from "${options.types.resolverRootLocation}"\n`
  }

  return `${generateRuntimeImport()}\n${typedImports}\nexport default {
  ${outputResolvers.join(',\n\n  ')}
} ${resolverType}
`
}

const generateResolvers = (context: ResolverTypeContext[], options: ResolverGeneratorOptions) => {
  return context.map((t: ResolverTypeContext) => {
    return {
      name: t.name.toLowerCase(),
      output: generateTypeResolvers(t.context, t.name, options)
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
    return `${context.sort(alphabeticSort).map((t: ResolverTypeContext) => `import ${t.name.toLowerCase()}Resolvers from './generated/${t.name.toLowerCase()}'`).join('\n')}

import { customResolvers } from './custom'

export const resolvers = [${[...context.map((t: ResolverTypeContext) => `${t.name.toLowerCase()}Resolvers`), '...customResolvers'].join(', ')}]
`
  }

  return `${context.sort(alphabeticSort).map((t: ResolverTypeContext) => `import ${t.name.toLowerCase()}Resolvers from './generated/${t.name.toLowerCase()}'`).join('\n')}

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
export const generateTSResolvers = (inputContext: InputModelTypeContext[], options: ResolverGeneratorOptions) => {
  const context = buildResolverTargetContext(inputContext)
  const customContext = createCustomContext(inputContext)
  const hasCustomElements = !!customContext.length

  return {
    types: generateResolvers(context, options),
    index: generateIndexFile(context, hasCustomElements),
    custom: generateCustomResolvers(customContext)
  }
}

