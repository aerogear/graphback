import { TargetResolverContext, TypeContext } from '../knex/targetResolverContext';

const imports = `import { GraphQLContext } from '../src/context'`

export const generateTypeResolvers = (context: TargetResolverContext, name: string): string => {
  if(context.relations.length && context.subscriptions.length) {
    return `${imports}
  
enum Subscriptions {
  ${context.subscriptionTypes}
}

export const ${name}Resolvers = {
  ${context.relations.join(',\n\n  ')},

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
  ${context.relations.join(',\n\n  ')},

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
      name: t.name,
      output: generateTypeResolvers(t.context, t.name)
    }
  })
}

export const generateIndexFile = (context: TypeContext[]) => {
  return `${context.map((t: TypeContext) => `import { ${t.name}Resolvers } from './generated/${t.name}.ts'`).join('\n')}
  
export default [${context.map((t: TypeContext) => `${t.name}Resolvers`).join(', ')}]`
}

