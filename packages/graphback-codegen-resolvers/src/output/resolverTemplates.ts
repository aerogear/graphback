const defaultResolverArgs = `parent, args, context`;

export const createTemplate = (modelName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
        validateRuntimeContext(context);
        return context.crudService.create("${modelName}", args.input, {
            publishEvent: ${subscription}
        }, context);
    }`;
}

export const updateTemplate = (modelName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context);
        return context.crudService.update("${modelName}", args.id, args.input, {
            publishEvent: ${subscription}
        }, context);
    }`
}

export const deleteTemplate = (modelName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.delete("${modelName}", args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const findAllTemplate = (modelName: string): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("${modelName}");
    }`
}

export const findTemplate = (modelName: string): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("${modelName}", args.fields);
    }`
}

export const newSubscriptionTemplate = (modelName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToCreate("${modelName}", context);
      }
    }`
}

export const updatedSubscriptionTemplate = (modelName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToUpdate("${modelName}", context);
      }
    }`
}

export const deletedSubscriptionTemplate = (modelName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToDelete("${modelName}", context);
      }
    }`
}

export const blankResolver = `(${defaultResolverArgs}) => {
    // Implementation here
}`;

export const blankSubscription = `{
    subscribe: (${defaultResolverArgs}) => {
        // Implementation here
    }
}`
