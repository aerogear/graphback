// TODO subscription support
// TODO support for the database type instead of hardcoded lowercase
export const createTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.create("${typeName.toLowerCase()}", args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const updateTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("${typeName.toLowerCase()}", args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const deleteTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.delete("${typeName.toLowerCase()}", args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const findAllTemplate = (fieldName: string, typeName: string): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("${typeName.toLowerCase()}");
    }`
}

export const findTemplate = (fieldName: string, typeName: string, ): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("${typeName.toLowerCase()}", args.fields);
    }`
}

export const newSub = (typeName: string): string => {
  return `new${typeName}: {
      subscribe: (_, args, context) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToCreate("${typeName.toLowerCase()}", context);
      }
    }`
}

export const updatedSub = (typeName: string): string => {
  return `updated${typeName}: {
      subscribe: (_, args, context) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToUpdate("${typeName.toLowerCase()}", context);
      }
    }`
}

export const deletedSub = (typeName: string): string => {
  return `deleted${typeName}: {
      subscribe: (_, args, context) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToDelete("${typeName.toLowerCase()}", context);
      }
    }`
}

export const typeRelation = (relation: string, columnName: string, fieldName: string, tableName: string): string => {
  if (relation === 'OneToOne') {
    return `${fieldName}: (parent, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.batchLoadData("${tableName}", "${columnName}", parent.id, context)
        .then((result) => result[0]);
    }`
  } else if (relation === 'OneToMany') {
    return `${fieldName}: (parent, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.batchLoadData("${tableName}", "${columnName}", parent.id, context);
    }`
  }

  return undefined
}

export const blankResolver = (name: string) => {
  return `${name}: (_, args, context) => {
      // Implementation here
    }`
}

export const blankSubscription = (name: string) => {
  return `${name}: {
      subscribe: (_, args, context) => {
        // Implementation here
      }
    }`
}