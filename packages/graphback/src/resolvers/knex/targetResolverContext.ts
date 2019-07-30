import { Field, Type } from '../../ContextTypes';
import { getFieldName, getTableName, ResolverType } from '../../utils';
import * as knex from './resolverImplementation'

export interface TargetResolverContext {
  relations: string[]
  queries: string[]
  mutations: string[]
  subscriptions: string[],
  subscriptionTypes: string
}

export interface TypeContext {
  name: string
  context: TargetResolverContext
}

interface RelationImplementation {
  typeName: string
  implementation: string
}

const createResolver = (t: Type): string => {
  if(t.config.create) {
    return knex.createTemplate(t.config.subCreate, getFieldName(t.name, ResolverType.CREATE), getTableName(t.name), t.name)
  }

  return undefined
}

const updateResolver = (t: Type): string => {
  if(t.config.update) {
    return knex.updateTemplate(t.config.subUpdate, getFieldName(t.name, ResolverType.UPDATE), getTableName(t.name), t.name)
  }

  return undefined
}

const deleteResolver = (t: Type): string => {
  if(t.config.delete) {
    return knex.deleteTemplate(t.config.subDelete, getFieldName(t.name, ResolverType.DELETE), getTableName(t.name), t.name)
  }

  return undefined
}

const findResolver = (t: Type): string => {
  if(t.config.find) {
    return knex.findTemplate(getFieldName(t.name, ResolverType.FIND, 's'), getTableName(t.name))
  }

  return undefined
}

const findAllResolver = (t: Type): string => {
  if(t.config.findAll) {
    return knex.findAllTemplate(getFieldName(t.name, ResolverType.FIND_ALL, 's'), getTableName(t.name))
  }

  return undefined
}

const newSub = (t: Type): string => {
  if(t.config.create && t.config.subCreate) {
    return knex.newSub(t.name)
  }

  return undefined
}

const updatedSub = (t: Type): string => {
  if(t.config.update && t.config.subUpdate) {
    return knex.updatedSub(t.name)
  }

  return undefined
}

const deletedSub = (t: Type): string => {
  if(t.config.delete && t.config.subDelete) {
    return knex.deletedSub(t.name)
  }

  return undefined
}

const createSubscriptionTypes = (t: Type): string => {
  const subscriptionEnum = []
  if(t.config.create && t.config.subCreate) {
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

export const buildTypeContext = (context: Type): TargetResolverContext => {
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
  typeContext.mutations = [createResolver(context), updateResolver(context), deleteResolver(context)].filter((s: string) => s!==undefined)
  typeContext.subscriptions = [newSub(context), updatedSub(context), deletedSub(context)].filter((s: string) => s!==undefined)
  typeContext.subscriptionTypes = createSubscriptionTypes(context)

  return typeContext
}

export const buildResolverTargetContext = (inputContext: Type[]) => {
  const output: TypeContext[] = []
  inputContext.forEach((t: Type) => {
    output.push({
      name: t.name,
      context: buildTypeContext(t)
    })
  })

  return output
}