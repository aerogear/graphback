import { validateRuntimeContext } from "@graphback/runtime";

export default {
  Query: {
    findTests: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("test", args.fields);
    },
    findAllTests: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("test");
    }
  },

  Mutation: {
    createTest: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.create("test", args.input, {
        publishEvent: false
      }, context);
    },
    updateTest: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("test", args.id, args.input, {
        publishEvent: false
      }, context);
    }
  }
} 
