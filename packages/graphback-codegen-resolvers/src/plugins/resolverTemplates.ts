const defaultResolverArgs = `parent, args, context`;

export const createTemplate = (tableName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
        validateRuntimeContext(context);
        return context.crudService.create("${tableName}", args.input, {
            publishEvent: ${subscription}
        }, context);
    }`;
}

export const updateTemplate = (tableName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context);
        return context.crudService.update("${tableName}", args.id, args.input, {
            publishEvent: ${subscription}
        }, context);
    }`
}

export const deleteTemplate = (tableName: string, subscription: boolean): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.delete("${tableName}", args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const findAllTemplate = (tableName: string): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("${tableName}");
    }`
}

export const findTemplate = (tableName: string): string => {
    return `(${defaultResolverArgs}) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("${tableName}", args.fields);
    }`
}

export const newSubscriptionTemplate = (tableName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToCreate("${tableName}", context);
      }
    }`
}

export const updatedSubscriptionTemplate = (tableName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToUpdate("${tableName}", context);
      }
    }`
}

export const deletedSubscriptionTemplate = (tableName: string): string => {
    return `{
      subscribe: (${defaultResolverArgs}) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToDelete("${tableName}", context);
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
