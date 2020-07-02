import { GraphbackContext, GraphbackCRUDService, Maybe, Scalars } from "graphback";

/**
 * Types can be generated using GraphQL-Code-Generator
 */
export type Note = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

const getNoteService = (context: GraphbackContext) => {
  return context.graphback?.services?.Note as GraphbackCRUDService<Note>
}

export const customResolvers = {
  Query: {
    printNote: async (parent: any, variables: any, context: GraphbackContext, info: any) => {
      const noteService = getNoteService(context);
      const notes = await noteService.findBy({}, { graphback: {} });

      return JSON.stringify(notes);
    }
  }
}
