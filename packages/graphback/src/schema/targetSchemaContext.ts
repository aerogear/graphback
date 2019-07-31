import { Argument, Field, Type } from '../ContextTypes'
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
  // pagination: Type[],
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

                      return `${fieldName}: [${t.name}!]!`
                    })
}

const newSub = (name: string) => `new${name}: ${name}!`
const updatedSub = (name: string) => `updated${name}: ${name}!`
const deletedSub = (name: string) => `deleted${name}: ID!`

/**
 * Create schema type output from the Field object from isNull, isArray flags
 * ex - title: String!
 * @param f Field type
 */
export const maybeNullField = (f: Field) => {
  if(f.isArray) {
    return `${f.name}: [${f.type}]${f.isNull ? '': '!'}`
  }
  else {
    return `${f.name}: ${f.type}${f.isNull ? '': '!'}`
  }
}

/**
 * Recreate custom input provided by the user from the field object with arguments
 * example
 * user input - likePost(id: ID!): Post!
 * output - likePost(id: ID!): Post!
 * @param f Field type from custom input
 * arguments structure - {name, value: {isNull, type, isArray}}
 */
export const maybeNullFieldArgs = (f: Field) => {
  if(f.arguments) {
    return `${f.name}(${f.arguments.map((x: Argument) => x.value.isArray ? 
      `${x.name}: [${x.value.type}]${x.value.isNull ? '': '!'}`: 
      `${x.name}: ${x.value.type}${x.value.isNull ? '': '!'}`).join(', ')}): ${f.isArray ? `[${f.type}]`: `${f.type}`}${f.isNull ? '': '!'}`
  } else {
    return maybeNullField(f)
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

/**
 * Build schema context for the string templates
 * relations - if the model has relations
 * nodes - process main types and create nodes
 * inputFields - create input fields for each type for create and update methods
 * filterFields - create filter fields for find method
 * queries - generated queries according to config - find, findAll
 * mutations - generated mutations according to config - create, update, delete
 * subscriptions - generated subscription according to config - new, updated, deleted
 * @param input input visted object from model
 */
export const buildTargetContext = (input: Type[]) => {
  const inputContext = input.filter((t: Type) => t.name !== 'Query' && t.name !== 'Mutation')

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
    // pagination: [],
    queries: [],
    mutations: [],
    subscriptions: []
  }

  context.nodes = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: Field) => !f.isType).map(maybeNullField), ...new Set(relations.filter((r: RelationInfo) => r.name === t.name).map((r: RelationInfo) => r.relation))]
    }
  })
  context.inputFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: Field) => f.type !== 'ID' && !f.isType)
                  .map(maybeNullField),
                  ...new Set(relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID').map((r: RelationInfo) => r.relation))]
    }
  })
  context.filterFields = inputContext.map((t: Type) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: Field) => !f.isType)
                  .map(nullField),
                  ...new Set(relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID').map((r: RelationInfo) => r.relation.slice(0, -1)))]
    }
  })
  // context.pagination = inputContext.filter((t: Type) => t.config.paginate)
  context.queries = [...findQueries(inputContext), ...findAllQueries(inputContext)]
  context.mutations = [...createQueries(inputContext), ...updateQueries(inputContext), ...delQueries(inputContext)]
  context.subscriptions = [...inputContext.filter((t: Type) => t.config.create && t.config.subCreate).map((t: Type) => newSub(t.name)), 
                          ...inputContext.filter((t: Type) => t.config.update && t.config.subUpdate).map((t: Type) => updatedSub(t.name)), 
                          ...inputContext.filter((t: Type) => t.config.delete && t.config.subDelete).map((t: Type) => deletedSub(t.name))]

  return context
}

export const createCustomSchemaContext = (inputContext: Type[]) => {
  const queryType = inputContext.filter((t: Type) => t.name === 'Query')
    let customQueries = []
    if(queryType.length) {
      customQueries = queryType[0].fields.map(maybeNullFieldArgs)
    }

    const mutationType = inputContext.filter((t: Type) => t.name === 'Mutation')
    let customMutations = []
    if(mutationType.length) {
      customMutations = mutationType[0].fields.map(maybeNullFieldArgs)
    }

    const subscriptionType = inputContext.filter((t: Type) => t.name === 'Subscription')
    let customSubscriptions = []
    if(subscriptionType.length) {
      customSubscriptions = subscriptionType[0].fields.map(maybeNullFieldArgs)
    }

    return [customQueries, customMutations, customSubscriptions]
}