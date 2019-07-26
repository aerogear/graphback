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

interface RelationImplementation {
  typeName: string
  implementation: string
}

const createResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.create)
                .map((i: Type) => knex.createTemplate(i.config.subCreate, getFieldName(i.name, ResolverType.CREATE), getTableName(i.name), i.name))
}

const updateResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.update)
                .map((i: Type) => knex.updateTemplate(i.config.subUpdate, getFieldName(i.name, ResolverType.UPDATE), getTableName(i.name), i.name))
}

const deleteResolvers = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.delete)
                .map((i: Type) => knex.deleteTemplate(i.config.subDelete, getFieldName(i.name, ResolverType.DELETE), getTableName(i.name), i.name))
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
  return context.filter((i: Type) => i.config.subCreate)
                .map((i: Type) => knex.newSub(i.name))
}

const updatedSubs = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.subUpdate)
                .map((i: Type) => knex.updatedSub(i.name))
}

const deletedSubs = (context: Type[]): string[] => {
  return context.filter((i: Type) => i.config.subDelete)
                .map((i: Type) => knex.deletedSub(i.name))
}

const createSubscriptionTypes = (context: Type[]): string => {
  const subscriptionEnum = []
  context.map((t: Type) => {
    if(t.config.subCreate) {
      subscriptionEnum.push(`NEW_${t.name.toUpperCase()} = 'new${t.name.toLowerCase()}'`)
    }
    if(t.config.subUpdate) {
      subscriptionEnum.push(`UPDATED_${t.name.toUpperCase()} = 'updated${t.name.toLowerCase()}'`)
    }
    if(t.config.subDelete) {
      subscriptionEnum.push(`DELETED_${t.name.toUpperCase()} = 'deleted${t.name.toLowerCase()}'`)
    }
  })

  return subscriptionEnum.join(`,\n  `)
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
      if(f.isType){
        if(f.directives.OneToOne || !f.isArray) {
          let columnName = `${t.name.toLowerCase()}Id`
          if(f.directives.OneToOne) {
            columnName = f.directives.OneToOne.field
          }
          relationTypes.push(t.name)
          relationImplementations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToOne', columnName, f.name, f.type.toLowerCase())
          })
        } else if(f.directives.OneToMany || f.isArray) {
          let columnName = `${t.name.toLowerCase()}Id`
          if(f.directives.OneToMany) {
            columnName = f.directives.OneToMany.field
          }
          relationTypes.push(t.name)
          relationImplementations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToMany', columnName, f.name, f.type.toLowerCase())
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
    subscriptionTypes: ''
  }

  context.relations = createRelationResolvers([...new Set(relationTypes)], relationImplementations)
  context.queries = [...findResolvers(inputContext), ...findAllResolvers(inputContext)]
  context.mutations = [...createResolvers(inputContext), ...updateResolvers(inputContext), ...deleteResolvers(inputContext)]
  context.subscriptions = [...newSubs(inputContext), ...updatedSubs(inputContext), ...deletedSubs(inputContext)]
  context.subscriptionTypes = createSubscriptionTypes(inputContext)

  return context
}