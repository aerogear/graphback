/**
 * Field contains visited information like name, type and properties
 * like array and nullableType
 */
export interface Field {
  name: string
  // tslint:disable-next-line
  type: string
  isArray: boolean
  isNull: boolean
  isType: boolean
}

/**
 * Input context object from the vistor function
 */
export interface InputContext {
  name: string
  fields: Field[]
}

export interface Type {
  name: string
  fields: string[]
}

/**
 * Generate arrays of definitions as string
 * for respective type in the schema
 */
export interface TargetContext {
  types: string[]
  nodes: Type[]
  inputFields: Type[]
  filterFields: Type[],
  queries: string[],
  mutations: string[],
  subscriptions: string[]
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

const arrayField = (f: Field) => {
  if(f.isArray) {
    return `[${f.name}: ${f.type}]${f.isNull ? '!': ''}`
  }
  else {
    return `${f.name}: ${f.type}${f.isNull ? '!': ''}`
  }
}

export const buildTargetContext = (inputContext: InputContext[]) => {
  const context: TargetContext = {
    types: [],
    nodes: [],
    inputFields: [],
    filterFields: [],
    queries: [],
    mutations: [],
    subscriptions: []
  }
  context.types = inputContext.map((c: InputContext) => c.name)
  context.nodes = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: Field) => !f.isType)
                  .map(arrayField)
    }
  })
  context.inputFields = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: Field) => f.type !== 'ID' && !f.isType)
                  .map(arrayField)
    }
  })
  context.filterFields = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: Field) => !f.isType)
                  .map(arrayField)
    }
  })
  context.queries = [...context.types.map(find), ...context.types.map(findAll)]
  context.mutations = [...context.types.map(create), ...context.types.map(update), ...context.types.map(del)]
  context.subscriptions = [...context.types.map(newSub), ...context.types.map(updatedSub), ...context.types.map(deletedSub)]

  return context
}