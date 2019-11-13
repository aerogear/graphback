// TODO subscription support
// TODO support for the database type instead of hardcoded lowercase
export const createTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      return context.crud${typeName}.create(args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const updateTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      return context.crud${typeName}.update(args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const deleteTemplate = (fieldName: string, typeName: string, subscription?: boolean): string => {
  return `${fieldName}: (_, args, context) => {
      return context.crud${typeName}.delete(args.id, args.input, {
        publishEvent: ${subscription}
      }, context);
    }`
}

export const findAllTemplate = (fieldName: string, typeName: string): string => {
  return `${fieldName}: (_, args, context) => {
      return context.crud${typeName}.findAll(context);
    }`
}

export const findTemplate = (fieldName: string, typeName: string, ): string => {
  return `${fieldName}: (_, args, context) => {
      return context.crud${typeName}.findBy(args.fields, context);
    }`
}

export const newSub = (typeName: string): string => {
  return `new${typeName}: {
      subscribe: (_, args, context) => {
        return context.crud${typeName}.subscribeToCreate(context);
      }
    }`
}

export const updatedSub = (typeName: string): string => {
  return `updated${typeName}: {
      subscribe: (_, args, context) => {
        return context.crud${typeName}.subscribeToUpdate(context);
      }
    }`
}

export const deletedSub = (typeName: string): string => {
  return `deleted${typeName}: {
      subscribe: (_, args, context) => {
        return context.crud${typeName}.subscribeToDelete(context);
      }
    }`
}


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
      subscribe: (_, args, context) => {
        // Implementation here
      }
    }`
}