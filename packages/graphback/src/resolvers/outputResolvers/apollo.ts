import { TargetResolverContext, TypeContext } from '../knex/targetResolverContext';

const imports = `import { GraphQLContext } from '../../context'`

export const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
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

export const ${name}Resolvers = {
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

export const ${name}Resolvers = {
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

export const ${name}Resolvers = {
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

export const generateResolvers = (context: TypeContext[]) => {
  return context.map((t: TypeContext) => {
    return {
      name: t.name.toLowerCase(),
      output: generateTypeResolvers(t.context, t.name)
    }
  })
}

const alphabeticSort = (a: TypeContext, b: TypeContext) => {
  if(a.name < b.name) {
    return -1
  }
  if(a.name > b.name) {
    return 1
  }

  return 0
}

export const generateIndexFile = (context: TypeContext[]) => {
  return `${context.sort(alphabeticSort).map((t: TypeContext) => `import { ${t.name.toLowerCase()}Resolvers } from './generated/${t.name.toLowerCase()}'`).join('\n')}

export const resolvers = [${context.map((t: TypeContext) => `${t.name.toLowerCase()}Resolvers`).join(', ')}]
`
}

