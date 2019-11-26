import { getFieldName, GraphbackOperationType, InputModelFieldContext, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from '@graphback/core'


export const variableFields = (t: InputModelTypeContext) => {
  return t.fields.filter((f: InputModelFieldContext) => !f.isType && !f.isArray)
    .map((f: InputModelFieldContext) => `\$${f.name}: ${f.type}${f.isNull ? '' : '!'}`)
    .join(', ')
}


export const inputVariableFields = (t: InputModelTypeContext) => {
  return t.fields.filter((f: InputModelFieldContext) => !f.isType && !f.isArray && f.type !== 'ID')
    .map((f: InputModelFieldContext) => `\$${f.name}: ${f.type}${f.isNull ? '' : '!'}`)
    .join(', ')
}

export const variables = (t: InputModelTypeContext) => {
  return t.fields.filter((f: InputModelFieldContext) => !f.isType && !f.isArray)
    .map((f: InputModelFieldContext) => `${f.name}: \$${f.name}`)
    .join(', ')
}

export const inputVariables = (t: InputModelTypeContext) => {
  return t.fields.filter((f: InputModelFieldContext) => !f.isType && !f.isArray && f.type !== 'ID')
    .map((f: InputModelFieldContext) => `${f.name}: \$${f.name}`)
    .join(', ')
}

export const findAllQuery = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's')

  return `query ${fieldName} {
    ${fieldName} {
      ...${t.name}Fields
    }
  }`
}

export const findQuery = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND, 's')

  return `query ${fieldName}(${variableFields(t)}) {
    ${fieldName}(fields: {${variables(t)}}) {
      ...${t.name}Fields
    }
  }`
}


export const createMutation = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `mutation ${fieldName}(${inputVariableFields(t)}) {
    ${fieldName}(input: {${inputVariables(t)}}) {
      ...${t.name}Fields
    }
  }
`
}

export const updateMutation = (t: InputModelTypeContext) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `mutation ${fieldName}($id: ID!, ${inputVariableFields(t)}) {
    ${fieldName}(id: $id, input: {${inputVariables(t)}}) {
      ...${t.name}Fields
    }
  }
`
}

export const deleteMutation = (t: InputModelTypeContext, ) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `mutation ${fieldName}($id: ID!) {
    ${fieldName}(id: $id) {
      id
    }
  }
`
}

export const subscription = (t: InputModelTypeContext, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.name}`

  return `subscription ${fieldName} {
    ${fieldName} {
      ...${t.name}Fields
    }
  }`
}

export const fragment = (t: InputModelTypeContext) => {
  return `fragment ${t.name}Fields on ${t.name} {
    ${t.fields.filter((f: InputModelFieldContext) => !f.isArray && !f.isType).map((f: InputModelFieldContext) => `${f.name}`).join('\n    ')}
  }`
}

export const createFragments = (types: InputModelTypeContext[]) => {
  return types.map((t: InputModelTypeContext) => {
    return {
      name: t.name,
      implementation: fragment(t)
    }
  })
}

export const createQueries = (types: InputModelTypeContext[]) => {
  const queries = []

  types.forEach((t: InputModelTypeContext) => {

    if (t.config.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND),
        implementation: findQuery(t) + fragment(t)
      })
    }

    if (t.config.findAll) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQuery(t) + fragment(t)
      })
    }
  })

  return queries
}

const createMutations = (types: InputModelTypeContext[]) => {
  const mutations = []

  types.forEach((t: InputModelTypeContext) => {
    if (t.config.create) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.CREATE),
        implementation: createMutation(t) + fragment(t)
      })
    }

    if (t.config.update) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.UPDATE),
        implementation: updateMutation(t) + fragment(t)
      })
    }

    if (t.config.delete) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.DELETE),
        implementation: deleteMutation(t) + fragment(t)
      })
    }
  })

  return mutations
}

const createSubscriptions = (types: InputModelTypeContext[]) => {
  const subscriptions = []

  types.forEach((t: InputModelTypeContext) => {
    if (t.config.create && t.config.subCreate) {
      subscriptions.push({
        name: `new${t.name}`,
        implementation: subscription(t, 'new') + fragment(t)
      })
    }

    if (t.config.update && t.config.subUpdate) {
      subscriptions.push({
        name: `updated${t.name}`,
        implementation: subscription(t, 'updated') + fragment(t)
      })
    }

    if (t.config.delete && t.config.subDelete) {
      subscriptions.push({
        name: `deleted${t.name}`,
        implementation: subscription(t, 'deleted') + fragment(t)
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsGQL = (inputContext: InputModelTypeContext[]) => {
  const context = inputContext.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  return {
    fragments: createFragments(context),
    queries: createQueries(context),
    mutations: createMutations(context),
    subscriptions: createSubscriptions(context)
  }
}
