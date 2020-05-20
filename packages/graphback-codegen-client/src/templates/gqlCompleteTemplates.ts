import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, getInputTypeName } from '@graphback/core'
import { GraphQLObjectType } from 'graphql';
import { createMutation, deleteMutation, expandedFragment, findOneQuery, findQuery, fragment, subscription, updateMutation } from './gqlTemplates';

export const findOneQueryComplete = (t: GraphQLObjectType) => {
  return `

${findOneQuery(t)}

${expandedFragment(t)}

`
}

export const findQueryComplete = (t: GraphQLObjectType) => {

  return `

${findQuery(t)}

${expandedFragment(t)}

`
}


export const createMutationComplete = (t: GraphQLObjectType) => {

  return `

${createMutation(t)}

${fragment(t)}

`
}

export const updateMutationComplete = (t: GraphQLObjectType) => {
  return `

${updateMutation(t)}

${fragment(t)}

`
}

export const deleteMutationComplete = (t: GraphQLObjectType) => {
  return `

${deleteMutation(t)}

${fragment(t)}

`
}

export const subscriptionComplete = (t: GraphQLObjectType, subscriptionName: string, inputType: string) => {
  return `

${subscription(t, subscriptionName, inputType)}

${fragment(t)}

`
}


export const createQueries = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.find) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND),
        implementation: findQueryComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.findOne) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ONE),
        implementation: findOneQueryComplete(t.graphqlType)
      })
    }
  })

  return queries
}

const createMutations = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.create) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.CREATE),
        implementation: createMutationComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.UPDATE),
        implementation: updateMutationComplete(t.graphqlType)
      })
    }

    if (t.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.DELETE),
        implementation: deleteMutationComplete(t.graphqlType)
      })
    }
  })

  return mutations
}

const createSubscriptions = (types: ModelDefinition[]) => {
  const subscriptions = []

  types.forEach((t: ModelDefinition) => {
    const name = t.graphqlType.name;
    if (t.crudOptions.create && t.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE);
      const inputTypeField = getInputTypeName(t.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_CREATE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation, inputTypeField)
      })
    }

    if (t.crudOptions.update && t.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE);
      const inputTypeField = getInputTypeName(t.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_UPDATE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation, inputTypeField)
      })
    }

    if (t.crudOptions.delete && t.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE);
      const inputTypeField = getInputTypeName(t.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_DELETE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionComplete(t.graphqlType, operation, inputTypeField)
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsGqlComplete = (inputContext: ModelDefinition[]) => {

  return {
    fragments: [],
    queries: createQueries(inputContext),
    mutations: createMutations(inputContext),
    subscriptions: createSubscriptions(inputContext)
  }
}

