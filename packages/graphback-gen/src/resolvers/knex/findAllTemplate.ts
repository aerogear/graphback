export const findAllTemplate = (fieldName: string, tableName: string, knexContext: string, argumentContext: string): string => {
  return `${fieldName}: (root, args, context, info) => {
    return ${knexContext}.select().from('${tableName}')
  }`
}