import { Type } from '../../ContextTypes';
import { getFieldName, getTableName, ResolverType } from '../../utils';
import * as knex from './resolverImplementation'

export interface TargetResolverContext {
  queries: string[]
  mutations: string[]
  subscriptions: string[],
  subscriptionTypes: string[]
}

const createResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.create)
                .map((i: Type) => knex.createTemplate(getFieldName(i.name, ResolverType.CREATE), getTableName(i.name), i.name))
}

const updateResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.update)
                .map((i: Type) => knex.updateTemplate(getFieldName(i.name, ResolverType.UPDATE), getTableName(i.name), i.name))
}

const deleteResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.delete)
                .map((i: Type) => knex.deleteTemplate(getFieldName(i.name, ResolverType.DELETE), getTableName(i.name), i.name))
}

const findResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.find)
                .map((i: Type) => knex.findTemplate(getFieldName(i.name, ResolverType.FIND, 's'), getTableName(i.name)))
}

const findAllResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.findAll)
                .map((i: Type) => knex.findAllTemplate(getFieldName(i.name, ResolverType.FIND_ALL, 's'), getTableName(i.name)))
}

const newSubs = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.create)
                .map((i: Type) => knex.newSub(i.name))
}

const updatedSubs = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.update)
                .map((i: Type) => knex.updatedSub(i.name))
}

const deletedSubs = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.delete)
                .map((i: Type) => knex.deletedSub(i.name))
}

const createSubscriptionTypes = (context: Type[]): string[] => {
  return context.map((i: Type) => `NEW_${i.name.toUpperCase()} = 'new${i.name.toLowerCase()}',
  UPDATED_${i.name.toUpperCase()} = 'updated${i.name.toLowerCase()}',
  DELETED_${i.name.toUpperCase()} = 'deleted${i.name.toLowerCase()}'`)
}

export const buildResolverTargetContext = (inputContext: Type[]): TargetResolverContext => {
  const context = {
    queries: [],
    mutations: [],
    subscriptions: [],
    subscriptionTypes: []
  }

  context.queries = [...findResolvers(inputContext), ...findAllResolvers(inputContext)]
  context.mutations = [...createResolvers(inputContext), ...updateResolvers(inputContext), ...deleteResolvers(inputContext)]
  context.subscriptions = [...newSubs(inputContext), ...updatedSubs(inputContext), ...deletedSubs(inputContext)]
  context.subscriptionTypes = createSubscriptionTypes(inputContext)

  return context
}