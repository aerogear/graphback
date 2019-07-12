import { Field, Type } from '../ContextTypes'
import { getFieldName, ResolverType } from '../utils'

export interface TargetType {
  name: string
  fields: string[]
}

/**
 * Generate arrays of definitions as string
 * for respective type in the schema
 */
export interface TargetContext {
  nodes: TargetType[]
  inputFields: TargetType[]
  filterFields: TargetType[],
  pagination: Type[],
  queries: string[],
  mutations: string[],
  subscriptions: string[]
}

const findQueries = (inputContext: Type[]): string[] => {
  return inputContext.filter((t: Type) => t.config.find)
                    .map((t: Type) => {
                      const fieldName = getFieldName(t.name, ResolverType.FIND)
  
                      return `${fieldName}(fields: ${t.name}Filter!): ${t.name}!`
                    })
}

const updateQueries = (inputContext: Type[]): string[] => {
  return inputContext.filter((t: Type) => t.config.update)
                    .map((t: Type) => {
                      const fieldName = getFieldName(t.name, ResolverType.UPDATE)

                      return `${fieldName}(id: ID!, input: ${t.name}Input!): ${t.name}!`
                    })
}

const createQueries = (inputContext: Type[]): string[] => {
 return inputContext.filter((t: Type) => t.config.create)
                    .map((t: Type) => {
                      const fieldName = getFieldName(t.name, ResolverType.CREATE)
  
                      return `${fieldName}(input: ${t.name}Input!): ${t.name}!`
                    })
}

const delQueries = (inputContext: Type[]): string[] => {
  return inputContext.filter((t: Type) => t.config.delete)
                    .map((t: Type) => {
                      const fieldName = getFieldName(t.name, ResolverType.DELETE)

                      return `${fieldName}(id: ID!): ID!`
                    })
}

const findAllQueries = (inputContext: Type[]): string[] => {
  return inputContext.filter((t: Type) => t.config.findAll)
                    .map((t: Type) => {
                      const fieldName = getFieldName(t.name, ResolverType.FIND_ALL, 's')

                      return `${fieldName}: ${t.config.paginate ? `${t.name}Page`: `[${t.name}!]!`}`
                    })
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

export const buildTargetContext = (inputContext: Type[]) => {
  const context: TargetContext = {
    nodes: [],
    inputFields: [],
    filterFields: [],
    pagination: [],
    queries: [],
    mutations: [],
    subscriptions: []
  }

  context.nodes = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": t.fields.filter((f: Field) => !f.isType)
                  .map(arrayField)
    }
  })
  context.inputFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": t.fields.filter((f: Field) => f.type !== 'ID' && !f.isType)
                  .map(arrayField)
    }
  })
  context.filterFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": t.fields.filter((f: Field) => !f.isType)
                  .map(arrayField)
    }
  })
  context.pagination = inputContext.filter((t: Type) => t.config.paginate)
  context.queries = [...findQueries(inputContext), ...findAllQueries(inputContext)]
  context.mutations = [...createQueries(inputContext), ...updateQueries(inputContext), ...delQueries(inputContext)]
  context.subscriptions = [...inputContext.map((t: Type) => newSub(t.name)), ...inputContext.map((t: Type) => updatedSub(t.name)), ...inputContext.map((t: Type) => deletedSub(t.name))]

  return context
}