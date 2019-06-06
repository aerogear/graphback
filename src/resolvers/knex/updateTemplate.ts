

// TODO create template for each operation
export const updateTemplate = (fieldName, tableName, argumentContext)=>{
    return `${fieldName} = (root, args, context, info) => {
        return ${this.knexContext}('${tableName}').where('id', '=' , ${argumentContext}.id).update(${argumentContext}.input).then( () => {
          return ${this.knexContext}.select().from('${tableName}').where('id', '=' , ${argumentContext}.id);
        })}`
}