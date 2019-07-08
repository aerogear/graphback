import { FieldContext, InputContext } from 'graphback'

export interface Type {
  name: string
  fields: string[]
}

/**
 * Generate arrays of definitions as string
 * for respective type in the schema
 */
export interface TargetContext {
  nodes: Type[]
  inputFields: Type[]
  filterFields: Type[],
  pagination: InputContext[],
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

const findQueries = (inputContext: InputContext[]): string[] => {
  return inputContext.filter((i: InputContext) => i.config.find)
                    .map((i: InputContext) => {
                      const fieldName = getFieldName(i.name, Crud.FIND)
  
                      return `${fieldName}(fields: ${i.name}Filter!): ${i.name}!`
                    })
}

const updateQueries = (inputContext: InputContext[]): string[] => {
  return inputContext.filter((i: InputContext) => i.config.update)
                    .map((i: InputContext) => {
                      const fieldName = getFieldName(i.name, Crud.UPDATE)

                      return `${fieldName}(id: ID!, input: ${i.name}Input!): ${i.name}!`
                    })
}

const createQueries = (inputContext: InputContext[]): string[] => {
 return inputContext.filter((i: InputContext) => i.config.create)
                    .map((i: InputContext) => {
                      const fieldName = getFieldName(i.name, Crud.CREATE)
  
                      return `${fieldName}(input: ${i.name}Input!): ${i.name}!`
                    })
}

const delQueries = (inputContext: InputContext[]): string[] => {
  return inputContext.filter((i: InputContext) => i.config.delete)
                    .map((i: InputContext) => {
                      const fieldName = getFieldName(i.name, Crud.DELETE)

                      return `${fieldName}(id: ID!): ID!`
                    })
}

const findAllQueries = (inputContext: InputContext[]): string[] => {
  return inputContext.filter((i: InputContext) => i.config.findAll)
                    .map((i: InputContext) => {
                      const fieldName = getFieldName(i.name, Crud.FIND_ALL, 's')

                      return `${fieldName}: ${i.config.paginate ? `${i.name}Page`: `[${i.name}!]!`}`
                    })
}

const newSub = (name: string) => `new${name}: ${name}!`
const updatedSub = (name: string) => `updated${name}: ${name}!`
const deletedSub = (name: string) => `deleted${name}: ID!`

const arrayField = (f: FieldContext) => {
  if(f.isArray) {
    return `[${f.name}: ${f.type}]${f.isNull ? '!': ''}`
  }
  else {
    return `${f.name}: ${f.type}${f.isNull ? '!': ''}`
  }
}

export const buildTargetContext = (inputContext: InputContext[]) => {
  const context: TargetContext = {
    nodes: [],
    inputFields: [],
    filterFields: [],
    pagination: [],
    queries: [],
    mutations: [],
    subscriptions: []
  }

  context.nodes = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: FieldContext) => !f.isType)
                  .map(arrayField)
    }
  })
  context.inputFields = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: FieldContext) => f.type !== 'ID' && !f.isType)
                  .map(arrayField)
    }
  })
  context.filterFields = inputContext.map((c: InputContext) => {
    return {
      "name": c.name,
      "fields": c.fields.filter((f: FieldContext) => !f.isType)
                  .map(arrayField)
    }
  })
  context.pagination = inputContext.filter((i: InputContext) => i.config.paginate)
  context.queries = [...findQueries(inputContext), ...findAllQueries(inputContext)]
  context.mutations = [...createQueries(inputContext), ...updateQueries(inputContext), ...delQueries(inputContext)]
  context.subscriptions = [...inputContext.map((c: InputContext) => newSub(c.name)), ...inputContext.map((c: InputContext) => updatedSub(c.name)), ...inputContext.map((c: InputContext) => deletedSub(c.name))]

  return context
}