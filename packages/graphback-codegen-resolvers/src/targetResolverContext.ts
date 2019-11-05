import { getFieldName, getTableName, GraphbackOperationType, InputModelFieldContext, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from "@graphback/codegen-core";;
import { ResolverRelationContext, ResolverTypeContext, TargetResolverContext } from './api/resolverTypes';
import * as serviceTemplates from './templates/LayeredResolverTemplates';

 
/**
 * Resolver crud methods - create, update, delete, find and findAll
 */
const createResolver = (t: InputModelTypeContext, database: string): string => {
  if (t.config.create) {
    return serviceTemplates.createTemplate(database, t.config.subCreate, getFieldName(t.name, GraphbackOperationType.CREATE), getTableName(t.name), t.name)
  }

  return undefined
}

const updateResolver = (t: InputModelTypeContext): string => {
  if (t.config.update) {
    return serviceTemplates.updateTemplate(t.config.subUpdate, getFieldName(t.name, GraphbackOperationType.UPDATE), getTableName(t.name), t.name)
  }

  return undefined
}

const deleteResolver = (t: InputModelTypeContext): string => {
  if (t.config.delete) {
    return serviceTemplates.deleteTemplate(t.config.subDelete, getFieldName(t.name, GraphbackOperationType.DELETE), getTableName(t.name), t.name)
  }

  return undefined
}

const findResolver = (t: InputModelTypeContext): string => {
  if (t.config.find) {
    return serviceTemplates.findTemplate(getFieldName(t.name, GraphbackOperationType.FIND, 's'), getTableName(t.name))
  }

  return undefined
}

const findAllResolver = (t: InputModelTypeContext): string => {
  if (t.config.findAll) {
    return serviceTemplates.findAllTemplate(getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'), getTableName(t.name))
  }

  return undefined
}

/**
 * Subscriptions - new, updated and deleted
 */

const newSub = (t: InputModelTypeContext): string => {
  if (t.config.create && t.config.subCreate) {
    return serviceTemplates.newSub(t.name)
  }

  return undefined
}

const updatedSub = (t: InputModelTypeContext): string => {
  if (t.config.update && t.config.subUpdate) {
    return serviceTemplates.updatedSub(t.name)
  }

  return undefined
}

const deletedSub = (t: InputModelTypeContext): string => {
  if (t.config.delete && t.config.subDelete) {
    return serviceTemplates.deletedSub(t.name)
  }

  return undefined
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
  }

  if (relations.length) {
    typeContext.relations = relations
  }
  if (!context.config.disableGen) {
    typeContext.queries = [findResolver(context), findAllResolver(context)].filter((s: string) => s !== undefined)
    typeContext.mutations = [createResolver(context, database), updateResolver(context), deleteResolver(context)].filter((s: string) => s !== undefined)
    typeContext.subscriptions = [newSub(context), updatedSub(context), deletedSub(context)].filter((s: string) => s !== undefined)
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
            implementation: serviceTemplates.typeRelation('OneToOne', columnName, f.name, f.type.toLowerCase())
          })
        } else if (f.directives.OneToMany || f.isArray) {
          let columnName = `${t.name.toLowerCase()}Id`
          if (f.directives.OneToMany) {
            columnName = f.directives.OneToMany.field
          }
          relations.push({
            typeName: t.name,
            implementation: serviceTemplates.typeRelation('OneToMany', columnName, f.name, f.type.toLowerCase())
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
        implementation: serviceTemplates.blankResolver(f.name),
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
        implementation: serviceTemplates.blankResolver(f.name),
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
        implementation: serviceTemplates.blankSubscription(f.name),
        operationType: 'Subscription'
      }
    })
  }

  return [...customQueries, ...customMutations, ...customSubscriptions]
}
