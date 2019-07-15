import { TargetResolverContext } from './knex/targetResolverContext';

const imports = `import { pubsub } from '../src/subscriptions'`

export const generateResolvers = (context: TargetResolverContext): string => {
  return `${imports}

enum Subscriptions {
  ${context.subscriptionTypes.join(',\n  ')}
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
}