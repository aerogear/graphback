// TODO subscription support
// TODO support for the database type instead of hardcoded lowercase
export const createTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.create("${typeName.toLowerCase()}", args.input, context);
    }`
}

export const updateTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.update("${typeName.toLowerCase()}", args.id, args.input, context);
    }`
}

export const deleteTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.delete("${typeName.toLowerCase()}", args.id, args.input, context);
    }`
}

export const findAllTemplate = (fieldName: string, typeName: string): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findAll("${typeName.toLowerCase()}", context);
    }`
}

export const findTemplate = (fieldName: string, typeName: string, ): string => {
  return `${fieldName}: (_, args, context) => {
      validateRuntimeContext(context)
      return context.crudService.findBy("${typeName.toLowerCase()}", args.fields, context);
    }`
}

export const newSub = (typeName: string): string => {
  return `new${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToCreate("${typeName.toLowerCase()}", context);
      }
    }`
}

export const updatedSub = (typeName: string): string => {
  return `updated${typeName}: {
      subscribe  : (_: any, __: any, context: GraphQLContext) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToUpdate("${typeName.toLowerCase()}", context);
      }
    }`
}

export const deletedSub = (typeName: string): string => {
  return `deleted${typeName}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        validateRuntimeContext(context)
        return context.crudService.subscribeToDelete("${typeName.toLowerCase()}", context);
      }
    }`
}

export const generateRuntimeImport = (): string =>{
  return `import { validateRuntimeContext } from "@graphback/runtime";`
};

// TODO
export const typeRelation = (relation: string, columnName: string, fieldName: string, tableName: string): string => {
  // if (relation === 'OneToOne') {
  //   return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
  //     return ${this.knexContext}.select().from('${tableName}').where('${columnName}', '=', parent.id)
  //                               .then((result) => result[0])
  //   }`
  // } else if (relation === 'OneToMany') {
  //   return `${fieldName}: (parent: any, _: any, context: GraphQLContext) => {
  //     return ${this.knexContext}.select().from('${tableName}').where('${columnName}', '=', parent.id)
  //   }`
  // } else {
  //   return undefined
  // }
  return '';
}

export const invertTypeRelation = (columnName: string, fieldName: string, tableName: string): string => {
  // return `${fieldName}: async (parent: any, _: any, context: GraphQLContext) => {
  //     export const result = await ${this.knexContext}.select().from('${tableName}').where('id', '=', parent.${columnName})
  //     return result[0]
  //   }`
  return '';
}

export const blankResolver = (name: string) => {
  return `${name}: (_, args, context) => {
      // Implementation here
    }`
}

export const blankSubscription = (name: string) => {
  return `${name}: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        // Implementation here
      }
    }`
}