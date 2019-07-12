import { InputContext } from '../ContextCreator';
import { getFieldName, getTableName, ResolverType } from '../utils';
import * as knex from './knexImplementation'

export interface TargetResolverContext {
  queries: string[]
  mutations: string[]
}

const createResolvers = (context: InputContext[]): string[] => {
  return context.filter((i: InputContext) => i.config.create)
                .map((i: InputContext) => knex.createTemplate(getFieldName(i.name, ResolverType.CREATE), getTableName(i.name), 'db', 'args'))
}

const updateResolvers = (context: InputContext[]): string[] => {
  return context.filter((i: InputContext) => i.config.update)
                .map((i: InputContext) => knex.updateTemplate(getFieldName(i.name, ResolverType.UPDATE), getTableName(i.name), 'db', 'args'))
}

const deleteResolvers = (context: InputContext[]): string[] => {
  return context.filter((i: InputContext) => i.config.delete)
                .map((i: InputContext) => knex.deleteTemplate(getFieldName(i.name, ResolverType.DELETE), getTableName(i.name), 'db', 'args'))
}

const findResolvers = (context: InputContext[]): string[] => {
  return context.filter((i: InputContext) => i.config.find)
                .map((i: InputContext) => knex.findTemplate(getFieldName(i.name, ResolverType.FIND), getTableName(i.name), 'db', 'args'))
}

const findAllResolvers = (context: InputContext[]): string[] => {
  return context.filter((i: InputContext) => i.config.findAll)
                .map((i: InputContext) => knex.findAllTemplate(getFieldName(i.name, ResolverType.FIND_ALL), getTableName(i.name), 'db', 'args'))
}

export const buildResolverTargetContext = (inputContext: InputContext[]): TargetResolverContext => {
  const context = {
    queries: [],
    mutations: []
  }

  context.queries = [...findResolvers(inputContext), ...findAllResolvers(inputContext)]
  context.mutations = [...createResolvers(inputContext), ...updateResolvers(inputContext), ...deleteResolvers(inputContext)]

  return context
}