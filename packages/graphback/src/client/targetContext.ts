import { Field, OBJECT_TYPE_DEFINITION, Type } from "../ContextTypes";
import { getFieldName, ResolverType } from '../utils';

const gqlImport = `import gql from "graphql-tag"`

const variableFields = (t: Type) => {
  return t.fields.filter((f: Field) => !f.isType && !f.isArray)
                  .map((f: Field) => `${f.name}: ${f.type}${f.isNull ? '': '!'}`)
                  .join(', ')
}

const inputVariableFields = (t: Type) => {
  return t.fields.filter((f: Field) => !f.isType && !f.isArray && f.type!=='ID')
                  .map((f: Field) => `${f.name}: ${f.type}${f.isNull ? '': '!'}`)
                  .join(', ')
}

const variables = (t: Type) => {
  return t.fields.filter((f: Field) => !f.isType && !f.isArray)
                  .map((f: Field) => `${f.name}: \$${f.name}`)
                  .join(', ')
}

const inputVariables = (t: Type) => {
  return t.fields.filter((f: Field) => !f.isType && !f.isArray && f.type!=='ID')
                  .map((f: Field) => `${f.name}: \$${f.name}`)
                  .join(', ')
}

const findAllQuery = (t: Type, imports: string) => {
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

const findQuery = (t: Type, imports: string) => {
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


const createMutation = (t: Type, imports: string) => {
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

const updateMutation = (t: Type, imports: string) => {
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

const deleteMutation = (t: Type, imports: string) => {
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

const subscription = (t: Type, imports: string, subscriptionType: string) => {
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

const fragment = (t: Type) => {
  return `${gqlImport}

export const ${t.name}Fragment = gql\`
  fragment ${t.name}Fields on ${t.name} {
    ${t.fields.filter((f: Field) => !f.isArray && !f.isType).map((f: Field) => `${f.name}`).join('\n    ')}
  }
\`
`
}

const createFragments = (types: Type[]) => {
  return types.map((t: Type) => {
    return {
      name: t.name,
      implementation: fragment(t)
    }
  })
}



const createQueries = (types: Type[]) => {
  const queries = []

  types.forEach((t: Type) => {
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

const createMutations = (types: Type[]) => {
  const mutations = []

  types.forEach((t: Type) => {
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

const createSubscriptions = (types: Type[]) => {
  const subscriptions = []

  types.forEach((t: Type) => {
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


export const createSampleQueries = (inputContext: Type[]) => {
  const context = inputContext.filter((t: Type) => t.kind === OBJECT_TYPE_DEFINITION && t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  return {
    fragments: createFragments(context),
    queries: createQueries(context),
    mutations: createMutations(context),
    subscriptions: createSubscriptions(context)
  }
}
