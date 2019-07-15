import { TargetResolverContext } from './knex/targetResolverContext';

export const generateResolvers = (context: TargetResolverContext): string => {
  return `export const resolvers = {
  Query: {
    ${context.queries.join(',\n    ')}
  },

  Mutation: {
    ${context.mutations.join(',\n    ')}
  }
}`
}