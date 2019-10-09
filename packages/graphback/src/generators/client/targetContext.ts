import { ModelFieldContext, OBJECT_TYPE_DEFINITION, ModelTypeContext } from "../../input/ContextTypes";
import { getFieldName } from '../../utils/graphqlUtils';
import { ResolverType } from '../resolvers';

const gqlImport = `import gql from "graphql-tag"`

const variableFields = (t: ModelTypeContext) => {
  return t.fields.filter((f: ModelFieldContext) => !f.isType && !f.isArray)
                  .map((f: ModelFieldContext) => `${f.name}: ${f.type}${f.isNull ? '': '!'}`)
                  .join(', ')
}

const inputVariableFields = (t: ModelTypeContext) => {
  return t.fields.filter((f: ModelFieldContext) => !f.isType && !f.isArray && f.type!=='ID')
                  .map((f: ModelFieldContext) => `${f.name}: ${f.type}${f.isNull ? '': '!'}`)
                  .join(', ')
}

const variables = (t: ModelTypeContext) => {
  return t.fields.filter((f: ModelFieldContext) => !f.isType && !f.isArray)
                  .map((f: ModelFieldContext) => `${f.name}: \$${f.name}`)
                  .join(', ')
}

const inputVariables = (t: ModelTypeContext) => {
  return t.fields.filter((f: ModelFieldContext) => !f.isType && !f.isArray && f.type!=='ID')
                  .map((f: ModelFieldContext) => `${f.name}: \$${f.name}`)
                  .join(', ')
}

const findAllQuery = (t: ModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, ResolverType.FIND_ALL, 's')

  return `${imports}

export const ${fieldName} = gql\`
  query ${fieldName} {
    ${fieldName} {
      ...${t.name}Fields
    }
  }

  \$\{${t.name}Fragment}
\`
`
}

const findQuery = (t: ModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, ResolverType.FIND)

  return `${imports}

export const ${fieldName} = gql\`
  query ${fieldName}(${variableFields(t)}) {
    ${fieldName}(fields: {${variables(t)}}) {
      ...${t.name}Fields
    }
  }

  \$\{${t.name}Fragment}
\`
`
}


const createMutation = (t: ModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, ResolverType.CREATE)

  return `${imports}

export const ${fieldName} = gql\`
  mutation ${fieldName}(${variableFields(t)}) {
    ${fieldName}(input: {${inputVariables(t)}}) {
      ...${t.name}Fields
    }
  }

  \$\{${t.name}Fragment}
\`
`
}

const updateMutation = (t: ModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, ResolverType.UPDATE)

  return `${imports}

export const ${fieldName} = gql\`
  mutation ${fieldName}($id: ID!, ${inputVariableFields(t)}) {
    ${fieldName}(id: $id, input: {${inputVariables(t)}}) {4
      ...${t.name}Fields
    }
  }

  \$\{${t.name}Fragment}
\`
`
}

const deleteMutation = (t: ModelTypeContext, imports: string) => {
  const fieldName = getFieldName(t.name, ResolverType.DELETE)

  return `${imports}

export const ${fieldName} = gql\`
  mutation ${fieldName}($id: ID!) {
    ${fieldName}(id: $id) {
      id
    }
  }
\`
`
}

const subscription = (t: ModelTypeContext, imports: string, subscriptionType: string) => {
  const fieldName = `${subscriptionType}${t.name}`

  return `${imports}

export const ${fieldName} = gql\`
  subscription ${fieldName} {
    ${fieldName} {
      ...${t.name}Fields
    }
  }

  \$\{${t.name}Fragment}
\`
`
}

const fragment = (t: ModelTypeContext) => {
  return `${gqlImport}

export const ${t.name}Fragment = gql\`
  fragment ${t.name}Fields on ${t.name} {
    ${t.fields.filter((f: ModelFieldContext) => !f.isArray && !f.isType).map((f: ModelFieldContext) => `${f.name}`).join('\n    ')}
  }
\`
`
}

const createFragments = (types: ModelTypeContext[]) => {
  return types.map((t: ModelTypeContext) => {
    return {
      name: t.name,
      implementation: fragment(t)
    }
  })
}

const createQueries = (types: ModelTypeContext[]) => {
  const queries = []

  types.forEach((t: ModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if(t.config.find) {
      queries.push({
        name: getFieldName(t.name, ResolverType.FIND),
        implementation: findQuery(t, imports)
      })
    }

    if(t.config.findAll) {
      queries.push({
        name: getFieldName(t.name, ResolverType.FIND_ALL, 's'),
        implementation: findAllQuery(t, imports)
      })
    }
  })

  return queries
}

const createMutations = (types: ModelTypeContext[]) => {
  const mutations = []

  types.forEach((t: ModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if(t.config.create) {
      mutations.push({
        name: getFieldName(t.name, ResolverType.CREATE),
        implementation: createMutation(t, imports)
      })
    }

    if(t.config.update) {
      mutations.push({
        name: getFieldName(t.name, ResolverType.UPDATE),
        implementation: updateMutation(t, imports)
      })
    }

    if(t.config.delete) {
      mutations.push({
        name: getFieldName(t.name, ResolverType.DELETE),
        implementation: deleteMutation(t, imports)
      })
    }
  })

  return mutations
}

const createSubscriptions = (types: ModelTypeContext[]) => {
  const subscriptions = []

  types.forEach((t: ModelTypeContext) => {
    const imports = `import gql from "graphql-tag"
import { ${t.name}Fragment } from "../fragments/${t.name}"`

    if(t.config.create && t.config.subCreate) {
      subscriptions.push({
        name: `new${t.name}`,
        implementation: subscription(t, imports, 'new')
      })
    }

    if(t.config.update && t.config.subUpdate) {
      subscriptions.push({
        name: `updated${t.name}`,
        implementation: subscription(t, imports, 'updated')
      })
    }

    if(t.config.delete && t.config.subDelete) {
      subscriptions.push({
        name: `deleted${t.name}`,
        implementation: subscription(t, imports, 'deleted')
      })
    }
  })

  return subscriptions
}


export const createSampleQueries = (inputContext: ModelTypeContext[]) => {
  const context = inputContext.filter((t: ModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  return {
    fragments: createFragments(context),
    queries: createQueries(context),
    mutations: createMutations(context),
    subscriptions: createSubscriptions(context)
  }
}
