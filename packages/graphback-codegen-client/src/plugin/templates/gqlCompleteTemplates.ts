import { getFieldName, GraphbackOperationType, ModelDefinition } from '@graphback/core'
import { GraphQLObjectType } from 'graphql';
import { expandedFragment, fragment } from './gqlTemplates';

export const findAllQuery = (t: GraphQLObjectType) => {
  return `

  ${findAllQuery(t)}

  ${expandedFragment(t)}

`
}

export const findQuery = (t: GraphQLObjectType) => {

  return `

  ${findQuery(t)}

  ${expandedFragment(t)}

`
}


export const createMutation = (t: GraphQLObjectType) => {

  return `

  ${createMutation(t)}

  ${fragment(t)}

`
}

export const updateMutation = (t: GraphQLObjectType) => {
  return `

  ${updateMutation(t)}

  ${fragment(t)}

`
}

export const deleteMutation = (t: GraphQLObjectType) => {
  return `

  ${deleteMutation(t)}

  ${fragment(t)}
`
}

export const subscription = (t: GraphQLObjectType, subscriptionType: string) => {
  return `

  ${subscription(t, subscriptionType)}

  ${fragment(t)}

`
}
 

export const createQueries = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((t: ModelDefinition) => {

    if (t.crudOptions.find) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND),
        implementation: findQuery(t.graphqlType)
      })
    }

    if (t.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQuery(t.graphqlType)
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
        implementation: createMutation(t.graphqlType)
      })
    }

    if (t.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.UPDATE),
        implementation: updateMutation(t.graphqlType)
      })
    }

    if (t.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.DELETE),
        implementation: deleteMutation(t.graphqlType)
      })
    }
  })

  return mutations
}

const createSubscriptions = (types: ModelDefinition[]) => {
  const subscriptions = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.create && t.crudOptions.subCreate) {
      subscriptions.push({
        name: `new${t.graphqlType.name} `,
        implementation: subscription(t.graphqlType, 'new')
      })
    }

    if (t.crudOptions.update && t.crudOptions.subUpdate) {
      subscriptions.push({
        name: `updated${t.graphqlType.name} `,
        implementation: subscription(t.graphqlType, 'updated')
      })
    }

    if (t.crudOptions.delete && t.crudOptions.subDelete) {
      subscriptions.push({
        name: `deleted${t.graphqlType.name} `,
        implementation: subscription(t.graphqlType, 'deleted')
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

