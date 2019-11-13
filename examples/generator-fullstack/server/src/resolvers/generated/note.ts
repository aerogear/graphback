

export const noteResolvers = {
  Query: {
    findNotes: (_, args, context) => {
      return context.crudService.findBy('note', args.fields, context);
    },
    findAllNotes: (_, args, context) => {
      return context.crudNote.findAll(context);
    }
  },

  Mutation: {
    createNote: (_, args, context) => {
      return context.crudNote.create(args.input, {
        publishEvent: true
      }, context);
    },
    updateNote: (_, args, context) => {
      return context.crudNote.update(args.id, args.input, {
        publishEvent: true
      }, context);
    },
    deleteNote: (_, args, context) => {
      return context.crudNote.delete(args.id, args.input, {
        publishEvent: true
      }, context);
    }
  },

  Subscription: {
    newNote: {
      subscribe: (_, args, context) => {
        return context.crudNote.subscribeToCreate(context);
      }
    },
    updatedNote: {
      subscribe: (_, args, context) => {
        return context.crudNote.subscribeToUpdate(context);
      }
    },
    deletedNote: {
      subscribe: (_, args, context) => {
        return context.crudNote.subscribeToDelete(context);
      }
    }
  }
}
