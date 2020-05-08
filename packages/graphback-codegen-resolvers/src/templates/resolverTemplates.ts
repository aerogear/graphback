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

export const findOneTemplate = (modelName: string): string => {
  return `(parent, args, context) => {
      return context.${modelName}.findOne(args);
    }`
}

export const findAllTemplate = (modelName: string): string => {
  return `(parent, { page }, context) => {
      return context.${modelName}.findAll(page);
    }`
}

export const findTemplate = (modelName: string): string => {
  return `(parent, { filter, orderBy, page }, context) => {
      return context.${modelName}.findBy(filter, orderBy, page);
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

export const oneToManyTemplate = (modelName: string, relationField: string, idField: string) => {
  return `(parent, { filter }, context) => {
    return context.${modelName}.batchLoadData('${relationField}', parent.${idField}, filter, context);
  }
  `;
}

export const oneToOneTemplate = (modelName: string, relationField: string, idField: string) => {
  return `(parent, args, context) => {
    return context.${modelName}.findBy({ ${idField}: parent.${relationField} })
     .then((results) => results[0]);
  }
  `;
}
