import { getFieldName, GraphbackOperationType, InputModelFieldContext, ModelDefinition } from '@graphback/core'
import { print } from 'graphql'


const getFields = (t: ModelDefinition) => {
  return Object.values(t.graphqlType.getFields());
}

export const fragment = (t: ModelDefinition) => {
  // TODO
  return `fragment ${t.graphqlType.name}Fields on ${t.graphqlType.name} {
    ${getFields(t).map(f => `${print(f.astNode)}`).join('\n    ')}
  }`
}

export const variableFields = (t: ModelDefinition) => {
  // TODO
  return getFields(t).map(f => `${f.name}:${f.type}`).join(', ')
}

export const inputVariableFields = (t: ModelDefinition) => {
  // TODO
  return getFields(t).map(f => `${f.name}:${f.type}`).join(', ')
}

export const variables = (t: ModelDefinition) => {
  // TODO
  return getFields(t).map(f => `${f.name}:${f.type}`).join(', ')
}

export const inputVariables = (t: ModelDefinition) => {
  // TODO
  return getFields(t).join(', ')
}

export const findAllQuery = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ALL, 's')

  return `query ${fieldName} {
    ${fieldName} {
      ...${t.graphqlType.name}Fields
    }
  }`
}

export const findQuery = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.FIND, 's')

  return `query ${fieldName}(${variableFields(t)}) {
    ${fieldName}(fields: {${variables(t)}}) {
      ...${t.graphqlType.name}Fields
    }
  }`
}


export const createMutation = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.CREATE)

  return `mutation ${fieldName}(${inputVariableFields(t)}) {
    ${fieldName}(input: {${inputVariables(t)}}) {
      ...${t.graphqlType.name}Fields
    }
  }
`
}

export const updateMutation = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.UPDATE)

  return `mutation ${fieldName}($id: ID!, ${inputVariableFields(t)}) {
    ${fieldName}(id: $id, input: {${inputVariables(t)}}) {
      ...${t.graphqlType.name}Fields
    }
  }
`
}

export const deleteMutation = (t: ModelDefinition, ) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.DELETE)

  return `mutation ${fieldName}($id: ID!) {
    ${fieldName}(id: $id)
  }
`
}

export const subscription = (t: ModelDefinition, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.graphqlType.name}`

  return `subscription ${fieldName} {
    ${fieldName} {
      ...${t.graphqlType.name}Fields
    }
  }`
}

export const createFragments = (types: ModelDefinition[]) => {
  return types.map((t: ModelDefinition) => {
    return {
      name: t.graphqlType.name,
      implementation: fragment(t)
    }
  })
}

export const createQueries = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((t: ModelDefinition) => {

    if (t.crudOptions.find) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND),
        implementation: findQuery(t)
      })
    }

    if (t.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQuery(t)
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
        implementation: createMutation(t)
      })
    }

    if (t.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.UPDATE),
        implementation: updateMutation(t)
      })
    }

    if (t.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.DELETE),
        implementation: deleteMutation(t)
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
        name: `new${t.graphqlType.name}`,
        implementation: subscription(t, 'new')
      })
    }

    if (t.crudOptions.update && t.crudOptions.subUpdate) {
      subscriptions.push({
        name: `updated${t.graphqlType.name}`,
        implementation: subscription(t, 'updated')
      })
    }

    if (t.crudOptions.delete && t.crudOptions.subDelete) {
      subscriptions.push({
        name: `deleted${t.graphqlType.name}`,
        implementation: subscription(t, 'deleted')
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsGQL = (inputContext: ModelDefinition[]) => {

  return {
    fragments: createFragments(inputContext),
    queries: createQueries(inputContext),
    mutations: createMutations(inputContext),
    subscriptions: createSubscriptions(inputContext)
  }
}
