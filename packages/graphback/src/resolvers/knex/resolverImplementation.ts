const knexContext = `context.db`
const argumentContext = `args`

export const createTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: async (root, args, context, info) => {
      const result = await ${knexContext}('${tableName}').insert(${argumentContext}.input).returning('*')
      return result[0]
    }`
  }

export const deleteTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (root, args, context, info) => {
      return ${knexContext}('${tableName}').where('id', '=' , ${argumentContext}.id).del().then( () => {
      return ${argumentContext}.id;
    })}`
}

export const findAllTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (root, args, context, info) => {
      return ${knexContext}.select().from('${tableName}')
    }`
  }

export const findTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (root, args, context, info) => {
      return ${knexContext}.select().from('${tableName}').where(${argumentContext}.fields)
    }`
}

export const updateTemplate = (fieldName: string, tableName: string): string => {
    return `${fieldName}: (root, args, context, info) => {
      return ${knexContext}('${tableName}').where('id', '=' , ${argumentContext}.id).update(${argumentContext}.input).then( async () => {
        const result = await ${knexContext}.select().from('${tableName}').where('id', '=' , ${argumentContext}.id);
        return result[0]
    })}`
}