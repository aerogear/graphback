import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition } from '@graphback/core'
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

// TODO describe fragments in doc CRUD spec
export const expandedFragment = (t: GraphQLObjectType) => {
  const queryReturnFields = buildReturnFields(t, 1);
  const returnFieldsString = printReturnFields(queryReturnFields);

  return `fragment ${t.name}ExpandedField on ${t.name} {
${returnFieldsString}
} `
}

export const findAllQuery = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL)

  return `query ${fieldName} {
    ${fieldName} {
      ...${t.name}ExpandedFields
    }
  }`
}

export const findQuery = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.FIND)

  return `query ${fieldName} ($filter: NoteFilter!)}) {
    ${fieldName}(filter: $filter}) {
      ...${ t.name}ExpandedFields
    }
  }`
}


export const createMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

  return `mutation ${fieldName} ($input: ${t.name}Input!) {
  ${ fieldName} (input: ${t.name}Input!) {
      ...${ t.name}Fields
  }
}
`
}

export const updateMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

  return `mutation ${fieldName} ($input: ${t.name}Input!) {
  ${ fieldName} (input: ${t.name}Input!) {
      ...${ t.name}Fields
  }
}
`
}

export const deleteMutation = (t: GraphQLObjectType) => {
  const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

  return `mutation ${fieldName} ($input: ${t.name}Input!) {
  ${fieldName} (input: ${t.name}Input!) {
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
    if (t.crudOptions.disableGen) {
      return;
    }

    if (t.crudOptions.find) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND),
        implementation: findQuery(t.graphqlType)
      })
    }

    if (t.crudOptions.findAll) {
      queries.push({
        name: getFieldName(t.graphqlType.name, GraphbackOperationType.FIND_ALL),
        implementation: findAllQuery(t.graphqlType)
      })
    }
  })

  return queries
}

const createMutations = (types: ModelDefinition[]) => {
  const mutations = []

  types.forEach((t: ModelDefinition) => {
    if (t.crudOptions.disableGen) {
      return;
    }
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
    if (t.crudOptions.disableGen) {
      return;
    }
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

