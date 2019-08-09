import { Field, Type } from '../../ContextTypes';
import { getFieldName, getTableName, ResolverType } from '../../utils';
import { KnexResolver } from './KnexResolver';

export interface TargetResolverContext {
  relations?: string[]
  queries?: string[]
  mutations?: string[]
  subscriptions?: string[],
  subscriptionTypes?: string
}

export interface TypeContext {
  name: string
  context: TargetResolverContext
}

export interface Custom {
  name: string
  implementation: string
  operationType?: string
}

const knex = new KnexResolver()

/**
 * Resolver crud methods - create, update, delete, find and findAll
 */

const createResolver = (t: Type, database: string): string => {
  if(t.config.create && !t.config.disableGen) {
    return knex.createTemplate(database, t.config.subCreate, getFieldName(t.name, ResolverType.CREATE), getTableName(t.name), t.name)
  }

  return undefined
}

const updateResolver = (t: Type): string => {
  if(t.config.update && !t.config.disableGen) {
    return knex.updateTemplate(t.config.subUpdate, getFieldName(t.name, ResolverType.UPDATE), getTableName(t.name), t.name)
  }

  return undefined
}

const deleteResolver = (t: Type): string => {
  if(t.config.delete && !t.config.disableGen) {
    return knex.deleteTemplate(t.config.subDelete, getFieldName(t.name, ResolverType.DELETE), getTableName(t.name), t.name)
  }

  return undefined
}

const findResolver = (t: Type): string => {
  if(t.config.find && !t.config.disableGen) {
    return knex.findTemplate(getFieldName(t.name, ResolverType.FIND, 's'), getTableName(t.name))
  }

  return undefined
}

const findAllResolver = (t: Type): string => {
  if(t.config.findAll && !t.config.disableGen) {
    return knex.findAllTemplate(getFieldName(t.name, ResolverType.FIND_ALL, 's'), getTableName(t.name))
  }

  return undefined
}

/**
 * Subscriptions - new, updated and deleted
 */

const newSub = (t: Type): string => {
  if(t.config.create && t.config.subCreate && !t.config.disableGen) {
    return knex.newSub(t.name)
  }

  return undefined
}

const updatedSub = (t: Type): string => {
  if(t.config.update && t.config.subUpdate && !t.config.disableGen) {
    return knex.updatedSub(t.name)
  }

  return undefined
}

const deletedSub = (t: Type): string => {
  if(t.config.delete && t.config.subDelete && !t.config.disableGen) {
    return knex.deletedSub(t.name)
  }

  return undefined
}

/**
 * Create enum for subscriptions implementation
 * @param t Type object
 */
const createSubscriptionTypes = (t: Type): string => {
  const subscriptionEnum = []
  if(t.config.create && t.config.subCreate && !t.config.disableGen) {
    subscriptionEnum.push(`NEW_${t.name.toUpperCase()} = 'new${t.name.toLowerCase()}'`)
  }
  if(t.config.update && t.config.subUpdate) {
    subscriptionEnum.push(`UPDATED_${t.name.toUpperCase()} = 'updated${t.name.toLowerCase()}'`)
  }
  if(t.config.delete && t.config.subDelete) {
    subscriptionEnum.push(`DELETED_${t.name.toUpperCase()} = 'deleted${t.name.toLowerCase()}'`)
  }

  return subscriptionEnum.join(`,\n  `)
}

/**
 * Create context object for each individual type
 * @param context Visited info from the model
 */
export const buildTypeContext = (context: Type, database: string): TargetResolverContext => {
  const relationImplementations = []
  let hasRelation = false

  context.fields.forEach((f: Field) => {
    if(f.isType){
      if(f.directives.OneToOne || !f.isArray) {
        let columnName = `${context.name.toLowerCase()}Id`
        if(f.directives.OneToOne) {
          columnName = f.directives.OneToOne.field
        }
        // relationTypes.push(context.name)
        hasRelation = true
        relationImplementations.push(knex.typeRelation('OneToOne', columnName, f.name, f.type.toLowerCase()))
      } else if(f.directives.OneToMany || f.isArray) {
        let columnName = `${context.name.toLowerCase()}Id`
        if(f.directives.OneToMany) {
          columnName = f.directives.OneToMany.field
        }
        // relationTypes.push(context.name)
        hasRelation = true
        relationImplementations.push(knex.typeRelation('OneToMany', columnName, f.name, f.type.toLowerCase()))
      }
    }
  })

  const typeContext = {
    relations: [],
    queries: [],
    mutations: [],
    subscriptions: [],
    subscriptionTypes: ''
  }

  if(hasRelation) {
    typeContext.relations = relationImplementations
  }
  typeContext.queries = [findResolver(context), findAllResolver(context)].filter((s: string) => s!==undefined)
  typeContext.mutations = [createResolver(context, database), updateResolver(context), deleteResolver(context)].filter((s: string) => s!==undefined)
  typeContext.subscriptions = [newSub(context), updatedSub(context), deletedSub(context)].filter((s: string) => s!==undefined)
  typeContext.subscriptionTypes = createSubscriptionTypes(context)

  return typeContext
}

/**
 * Create context of all the types
 * @param input Input visited object
 */
export const buildResolverTargetContext = (input: Type[], database: string) => {
  const inputContext = input.filter((t: Type) => t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
  const output: TypeContext[] = []
  inputContext.forEach((t: Type) => {
    output.push({
      name: t.name,
      context: buildTypeContext(t, database)
    })
  })

  return output
}

/**
 * Create queries, mutations or subscriptions from custom input provided
 * @param inputContext Input visited object
 */
export const createCustomContext = (inputContext: Type[], templateType: string) => {
  const queryType = inputContext.filter((t: Type) => t.name === 'Query')
  let customQueries = []
  if(queryType.length) {
    customQueries = queryType[0].fields.map((f: Field) => {
      return {
        name: f.name,
        implementation: knex.blankResolver(f.name),
        operationType: 'Query'
      }
    })
  }

  const mutationType = inputContext.filter((t: Type) => t.name === 'Mutation')
  let customMutations = []
  if(mutationType.length) {
    customMutations = mutationType[0].fields.map((f: Field) => {
      return {
        name: f.name,
        implementation: knex.blankResolver(f.name),
        operationType: 'Mutation'
      }
    })
  }

  const subscriptionType = inputContext.filter((t: Type) => t.name === 'Subscription')
  let customSubscriptions = []
  if(subscriptionType.length) {
    customSubscriptions = subscriptionType[0].fields.map((f: Field) => {
      return {
        name: f.name,
        implementation: knex.blankSubscription(f.name),
        operationType: 'Subscription'
      }
    })
  }

  return [...customQueries, ...customMutations, ...customSubscriptions]
}