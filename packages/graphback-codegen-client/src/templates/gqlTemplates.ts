import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, getPrimaryKey, getInputTypeName } from '@graphback/core'
import { GraphQLObjectType } from 'graphql';
import { ClientTemplate } from './ClientTemplates';
import { buildReturnFields, printReturnFields } from './fragmentFields';

export const fragment = (t: GraphQLObjectType) => {
  const queryReturnFields = buildReturnFields(t, 0);
  const returnFieldsString = printReturnFields(queryReturnFields);

  return `fragment ${t.name}Fields on ${t.name} {
${returnFieldsString}
} `
}

export const expandedFragment = (t: GraphQLObjectType) => {
  const queryReturnFields = buildReturnFields(t, 1);
  const returnFieldsString = printReturnFields(queryReturnFields);

  return `fragment ${t.name}ExpandedFields on ${t.name} {
${returnFieldsString}
} `
}

export const findOneQuery = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ONE)

  return `query ${fieldName}($id: ID!) {
    ${fieldName}(id: $id) {
      ...${t.name}ExpandedFields
    }
  }`
}

export const findQuery = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND)
  const inputTypeField = getInputTypeName(t.name, GraphbackOperationType.FIND)

  return `query ${fieldName}($filter: ${inputTypeField}, $page: PageRequest, $orderBy: OrderByInput) {
    ${fieldName}(filter: $filter, page: $page, orderBy: $orderBy) {
      items {
        ...${ t.name}ExpandedFields
      }
      offset
      limit
      count
    }
  }`
}


export const createMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)
  const inputTypeField = getInputTypeName(t.name, GraphbackOperationType.CREATE)

  return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${ fieldName}(input: $input) {
      ...${ t.name}Fields
  }
}
`
}

export const updateMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)
  const inputTypeField = getInputTypeName(t.name, GraphbackOperationType.UPDATE)

  return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${fieldName}(input: $input) {
      ...${ t.name}Fields
  }
}
`
}

export const deleteMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)
  const inputTypeField = getInputTypeName(t.name, GraphbackOperationType.DELETE)

  return `mutation ${fieldName}($input: ${inputTypeField}!) {
  ${fieldName}(input: $input) {
      ...${t.name}Fields
  }
}
`
}

export const subscription = (t: GraphQLObjectType, fieldName: string) => {
  return `subscription ${fieldName} {
  ${fieldName} {
    ...${t.name}Fields
  }
} `
}

export const createFragments = (types: ModelDefinition[]) => {
  return types.reduce((data: ClientTemplate[], model: ModelDefinition) => {
    data.push({
      name: model.graphqlType.name,
      implementation: fragment(model.graphqlType)
    })
    data.push({
      name: `${model.graphqlType.name}Expanded`,
      implementation: expandedFragment(model.graphqlType)
    });

    return data;
  }, [])
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

    if (t.crudOptions.findOne) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ONE),
        implementation: findOneQuery(t.graphqlType)
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
    const name = t.graphqlType.name;

    if (t.crudOptions.create && t.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE);
      subscriptions.push({
        name: operation,
        implementation: subscription(t.graphqlType, operation)
      })
    }

    if (t.crudOptions.update && t.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE);
      subscriptions.push({
        name: operation,
        implementation: subscription(t.graphqlType, operation)
      })
    }

    if (t.crudOptions.delete && t.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE);
      subscriptions.push({
        name: operation,
        implementation: subscription(t.graphqlType, operation)
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

