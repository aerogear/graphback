import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition } from '@graphback/core'
import { GraphQLObjectType } from 'graphql'
import { ClientTemplate } from './ClientTemplates'
import { createMutation, deleteMutation, expandedFragment, findAllQuery, findQuery, fragment, subscription, updateMutation } from './gqlTemplates'

const gqlImport = `import gql from "graphql-tag"`

const findAllQueryTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL)

  return `${imports}

export const ${fieldName} = gql\`
  ${findAllQuery(t)}

  \$\{${t.name}ExpandedFragment}
\`
`
}

const findQueryTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND)

  return `${imports}

export const ${fieldName} = gql\`
  ${findQuery(t)}

  \$\{${t.name}ExpandedFragment}
\`
`
}


const createMutationTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `${imports}

export const ${fieldName} = gql\`
  ${createMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const updateMutationTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `${imports}

export const ${fieldName} = gql\`
  ${updateMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const deleteMutationTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `${imports}

export const ${fieldName} = gql\`
  ${deleteMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const subscriptionTS = (t: GraphQLObjectType, imports: string, subscriptionName: string) => {
  return `${imports}

export const ${subscriptionName} = gql\`
  ${subscription(t, subscriptionName)}

  \$\{${t.name}Fragment}
\`
`
}

const fragmentTS = (t: GraphQLObjectType) => {
  return `${gqlImport}

export const ${t.name}Fragment = gql\`
  ${fragment(t)}
\`
`
}

const expandedFragmentTs = (t: GraphQLObjectType) => {
  return `${gqlImport}

export const ${t.name}ExpandedFragment = gql\`
  ${expandedFragment(t)}
\`
`
}

export const createFragmentsTS = (types: ModelDefinition[]) => {
  return types.reduce((data: ClientTemplate[], model: ModelDefinition) => {
    data.push({
      name: model.graphqlType.name,
      implementation: fragmentTS(model.graphqlType)
    })
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
    if (model.crudOptions.disableGen) {
      return;
    }
    const t = model.graphqlType;
    const imports = `import gql from "graphql-tag"
import { ${t.name}ExpandedFragment } from "../fragments/${t.name}Expanded"`

    if (model.crudOptions.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND),
        implementation: findQueryTS(t, imports)
      })
    }

    if (model.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ALL),
        implementation: findAllQueryTS(t, imports)
      })
    }
  })

  return queries
}

export const createMutationsTS = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((model: ModelDefinition) => {
    if (model.crudOptions.disableGen) {
      return;
    }

    const t = model.graphqlType;
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (model.crudOptions.create) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.CREATE),
        implementation: createMutationTS(t, imports)
      })
    }

    if (model.crudOptions.update) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.UPDATE),
        implementation: updateMutationTS(t, imports)
      })
    }

    if (model.crudOptions.delete) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.DELETE),
        implementation: deleteMutationTS(t, imports)
      })
    }
  })

  return mutations
}

export const createSubscriptionsTS = (types: ModelDefinition[]) => {
  const subscriptions = []

  types.forEach((model: ModelDefinition) => {
    if (model.crudOptions.disableGen) {
      return;
    }
    const t = model.graphqlType;
    const name = model.graphqlType.name;
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (model.crudOptions.create && model.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, imports, operation)
      })
    }

    if (model.crudOptions.update && model.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, imports, operation)
      })
    }

    if (model.crudOptions.delete && model.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE);
      subscriptions.push({
        name: operation,
        implementation: subscriptionTS(t, imports, operation)
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
