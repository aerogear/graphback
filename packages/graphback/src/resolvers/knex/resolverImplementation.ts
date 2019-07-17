const knexContext = `context.db`
const pubsub = `context.pubsub`

export const createTemplate = (fieldName: string, tableName: string, typeName: string): string => {
    return `${fieldName}: async (_: any, args: any, context: Context) => {
      const result = await ${knexContext}('${tableName}').insert(args.input).returning('*')
      ${pubsub}.publish(Subscriptions.NEW_${typeName.toUpperCase()}, {
        new${typeName}: result[0]
      })
      return result[0]
    }`
  }

export const deleteTemplate = (fieldName: string, tableName: string, typeName: string): string => {
    return `${fieldName}: (_: any, args: any, context: Context) => {
      return ${knexContext}('${tableName}').where('id', '=' , args.id).del().then( () => {
        ${pubsub}.publish(Subscriptions.DELETED_${typeName.toUpperCase()}, {
          deleted${typeName}: args.id
        })
        return args.id;
    })}`
}

export const findAllTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (_: any, __: any, context: Context) => {
      return ${knexContext}.select().from('${tableName}')
    }`
  }

export const findTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (_: any, args: any, context: Context) => {
      return ${knexContext}.select().from('${tableName}').where(args.fields)
    }`
}

export const updateTemplate = (fieldName: string, tableName: string, typeName: string): string => {
    return `${fieldName}: (_: any, args: any, context: Context) => {
      return ${knexContext}('${tableName}').where('id', '=' , args.id).update(args.input).then( async () => {
        const result = await ${knexContext}.select().from('${tableName}').where('id', '=' , args.id);
        ${pubsub}.publish(Subscriptions.UPDATED_${typeName.toUpperCase()}, {
          updated${typeName}: result[0]
        })
        return result[0]
    })}`
}

export const newSub = (typeName: string): string => {
    return `new${typeName}: {
      subscribe: (_: any, __: any, context: Context) => ${pubsub}.asyncIterator(Subscriptions.NEW_${typeName.toUpperCase()})
    }`
}

export const updatedSub = (typeName: string): string => {
    return `updated${typeName}: {
      subscribe: (_: any, __: any, context: Context) => ${pubsub}.asyncIterator(Subscriptions.UPDATED_${typeName.toUpperCase()})
    }`
}

export const deletedSub = (typeName: string): string => {
    return `deleted${typeName}: {
      subscribe: (_: any, __: any, context: Context) => ${pubsub}.asyncIterator(Subscriptions.DELETED_${typeName.toUpperCase()})
    }`
}