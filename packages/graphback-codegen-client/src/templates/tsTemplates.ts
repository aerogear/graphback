import { getFieldName, GraphbackOperationType, InputModelTypeContext, OBJECT_TYPE_DEFINITION } from '@graphback/core'
import { createMutation, deleteMutation, findAllQuery, findQuery, fragment, subscription, updateMutation} from './gqlTemplates'

const gqlImport = `import gql from "graphql-tag"`

const findAllQueryTS = (t: InputModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's')

  return `${imports}

export const ${fieldName} = gql\`
  ${findAllQuery(t)}

  \$\{${t.name}Fragment}
\`
`
}

const findQueryTS = (t: InputModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND, 's')

  return `${imports}

export const ${fieldName} = gql\`
  ${findQuery(t)}

  \$\{${t.name}Fragment}
\`
`
}


const createMutationTS = (t: InputModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `${imports}

export const ${fieldName} = gql\`
  ${createMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const updateMutationTS = (t: InputModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `${imports}

export const ${fieldName} = gql\`
  ${updateMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const deleteMutationTS = (t: InputModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `${imports}

export const ${fieldName} = gql\`
  ${deleteMutation(t)}

  \$\{${t.name}Fragment}
\`
`
}

const subscriptionTS = (t: InputModelTypeContext, imports: string, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.name}`

  return `${imports}

export const ${fieldName} = gql\`
  ${subscription(t, subscriptionType)}

  \$\{${t.name}Fragment}
\`
`
}

const fragmentTS = (t: InputModelTypeContext) => {
  return `${gqlImport}

export const ${t.name}Fragment = gql\`
  ${fragment(t)}
\`
`
}

export const createFragmentsTS = (types: InputModelTypeContext[]) => {
  return types.map((t: InputModelTypeContext) => {
    return {
      name: t.name,
      implementation: fragmentTS(t)
    }
  })
}

export const createQueriesTS = (types: InputModelTypeContext[]) => {
  const queries = []

  types.forEach((t: InputModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (t.config.find) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND, 's'),
        implementation: findQueryTS(t, imports)
      })
    }

    if (t.config.findAll) {
      queries.push({
        name: getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's'),
        implementation: findAllQueryTS(t, imports)
      })
    }
  })

  return queries
}

export const createMutationsTS = (types: InputModelTypeContext[]) => {
  const mutations = []

  types.forEach((t: InputModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (t.config.create) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.CREATE),
        implementation: createMutationTS(t, imports)
      })
    }

    if (t.config.update) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.UPDATE),
        implementation: updateMutationTS(t, imports)
      })
    }

    if (t.config.delete) {
      mutations.push({
        name: getFieldName(t.name, GraphbackOperationType.DELETE),
        implementation: deleteMutationTS(t, imports)
      })
    }
  })

  return mutations
}

export const createSubscriptionsTS = (types: InputModelTypeContext[]) => {
  const subscriptions = []

  types.forEach((t: InputModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if (t.config.create && t.config.subCreate) {
      subscriptions.push({
        name: `new${t.name}`,
        implementation: subscriptionTS(t, imports, 'new')
      })
    }

    if (t.config.update && t.config.subUpdate) {
      subscriptions.push({
        name: `updated${t.name}`,
        implementation: subscriptionTS(t, imports, 'updated')
      })
    }

    if (t.config.delete && t.config.subDelete) {
      subscriptions.push({
        name: `deleted${t.name}`,
        implementation: subscriptionTS(t, imports, 'deleted')
      })
    }
  })

  return subscriptions
}


export const createClientDocumentsTS = (inputContext: InputModelTypeContext[]) => {
  const context = inputContext.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  return {
    fragments: createFragmentsTS(context),
    queries: createQueriesTS(context),
    mutations: createMutationsTS(context),
    subscriptions: createSubscriptionsTS(context)
  }
}
