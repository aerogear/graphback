

export const commentResolvers = {
  Note : {
    comments:  (parent, args, context) => {
      context.dataLoader.load('comment', parent.id)
    }
  }

  Query: {
    findComments: (_, args, context) => {
      return context.crudComment.findBy(args.fields, context);
    },
    findAllComments: (_, args, context) => {
      return context.crudComment.findAll(context);
    }
  },

  Mutation: {
    createComment: (_, args, context) => {
      return context.crudComment.create(args.input, {
        publishEvent: true
      }, context);
    },
    updateComment: (_, args, context) => {
      return context.crudComment.update(args.id, args.input, {
        publishEvent: true
      }, context);
    },
    deleteComment: (_, args, context) => {
      return context.crudComment.delete(args.id, args.input, {
        publishEvent: true
      }, context);
    }
  },

  Subscription: {
    newComment: {
      subscribe: (_, args, context) => {
        return context.crudComment.subscribeToCreate(context);
      }
    },
    updatedComment: {
      subscribe: (_, args, context) => {
        return context.crudComment.subscribeToUpdate(context);
      }
    },
    deletedComment: {
      subscribe: (_, args, context) => {
        return context.crudComment.subscribeToDelete(context);
      }
    }
  }
}
