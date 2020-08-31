import { QueryFilter } from "graphback";
import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from 'apollo-server-express';
import { NoteFilter } from '../generated-types';
import { GraphQLContext } from '../customContext';

export const noteResolvers: IResolvers = {
  Query: {
    getDraftNotes: async (parent: any, args: any, context: GraphQLContext, info: GraphQLResolveInfo) => {
      const filter: QueryFilter<NoteFilter> = {
        title: {
          startsWith: '[DRAFT]'
        }
      }

      const results = await context.graphback.Note.findBy({ filter }, context, info);

      return results.items;
    }
  }
}
