export const deleteTemplate = (fieldName: string, tableName: string, knexContext: string, argumentContext: string): string => {
  return `${fieldName}: (root, args, context, info) => {
    return ${knexContext}('${tableName}').where('id', '=' , ${argumentContext}.id).del().then( () => {
    return ${argumentContext}.id;
  })}`
}