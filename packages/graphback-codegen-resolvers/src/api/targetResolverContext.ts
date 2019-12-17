import { getFieldName, GraphbackOperationType, InputModelFieldContext, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from "@graphback/core";;
import * as templates from "../templates/LayeredResolverTemplates"
import { lowerCaseFirstChar } from '../util/lowerCaseFirstChar';
import { ResolverRelationContext, ResolverTypeContext, TargetResolverContext } from './resolverTypes';

// TODO extract to separate class that will support different types
/**
 * Resolver crud methods - create, update, delete, find and findAll
 */
const createResolver = (t: InputModelTypeContext): string | undefined => {
  if (t.config.create) {
    return templates.createTemplate(getFieldName(t.name, GraphbackOperationType.CREATE), t.name, t.config.subCreate)
  }

  return undefined
}

const updateResolver = (t: InputModelTypeContext): string | undefined => {
  if (t.config.update) {
    return templates.updateTemplate(getFieldName(t.name, GraphbackOperationType.UPDATE), t.name, t.config.subUpdate)
  }

  return undefined
}

const deleteResolver = (t: InputModelTypeContext): string | undefined => {
  if (t.config.delete) {
    return templates.deleteTemplate(getFieldName(t.name, GraphbackOperationType.DELETE), t.name, t.config.subDelete)
  }

  return undefined
}

const findResolver = (t: InputModelTypeContext): string | undefined => {
  if (t.config.find) {
    return templates.findTemplate(getFieldName(t.name, GraphbackOperationType.FIND, 's'), t.name)
  }

  return undefined
}

const findAllResolver = (t: InputModelTypeContext): string | undefined => {
  if (t.config.findAll) {
    return templates.findAllTemplate(getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'), t.name)
  }

  return undefined
}

const newSub = (t: InputModelTypeContext): string | undefined => {
  if (t.config.create && t.config.subCreate) {
    return templates.newSub(t.name)
  }

  return undefined
}

const updatedSub = (t: InputModelTypeContext): string | undefined => {
  if (t.config.update && t.config.subUpdate) {
    return templates.updatedSub(t.name)
  }

  return undefined
}

const deletedSub = (t: InputModelTypeContext): string | undefined => {
  if (t.config.delete && t.config.subDelete) {
    return templates.deletedSub(t.name)
  }

  return undefined
}

/**
 * Create context object for each individual type
 * @param context Visited info from the model
 */
export const buildGraphbackOperationTypeContext = (context: InputModelTypeContext, relations: string[]): TargetResolverContext => {
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
    typeContext.mutations = [createResolver(context), updateResolver(context), deleteResolver(context)].filter((s: string) => s !== undefined)
    typeContext.subscriptions = [newSub(context), updatedSub(context), deletedSub(context)].filter((s: string) => s !== undefined)
  }

  return typeContext
}

/**
 * Create context of all the types
 *
 * @param input InputModelTypeContext representing model
 */
// FIXME remove this class and build proper relationship support
export const buildResolverTargetContext = (input: InputModelTypeContext[]) => {
  const inputContext = input.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')
  const output: ResolverTypeContext[] = []

  const relations = createRelations(inputContext);

  inputContext.forEach((t: InputModelTypeContext) => {
    const typeRelations = relations.filter((r: ResolverRelationContext) => r.typeName === t.name)
      .map((r: ResolverRelationContext) => r.implementation);
    output.push({
      name: t.name,
      context: buildGraphbackOperationTypeContext(t, typeRelations)
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
        implementation: templates.blankResolver(f.name),
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
        implementation: templates.blankResolver(f.name),
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
        implementation: templates.blankSubscription(f.name),
        operationType: 'Subscription'
      }
    })
  }

  return [...customQueries, ...customMutations, ...customSubscriptions]
}

function createRelations(inputContext: InputModelTypeContext[]) {
  const relations = [];
  inputContext.forEach((t: InputModelTypeContext) => {
    t.fields.forEach((f: InputModelFieldContext) => {
      if (f.isType) {
        if (f.annotations.OneToOne || !f.isArray) {
          let columnName = `${f.name}Id`;
          if (f.annotations.OneToOne) {
            columnName = `${f.annotations.OneToOne.field}Id`;
          }

          relations.push({
            typeName: t.name,
            implementation: templates.typeRelation('OneToOne', columnName, f.name, f.type.toLowerCase())
          });
        }
        else if (f.annotations.OneToMany || f.isArray) {
          let columnName = `${lowerCaseFirstChar(t.name)}Id`;
          if (f.annotations.OneToMany) {
            columnName = `${f.annotations.OneToMany.field}Id`;
          }

          relations.push({
            typeName: t.name,
            implementation: templates.typeRelation('OneToMany', columnName, f.name, f.type.toLowerCase())
          });
        }
      }
    });
  });

  return relations;
}