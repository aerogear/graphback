import { Field, Type } from '../../ContextTypes';
import { getFieldName, getTableName, ResolverType } from '../../utils';
import * as knex from './resolverImplementation'

export interface TargetResolverContext {
  relations: string[]
  queries: string[]
  mutations: string[]
  subscriptions: string[],
  subscriptionTypes: string[]
}

interface RelationImplementation {
  typeName: string
  implementation: string
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

const createRelationResolvers = (types: string[], relations: RelationImplementation[]): string[] => {
  return types.map((relationType: string) => `${relationType}: {
    ${relations.filter((r: RelationImplementation) => r.typeName === relationType).map((r: RelationImplementation) => r.implementation).join(',\n    ')}
  }`)
}

export const buildResolverTargetContext = (inputContext: Type[]): TargetResolverContext => {
  const relationImplementations = []
  const relationTypes = []

  inputContext.forEach((t: Type) => {
    t.fields.forEach((f: Field) => {
      if(f.isType){createRelationResolvers([...new Set(relationTypes)], relationImplementations)
        if(f.directives.OneToOne || !f.isArray) {
          relationTypes.push(t.name)
          relationImplementations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToOne', t.name, f.name, f.type.toLowerCase())
          })
        } else if(f.directives.OneToMany || f.isArray) {
          relationTypes.push(t.name)
          relationImplementations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToMany', t.name, f.name, f.type.toLowerCase())
          })
        }
      }
    })
  });

  const context = {
    relations: [],
    queries: [],
    mutations: [],
    subscriptions: [],
    subscriptionTypes: []
  }

  context.relations = createRelationResolvers([...new Set(relationTypes)], relationImplementations)
  context.queries = [...findResolvers(inputContext), ...findAllResolvers(inputContext)]
  context.mutations = [...createResolvers(inputContext), ...updateResolvers(inputContext), ...deleteResolvers(inputContext)]
  context.subscriptions = [...newSubs(inputContext), ...updatedSubs(inputContext), ...deletedSubs(inputContext)]
  context.subscriptionTypes = createSubscriptionTypes(inputContext)

  return context
}