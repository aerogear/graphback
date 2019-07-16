import { TargetResolverContext } from './knex/targetResolverContext';

export const generateResolvers = (context: TargetResolverContext): string => {
  return `enum Subscriptions {
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