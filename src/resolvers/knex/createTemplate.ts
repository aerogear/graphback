export const createTemplate = (fieldName: string, tableName: string, knexContext: string, argumentContext: string): string => {
  return `${fieldName}: (root, args, context, info) => {
    return ${knexContext}('${tableName}').insert(${argumentContext}.input).returning('*')
  }`
}