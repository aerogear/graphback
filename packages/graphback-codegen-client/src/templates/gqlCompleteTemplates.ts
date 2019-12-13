import { getFieldName, GraphbackOperationType, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from '@graphback/core'
import { createMutation, deleteMutation, findAllQuery, findQuery, fragment, subscription, updateMutation} from './gqlTemplates'


const findAllQueryGqlComplete = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's')

  return `


  ${findAllQuery(t)}

  ${fragment(t)}

`
}

const findQueryGqlComplete = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND, 's')

  return `


  ${findQuery(t)}

  ${fragment(t)}

`
}


const createMutationGqlComplete = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `
  ${createMutation(t)}

  ${fragment(t)}
`
}

const updateMutationGqlComplete = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `

  ${updateMutation(t)}

  ${fragment(t)}

`
}

const deleteMutationGqlComplete = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `

  ${deleteMutation(t)}

  ${fragment(t)}

`
}

const subscriptionGqlComplete = (t: InputModelTypeContext, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.name}`

  return `

  ${subscription(t, subscriptionType)}

  ${fragment(t)}

`
}

 

export const createQueriesGqlComplete = (types: InputModelTypeContext[]) => {
  const queries = []

  types.forEach((t: InputModelTypeContext) => {
    if (t.config.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND, 's'),
        implementation: findQueryGqlComplete(t)
      })
    }

    if (t.config.findAll) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQueryGqlComplete(t)
      })
    }
  })

  return queries
}

export const createMutationsGqlComplete = (types: InputModelTypeContext[]) => {
  const mutations = []

  types.forEach((t: InputModelTypeContext) => {
    if (t.config.create) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.CREATE),
        implementation: createMutationGqlComplete(t)
      })
    }

    if (t.config.update) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.UPDATE),
        implementation: updateMutationGqlComplete(t)
      })
    }

    if (t.config.delete) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.DELETE),
        implementation: deleteMutationGqlComplete(t)
      })
    }
  })

  return mutations
}

export const createSubscriptionsGqlComplete = (types: InputModelTypeContext[]) => {
  const subscriptions = []

  types.forEach((t: InputModelTypeContext) => {
    if (t.config.create && t.config.subCreate) {
      subscriptions.push({
        name: `new${t.name}`,
        implementation: subscriptionGqlComplete(t, 'new')
      })
    }

    if (t.config.update && t.config.subUpdate) {
      subscriptions.push({
        name: `updated${t.name}`,
        implementation: subscriptionGqlComplete(t, 'updated')
      })
    }

    if (t.config.delete && t.config.subDelete) {
      subscriptions.push({
        name: `deleted${t.name}`,
        implementation: subscriptionGqlComplete(t, 'deleted')
      })
    }
  })

  return subscriptions
}


/**
 * GQL templates that will have embedded fragments
 * 
 * @param inputContext 
 */
export const createClientDocumentsGqlComplete = (inputContext: InputModelTypeContext[]) => {
  const context = inputContext.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  return {
    // Fragments are embeeded and not needed here :)
    fragments: [],
    queries: createQueriesGqlComplete(context),
    mutations: createMutationsGqlComplete(context),
    subscriptions: createSubscriptionsGqlComplete(context)
  }
}
