export const updateTemplate = (fieldName: string, tableName: string, knexContext: string, argumentContext: string): string => {
  return `${fieldName}: (root, args, context, info) => {
    return ${knexContext}('${tableName}').where('id', '=' , ${argumentContext}.id).update(${argumentContext}.input).then( () => {
      return ${knexContext}.select().from('${tableName}').where('id', '=' , ${argumentContext}.id);
    })}`
}