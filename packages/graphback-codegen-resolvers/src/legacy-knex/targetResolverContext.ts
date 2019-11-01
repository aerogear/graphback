import { getFieldName, getTableName, GraphbackOperationType, InputModelFieldContext, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from "@graphback/codegen-core";;
import { KnexResolver } from './KnexResolver';
import { ResolverRelationContext, ResolverTypeContext, TargetResolverContext } from './resolverTypes';

const knex = new KnexResolver()

/**
 * Resolver crud methods - create, update, delete, find and findAll
 */
const createResolver = (t: InputModelTypeContext, database: string): string => {
  if (t.config.create) {
    return knex.createTemplate(database, t.config.subCreate, getFieldName(t.name, GraphbackOperationType.CREATE), getTableName(t.name), t.name)
  }

  return undefined
}

const updateResolver = (t: InputModelTypeContext): string => {
  if (t.config.update) {
    return knex.updateTemplate(t.config.subUpdate, getFieldName(t.name, GraphbackOperationType.UPDATE), getTableName(t.name), t.name)
  }

  return undefined
}

const deleteResolver = (t: InputModelTypeContext): string => {
  if (t.config.delete) {
    return knex.deleteTemplate(t.config.subDelete, getFieldName(t.name, GraphbackOperationType.DELETE), getTableName(t.name), t.name)
  }

  return undefined
}

const findResolver = (t: InputModelTypeContext): string => {
  if (t.config.find) {
    return knex.findTemplate(getFieldName(t.name, GraphbackOperationType.FIND, 's'), getTableName(t.name))
  }

  return undefined
}

const findAllResolver = (t: InputModelTypeContext): string => {
  if (t.config.findAll) {
    return knex.findAllTemplate(getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'), getTableName(t.name))
  }

  return undefined
}

/**
 * Subscriptions - new, updated and deleted
 */

const newSub = (t: InputModelTypeContext): string => {
  if (t.config.create && t.config.subCreate) {
    return knex.newSub(t.name)
  }

  return undefined
}

const updatedSub = (t: InputModelTypeContext): string => {
  if (t.config.update && t.config.subUpdate) {
    return knex.updatedSub(t.name)
  }

  return undefined
}

const deletedSub = (t: InputModelTypeContext): string => {
  if (t.config.delete && t.config.subDelete) {
    return knex.deletedSub(t.name)
  }

  return undefined
}

/**
 * Create enum for subscriptions implementation
 * @param t Type object
 */
const createSubscriptionTypes = (t: InputModelTypeContext): string => {
  const subscriptionEnum = []
  if (t.config.create && t.config.subCreate) {
    subscriptionEnum.push(`NEW_${t.name.toUpperCase()} = 'new${t.name.toLowerCase()}'`)
  }
  if (t.config.update && t.config.subUpdate) {
    subscriptionEnum.push(`UPDATED_${t.name.toUpperCase()} = 'updated${t.name.toLowerCase()}'`)
  }
  if (t.config.delete && t.config.subDelete) {
    subscriptionEnum.push(`DELETED_${t.name.toUpperCase()} = 'deleted${t.name.toLowerCase()}'`)
  }

  return subscriptionEnum.join(`,\n  `)
}

/**
 * Create context object for each individual type
 * @param context Visited info from the model
 */
export const buildGraphbackOperationTypeContext = (context: InputModelTypeContext, database: string, relations: string[]): TargetResolverContext => {
  const typeContext = {
    relations: [],
    queries: [],
    mutations: [],
    subscriptions: [],
    subscriptionTypes: ''
  }

  if (relations.length) {
    typeContext.relations = relations
  }
  if (!context.config.disableGen) {
    typeContext.queries = [findResolver(context), findAllResolver(context)].filter((s: string) => s !== undefined)
    typeContext.mutations = [createResolver(context, database), updateResolver(context), deleteResolver(context)].filter((s: string) => s !== undefined)
    typeContext.subscriptions = [newSub(context), updatedSub(context), deletedSub(context)].filter((s: string) => s !== undefined)
    typeContext.subscriptionTypes = createSubscriptionTypes(context)
  }

  return typeContext
}

/**
 * Create context of all the types
 * @param input Input visited object
 */
export const buildResolverTargetContext = (input: InputModelTypeContext[], database: string) => {
  const inputContext = input.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
  const output: ResolverTypeContext[] = []

  const relations = []

  inputContext.forEach((t: InputModelTypeContext) => {
    t.fields.forEach((f: InputModelFieldContext) => {
      if (f.isType) {
        if (f.directives.OneToOne || !f.isArray) {
          let columnName = `${t.name.toLowerCase()}Id`
          if (f.directives.OneToOne) {
            columnName = f.directives.OneToOne.field
          }
          relations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToOne', columnName, f.name, f.type.toLowerCase())
          })
        } else if (f.directives.OneToMany || f.isArray) {
          let columnName = `${t.name.toLowerCase()}Id`
          if (f.directives.OneToMany) {
            columnName = f.directives.OneToMany.field
          }
          relations.push({
            typeName: t.name,
            implementation: knex.typeRelation('OneToMany', columnName, f.name, f.type.toLowerCase())
          })
        }
      }
    })
  })

  inputContext.forEach((t: InputModelTypeContext) => {
    output.push({
      name: t.name,
      context: buildGraphbackOperationTypeContext(t, database, relations.filter((r: ResolverRelationContext) => r.typeName === t.name).map((r: ResolverRelationContext) => r.implementation))
    })
  })

  return output
}

/**
 * Create queries, mutations or subscriptions from custom input provided
 * @param inputContext Input visited object
 */
export const createCustomContext = (inputContext: InputModelTypeContext[]) => {
  const queryType = inputContext.filter((t: InputModelTypeContext) => t.name === 'Query')
  let customQueries = []
  if (queryType.length) {
    customQueries = queryType[0].fields.map((f: InputModelFieldContext) => {
      return {
        name: f.name,
        implementation: knex.blankResolver(f.name),
        operationType: 'Query'
      }
    })
  }

  const mutationType = inputContext.filter((t: InputModelTypeContext) => t.name === 'Mutation')
  let customMutations = []
  if (mutationType.length) {
    customMutations = mutationType[0].fields.map((f: InputModelFieldContext) => {
      return {
        name: f.name,
        implementation: knex.blankResolver(f.name),
        operationType: 'Mutation'
      }
    })
  }

  const subscriptionType = inputContext.filter((t: InputModelTypeContext) => t.name === 'Subscription')
  let customSubscriptions = []
  if (subscriptionType.length) {
    customSubscriptions = subscriptionType[0].fields.map((f: InputModelFieldContext) => {
      return {
        name: f.name,
        implementation: knex.blankSubscription(f.name),
        operationType: 'Subscription'
      }
    })
  }

  return [...customQueries, ...customMutations, ...customSubscriptions]
}
