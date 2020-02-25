//Templates for individual CRUD methods

export const createTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
        return context.${modelName}.create(args.input, context);
    }`;
}

export const updateTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
      return context.${modelName}.update(args.input, context);
    }`
}

export const deleteTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
      return context.${modelName}.delete(args.input, context);
    }`
}

export const findAllTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
      return context.${modelName}.findAll(args);
    }`
}

export const findTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
      return context.${modelName}.findBy(args.fields);
    }`
}

export const newSubscriptionTemplate = (modelName: string): string => {
  return `{
      subscribe: (parent, args, context) => {
        return context.${modelName}.subscribeToCreate(args, context);
      }
    }`
}

export const updatedSubscriptionTemplate = (modelName: string): string => {
  return `{
      subscribe: (parent, args, context) => {
        return context.${modelName}.subscribeToUpdate(args, context);
      }
    }`
}

export const deletedSubscriptionTemplate = (modelName: string): string => {
  return `{
      subscribe: (parent, args, context) => {
        return context.${modelName}.subscribeToDelete(args, context);
      }
    }`
}

export const blankResolver = `(parent, args, context) => {
    // Implementation here
}`;

export const blankSubscription = `{
    subscribe: (parent, args, context) => {
        // Implementation here
    }
}`
