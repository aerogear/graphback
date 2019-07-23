import { Field, Type } from '../ContextTypes'
import { getFieldName, ResolverType } from '../utils'

export interface TargetType {
  name: string
  fields: string[]
}

interface RelationInfo {
  name: string
  //tslint:disable-next-line
  type: string
  relation: string
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
                      const fieldName = getFieldName(t.name, ResolverType.FIND, 's')
  
                      return `${fieldName}(fields: ${t.name}Filter!): [${t.name}!]!`
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


const maybeNullField = (f: Field) => {
  if(f.isArray) {
    return `${f.name}: [${f.type}]${f.isNull ? '': '!'}`
  }
  else {
    return `${f.name}: ${f.type}${f.isNull ? '': '!'}`
  }
}

const nullField = (f: Field) => {
  if(f.isArray) {
    return `${f.name}: [${f.type}]`
  }
  else {
    return `${f.name}: ${f.type}`
  }
}

export const buildTargetContext = (inputContext: Type[]) => {
  const relations = []

  inputContext.forEach((t: Type) => {
    t.fields.forEach((f: Field) => {
      if(f.isType){
        if(f.directives.OneToOne || !f.isArray) {
          relations.push({
            "name": t.name,
            "type": 'Type',
            "relation": `${f.name}: ${f.type}`
          })
          relations.push({
            "name": f.type,
            "type": 'ID',
            "relation": `${t.name.toLowerCase()}Id: ID!`
          })
        } else if(f.directives.OneToMany || f.isArray) {
          relations.push({
            "name": t.name,
            "type": 'Type',
            "relation": `${f.name}: [${f.type}!]`
          })
          relations.push({
            "name": f.type,
            "type": 'ID',
            "relation": `${t.name.toLowerCase()}Id: ID!`
          })
        }
      }
    })
  });

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
      "fields": [...t.fields.filter((f: Field) => !f.isType).map(maybeNullField), ...relations.filter((r: RelationInfo) => r.name === t.name).map((r: RelationInfo) => r.relation)]
    }
  })
  context.inputFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: Field) => f.type !== 'ID' && !f.isType)
                  .map(maybeNullField),
                  ...relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID').map((r: RelationInfo) => r.relation)]
    }
  })
  context.filterFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: Field) => !f.isType)
                  .map(nullField),
                  ...relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID').map((r: RelationInfo) => r.relation.slice(0, -1))]
    }
  })
  context.pagination = inputContext.filter((t: Type) => t.config.paginate)
  context.queries = [...findQueries(inputContext), ...findAllQueries(inputContext)]
  context.mutations = [...createQueries(inputContext), ...updateQueries(inputContext), ...delQueries(inputContext)]
  context.subscriptions = [...inputContext.filter((t: Type) => t.config.create).map((t: Type) => newSub(t.name)), 
                          ...inputContext.filter((t: Type) => t.config.update).map((t: Type) => updatedSub(t.name)), 
                          ...inputContext.filter((t: Type) => t.config.delete).map((t: Type) => deletedSub(t.name))]

  return context
}