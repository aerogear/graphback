import { getFieldName, GraphbackOperationType, ModelDefinition } from '@graphback/core'
import { GraphQLObjectType } from 'graphql'
import { createMutation, deleteMutation, findAllQuery, findQuery, fragment, subscription, updateMutation } from './gqlTemplates'

const gqlImport = `import gql from "graphql-tag"`

const findAllQueryTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's')

  return `${imports}

export const ${fieldName} = gql\`
  ${findAllQuery(t)}

  \$\{${t.name}ExpandedFragment}
\`
`
}

const findQueryTS = (t: GraphQLObjectType, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND, 's')

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

const subscriptionTS = (t: GraphQLObjectType, imports: string, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.name}`

  return `${imports}

export const ${fieldName} = gql\`
  ${subscription(t, subscriptionType)}

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

export const createFragmentsTS = (types: ModelDefinition[]) => {
  return types.map((t: ModelDefinition) => {
    return [{
      name: t.graphqlType.name,
      implementation: fragmentTS(t.graphqlType)
    },
    {
      name: t.graphqlType.name,
      implementation: fragmentTS(t.graphqlType)
    }
  ]
  })
}

export const createQueriesTS = (types: ModelDefinition[]) => {
  const queries = []

  types.forEach((model: ModelDefinition) => {
    const t = model.graphqlType;
    const imports = `import gql from "graphql-tag"
import { ${t.name}ExpandedFragment } from "../fragments/${t.name}Expanded"`

    if (model.crudOptions.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND, 's'),
        implementation: findQueryTS(t, imports)
      })
    }

    if (model.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQueryTS(t, imports)
      })
    }
  })

  return queries
}

export const createMutationsTS = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((model: ModelDefinition) => {
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
    const t = model.graphqlType;

    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (model.crudOptions.create && model.crudOptions.subCreate) {
      subscriptions.push({
        name: `new${t.name}`,
        implementation: subscriptionTS(t, imports, 'new')
      })
    }

    if (model.crudOptions.update && model.crudOptions.subUpdate) {
      subscriptions.push({
        name: `updated${t.name}`,
        implementation: subscriptionTS(t, imports, 'updated')
      })
    }

    if (model.crudOptions.delete && model.crudOptions.subDelete) {
      subscriptions.push({
        name: `deleted${t.name}`,
        implementation: subscriptionTS(t, imports, 'deleted')
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsGQL = (inputContext: ModelDefinition[]) => {

  return {
    fragments: createFragmentsTS(inputContext),
    queries: createQueriesTS(inputContext),
    mutations: createMutationsTS(inputContext),
    subscriptions: createSubscriptionsTS(inputContext)
  }
}
