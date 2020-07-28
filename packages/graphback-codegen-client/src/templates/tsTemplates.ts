import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, getInputTypeName } from '@graphback/core'
import { GraphQLObjectType } from 'graphql'
import { ClientTemplate } from './ClientTemplates'
import { createMutation, deleteMutation, expandedFragment, findOneQuery, findQuery, fragment, subscription, updateMutation } from './gqlTemplates'

const findOneQueryTS = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ONE)

  return `export const ${fieldName} = gql\`
  ${findOneQuery(t)}

  \$\{${t.graphqlType.name}ExpandedFragment}
\`
`
}

const findQueryTS = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND)

  return `export const ${fieldName} = gql\`
  ${findQuery(t)}

  \$\{${t.name}ExpandedFragment}
\`
`
}


const createMutationTS = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `export const ${fieldName} = gql\`
  ${createMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const updateMutationTS = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `export const ${fieldName} = gql\`
  ${updateMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const deleteMutationTS = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `export const ${fieldName} = gql\`
  ${deleteMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const subscriptionTS = (t: GraphQLObjectType, subscriptionName: string, inputField: string) => {
  return `export const ${subscriptionName} = gql\`
  ${subscription(t, subscriptionName, inputField)}

  \$\{${t.name}Fragment}
\`
`
}

const fragmentTS = (t: GraphQLObjectType) => {
  return `export const ${t.name}Fragment = gql\`
  ${fragment(t)}
\`
`
}

const expandedFragmentTs = (t: GraphQLObjectType) => {
  return `export const ${t.name}ExpandedFragment = gql\`
  ${expandedFragment(t)}
\`
`
}

export const createFragmentsTS = (types: ModelDefinition[]) => {
  return types.reduce((data: ClientTemplate[], model: ModelDefinition, currentIndex: number) => {
    const gqlImport = (currentIndex === 0) ? `import gql from "graphql-tag"` : '';

    data.push({
      name: model.graphqlType.name,
      implementation: `${gqlImport}\n\n${fragmentTS(model.graphqlType)}`,
    });
    data.push({
      name: `${model.graphqlType.name}Expanded`,
      implementation: expandedFragmentTs(model.graphqlType)
    });

    return data;
  }, [])
}

export const createQueriesTS = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((model: ModelDefinition) => {

    const t = model.graphqlType;
    if (model.crudOptions.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND),
        implementation: findQueryTS(t)
      })
    }

    if (model.crudOptions.findOne) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ONE),
        implementation: findOneQueryTS(model)
      })
    }
  })

  return queries
}

export const createMutationsTS = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((model: ModelDefinition) => {
    const t = model.graphqlType;
    if (model.crudOptions.create) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.CREATE),
        implementation: createMutationTS(t)
      })
    }

    if (model.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.UPDATE),
        implementation: updateMutationTS(t)
      })
    }

    if (model.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.DELETE),
        implementation: deleteMutationTS(t)
      })
    }
  })

  return mutations
}

export const createSubscriptionsTS = (types: ModelDefinition[]) => {
  const subscriptions = []

  types.forEach((model: ModelDefinition) => {
    const t = model.graphqlType;
    const name = model.graphqlType.name;
    if (model.crudOptions.create && model.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE);
      const inputTypeField = getInputTypeName(model.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_CREATE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, operation, inputTypeField)
      })
    }

    if (model.crudOptions.update && model.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE);
      const inputTypeField = getInputTypeName(model.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_UPDATE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, operation, inputTypeField)
      })
    }

    if (model.crudOptions.delete && model.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE);
      const inputTypeField = getInputTypeName(model.graphqlType.name, GraphbackOperationType.SUBSCRIPTION_DELETE)
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, operation, inputTypeField)
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsTS = (inputContext: ModelDefinition[]) => {

  return {
    fragments: createFragmentsTS(inputContext),
    queries: createQueriesTS(inputContext),
    mutations: createMutationsTS(inputContext),
    subscriptions: createSubscriptionsTS(inputContext)
  }
}
