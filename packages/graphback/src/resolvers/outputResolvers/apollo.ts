import { Custom, TargetResolverContext, TypeContext } from '../knex/targetResolverContext';

const imports = `import { GraphQLContext } from '../../context'`

const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
  if(context.relations.length && context.subscriptions.length) {
    return `${imports}

enum Subscriptions {
  ${context.subscriptionTypes}
}

export const ${name.toLowerCase()}Resolvers = {
  ${name}: {
    ${context.relations.join(',\n    ')}
  },

  Query: {
    ${context.queries.join(',\n    ')}
  },

  Mutation: {
    ${context.mutations.join(',\n    ')}
  },

  Subscription: {
    ${context.subscriptions.join(',\n    ')}
  }
}
`
  } else if (context.relations.length){
    return `${imports}

export const ${name.toLowerCase()}Resolvers = {
  ${name}: {
    ${context.relations.join(',\n    ')}
  },

  Query: {
    ${context.queries.join(',\n    ')}
  },

  Mutation: {
    ${context.mutations.join(',\n    ')}
  }
}
`
  } else if(context.subscriptions.length) {
    return `${imports}

enum Subscriptions {
  ${context.subscriptionTypes}
}

export const ${name.toLowerCase()}Resolvers = {
  Query: {
    ${context.queries.join(',\n    ')}
  },

  Mutation: {
    ${context.mutations.join(',\n    ')}
  },

  Subscription: {
    ${context.subscriptions.join(',\n    ')}
  }
}
`
  } else {
    return `${imports}

export const ${name.toLowerCase()}Resolvers = {
  Query: {
    ${context.queries.join(',\n    ')}
  },

  Mutation: {
    ${context.mutations.join(',\n    ')}
  }
}
`
  }
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

export const generateApolloResolvers = (context: TypeContext[], customContext: Custom[], hasCustomElements: boolean) => {
  return {
    types: generateResolvers(context),
    index: generateIndexFile(context, hasCustomElements),
    custom: generateCustomResolvers(customContext)
  }
}

