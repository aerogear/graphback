import { TargetResolverContext } from './knex/targetResolverContext';

const imports = `import { GraphQLContext } from '../src/context'`

export const generateResolvers = (context: TargetResolverContext): string => {
  if(context.relations.length && context.subscriptions.length) {
    return `${imports}
  
enum Subscriptions {
  ${context.subscriptionTypes}
}

export const resolvers = {
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

export const resolvers = {
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

export const resolvers = {
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

export const resolvers = {
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