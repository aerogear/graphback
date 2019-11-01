import { GraphQLContext } from '../../context'

export const testResolvers = {
  Query: {
    findTests: (_: any, args: any, context: GraphQLContext) => {
      return context.db.select().from('test').where(args.fields)
    },
    findAllTests: (_: any, __: any, context: GraphQLContext) => {
      return context.db.select().from('test')
    }
  },

  Mutation: {
    createTest: async (_: any, args: any, context: GraphQLContext) => {
      const [ id ] = await context.db('test').insert(args.input).returning('id')
      const result = await context.db.select().from('test').where('id', '=', id)
      return result[0]
    },
    updateTest: (_: any, args: any, context: GraphQLContext) => {
      return context.db('test').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await context.db.select().from('test').where('id', '=' , args.id);
        return result[0]
    })}
  }
}
