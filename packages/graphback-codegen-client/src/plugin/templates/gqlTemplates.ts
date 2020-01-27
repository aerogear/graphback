import { getFieldName, GraphbackOperationType, ModelDefinition } from '@graphback/core'
import { isWrappingType, getNamedType, GraphQLType, GraphQLObjectType, isOutputType, isLeafType, isCompositeType, isAbstractType } from 'graphql'

function buildReturnFields(t: GraphQLObjectType) {
  const fieldsMap = t.getFields();

  return Object.keys(fieldsMap).map(key => {
    const field = fieldsMap[key];
    if (isWrappingType(field.type)) {
      const modelType = getNamedType(field.type);
      if (isCompositeType(modelType)) {
        return `${field.name}: {
        // TODO
        // buildReturnFields(modelType);
      } `
      } else {
        return field.name;
      }
    }
    else {
      return field.name;
    }
  });
}

export const fragment = (t: ModelDefinition) => {
  const queryReturnFields = buildReturnFields(t.graphqlType);


  console.log("FIELDS", JSON.stringify(queryReturnFields, undefined, 2))

  return `fragment ${t.graphqlType.name}Fields on ${t.graphqlType.name} {
      ${queryReturnFields.join(',\n')}
  }`
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

  return `query ${fieldName}($filter: NoteFilter!)}) {
    ${fieldName}(filter: $filter}) {
      ...${t.graphqlType.name}Fields
    }
  }`
}


export const createMutation = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.CREATE)

  return `mutation ${fieldName}($input: ${fieldName}Input!) {
    ${fieldName}(input: ${fieldName}Input!) {
      ...${t.graphqlType.name}Fields
    }
  }
`
}

export const updateMutation = (t: ModelDefinition) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.UPDATE)

  return `mutation ${fieldName}($input: ${fieldName}Input!) {
    ${fieldName}(input: ${fieldName}Input!) {
      ...${t.graphqlType.name}Fields
    }
  }
`
}

export const deleteMutation = (t: ModelDefinition, ) => {
  const fieldName = getFieldName(t.graphqlType.name, GraphbackOperationType.DELETE)

  return `mutation ${fieldName}($input: ${fieldName}Input!) {
    ${fieldName}(input: ${fieldName}Input!) {
      ...${t.graphqlType.name}Fields
    }
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

