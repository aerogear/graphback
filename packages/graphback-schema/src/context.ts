export interface Definition {
  name: string
  fields: string[]
}

export interface Context {
  types: string[]
  nodes: Definition[]
  inputFields: Definition[]
  filterFields: Definition[]  
  queries: string[]
  mutations: string[]
  subscriptions: string[]
}

const scalars = ['ID', 'String', 'Boolean', 'Int', 'Float']

const validateFields = (fields: string[]): string[] => {  
  return fields.filter((s: string) => {
    const removedDefs = s.replace('[]','').replace('!','')
    const splitType = removedDefs.split(': ')[1]
    if(scalars.includes(splitType)) {
      return true
    }

    return false
  })
}

const inputFields = (fields: string[]): string[] => {
  return fields.filter((f: string) => !f.startsWith('id'))
}

enum Crud {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  FIND = "find",
  FIND_ALL = "findAll"
}

const getFieldName = (typeName: string, action: Crud, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

const find = (name: string): string => {
  const fieldName = getFieldName(name, Crud.FIND)
  
  return `${fieldName}(fields: ${name}Filter!): ${name}!`
}

const update = (name: string): string => {
  const fieldName = getFieldName(name, Crud.UPDATE)

  return `${fieldName}(id: ID!, input: ${name}Input!): ${name}!`
}

const create = (name: string): string => {
  const fieldName = getFieldName(name, Crud.CREATE)
  
  return `${fieldName}(input: ${name}Input!): ${name}!`
}

const del = (name: string): string => {
  const fieldName = getFieldName(name, Crud.DELETE)
  
  return `${fieldName}(id: ID!): ID!`
}

const findAll = (name: string): string => {
  const fieldName = getFieldName(name, Crud.FIND_ALL)
  
  return `${fieldName}: ${name}Pagination`
}

const newSub = (name: string) => `new${name}: ${name}!`
const updatedSub = (name: string) => `updated${name}: ${name}!`
const deletedSub = (name: string) => `deleted${name}: ID!`

export const buildContext = (definitions: Definition[]) => {
  const context: Context = {
    types: [],
    nodes: [],
    inputFields: [],
    filterFields: [],
    queries: [],
    mutations: [],
    subscriptions: []
  }
  context.types = definitions.map((d: Definition) => d.name)
  context.nodes = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": validateFields(d.fields)
    }
  })
  context.inputFields = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": inputFields(validateFields(d.fields))
    }
  })
  context.filterFields = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": validateFields(d.fields).map((s: string) => s.replace('!',''))
    }
  })
  context.queries = [...context.types.map(find), ...context.types.map(findAll)]
  context.mutations = [...context.types.map(create), ...context.types.map(update), ...context.types.map(del)]
  context.subscriptions = [...context.types.map(newSub), ...context.types.map(updatedSub), ...context.types.map(deletedSub)]

  return context
}