import { Type } from '../ContextTypes';
import { getFieldName, getTableName, ResolverType } from '../utils';
import * as knex from './knexImplementation'

export interface TargetResolverContext {
  queries: string[]
  mutations: string[]
}

const createResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.create)
                .map((i: Type) => knex.createTemplate(getFieldName(i.name, ResolverType.CREATE), getTableName(i.name), 'db', 'args'))
}

const updateResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.update)
                .map((i: Type) => knex.updateTemplate(getFieldName(i.name, ResolverType.UPDATE), getTableName(i.name), 'db', 'args'))
}

const deleteResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.delete)
                .map((i: Type) => knex.deleteTemplate(getFieldName(i.name, ResolverType.DELETE), getTableName(i.name), 'db', 'args'))
}

const findResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.find)
                .map((i: Type) => knex.findTemplate(getFieldName(i.name, ResolverType.FIND), getTableName(i.name), 'db', 'args'))
}

const findAllResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.findAll)
                .map((i: Type) => knex.findAllTemplate(getFieldName(i.name, ResolverType.FIND_ALL), getTableName(i.name), 'db', 'args'))
}

export const buildResolverTargetContext = (inputContext: Type[]): TargetResolverContext => {
  const context = {
    queries: [],
    mutations: []
  }

  context.queries = [...findResolvers(inputContext), ...findAllResolvers(inputContext)]
  context.mutations = [...createResolvers(inputContext), ...updateResolvers(inputContext), ...deleteResolvers(inputContext)]

  return context
}