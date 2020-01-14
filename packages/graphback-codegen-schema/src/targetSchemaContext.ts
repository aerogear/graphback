import { filterInterfaceTypes, filterObjectTypes, getFieldName, getRelationFieldName, GraphbackOperationType, InputInterfaceType, InputModelArgument, InputModelFieldContext, InputModelTypeContext } from '@graphback/core'

export interface TargetType {
  name: string
  interfaces?: string[]
  fields: string[]
}

interface RelationInfo {
  name: string
  //tslint:disable-next-line
  type: string
  relation: string
  fieldInfo?: RelationFieldInfo
  idField?: string
}

interface RelationFieldInfo {
  name: string
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  isArray: boolean
}

/**
 * Generate arrays of definitions as string
 * for respective type in the schema
 */
export interface TargetContext {
  types: TargetType[]
  interfaces: TargetType[]
  inputFields: TargetType[]
  filterFields: TargetType[],
  // pagination: Type[],
  queries: string[],
  mutations: string[],
  subscriptions: string[]
  relations: RelationInfo[]
}

const findQueries = (inputContext: InputModelTypeContext[]): string[] => {
  return inputContext.filter((t: InputModelTypeContext) => (!t.config.disableGen && t.config.find))
    .map((t: InputModelTypeContext) => {
      const fieldName = getFieldName(t.name, GraphbackOperationType.FIND, 's')

      return `${fieldName}(fields: ${t.name}Filter!): [${t.name}!]!`
    })
}

const updateQueries = (inputContext: InputModelTypeContext[]): string[] => {
  return inputContext.filter((t: InputModelTypeContext) => (!t.config.disableGen && t.config.update))
    .map((t: InputModelTypeContext) => {
      const fieldName = getFieldName(t.name, GraphbackOperationType.UPDATE)

      return `${fieldName}(id: ID!, input: ${t.name}Input!): ${t.name}!`
    })
}

const createQueries = (inputContext: InputModelTypeContext[]): string[] => {
  return inputContext.filter((t: InputModelTypeContext) => (!t.config.disableGen && t.config.create))
    .map((t: InputModelTypeContext) => {
      const fieldName = getFieldName(t.name, GraphbackOperationType.CREATE)

      return `${fieldName}(input: ${t.name}Input!): ${t.name}!`
    })
}

const delQueries = (inputContext: InputModelTypeContext[]): string[] => {
  return inputContext.filter((t: InputModelTypeContext) => (!t.config.disableGen && t.config.delete))
    .map((t: InputModelTypeContext) => {
      const fieldName = getFieldName(t.name, GraphbackOperationType.DELETE)

      return `${fieldName}(id: ID!): ID!`
    })
}

const findAllQueries = (inputContext: InputModelTypeContext[]): string[] => {
  return inputContext.filter((t: InputModelTypeContext) => (!t.config.disableGen && t.config.findAll))
    .map((t: InputModelTypeContext) => {
      const fieldName = getFieldName(t.name, GraphbackOperationType.FIND_ALL, 's')

      return `${fieldName}: [${t.name}!]!`
    })
}

const newSub = (name: string) => `new${name}: ${name}!`
const updatedSub = (name: string) => `updated${name}: ${name}!`
const deletedSub = (name: string) => `deleted${name}: ID!`

export const getFieldNameAndType = (f: InputModelFieldContext): { fieldName: string; fieldType: string } => {
  let fieldName: string = f.name;
  let fieldType: string = f.type;
  if (f.isType && !f.isArray) {
    fieldName = `${f.name}Id`;
    fieldType = 'ID';
  }

  return { fieldName, fieldType };
}

/**
 * Create schema type output from the Field object from isNull, isArray flags
 * ex - title: String!
 * @param f Field type
 */
export const maybeNullField = (f: InputModelFieldContext) => {
  const { fieldName, fieldType } = getFieldNameAndType(f);

  if (f.isArray) {
    return `${fieldName}: [${fieldType}]${f.isNull ? '' : '!'}`
  }
  else {
    return `${fieldName}: ${fieldType}${f.isNull ? '' : '!'}`
  }
}

/**
 * Recreate custom input provided by the user from the field object with arguments
 * example
 * user input - likePost(id: ID!): Post!
 * output - likePost(id: ID!): Post!
 * @param f Field type from custom input
 * arguments structure - {name, value: {isNull, type, isArray}}
 */
export const maybeNullFieldArgs = (f: InputModelFieldContext) => {
  if (f.arguments) {
    return `${f.name}(${f.arguments.map((x: InputModelArgument) => x.value.isArray ?
      `${x.name}: [${x.value.type}]${x.value.isNull ? '' : '!'}` :
      `${x.name}: ${x.value.type}${x.value.isNull ? '' : '!'}`).join(', ')}): ${f.isArray ? `[${f.type}]` : `${f.type}`}${f.isNull ? '' : '!'}`
  } else {
    return maybeNullField(f)
  }
}

const nullField = (f: InputModelFieldContext) => {
  const { fieldName, fieldType } = getFieldNameAndType(f);

  if (f.isArray) {
    return `${fieldName}: [${fieldType}]`
  }
  else {
    return `${fieldName}: ${fieldType}`
  }
}

const relationExists = (fieldInfo: RelationFieldInfo, relations: RelationInfo[]): boolean => {
  const match = relations.filter((r: RelationInfo) => r.type === 'Type').find((r: RelationInfo) => {
    return r.fieldInfo.name === fieldInfo.name && r.fieldInfo.type === fieldInfo.type && r.fieldInfo.isArray === fieldInfo.isArray;
  });

  return Boolean(match);
}

const findRelationByFieldName = (relation: RelationInfo, relations: RelationInfo[]): RelationInfo => {
  return relations.find((r: RelationInfo) => {
    return r.name === relation.name && r.fieldInfo && r.fieldInfo.name === relation.fieldInfo.name
  });
}

/**
 * Build schema context for the string templates
 * relations - if the model has relations
 * nodes - process main types and create nodes
 * inputFields - create input fields for each type for create and update methods
 * filterFields - create filter fields for find method
 * queries - generated queries according to config - find, findAll
 * mutations - generated mutations according to config - create, update, delete
 * subscriptions - generated subscription according to config - new, updated, deleted
 * @param input input visted object from model
 */
// tslint:disable-next-line: max-func-body-length
export const buildTargetContext = (input: InputModelTypeContext[]) => {
  const inputContext = input.filter((t: InputModelTypeContext) => t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

  const relations = []

  addRelations(input, relations);

  const context: TargetContext = {
    types: [],
    interfaces: [],
    inputFields: [],
    filterFields: [],
    queries: [],
    mutations: [],
    subscriptions: [],
    relations
  }

  const objectTypes = filterObjectTypes(inputContext);
  const interfaceTypes = filterInterfaceTypes(inputContext);

  context.types = objectTypes.map((t: InputModelTypeContext) => {
    return {
      "name": t.name,
      "interfaces": t.interfaces.map((i: InputInterfaceType) => i.type),
      "fields": [...t.fields.filter((f: InputModelFieldContext, ) => !f.isType).map(maybeNullField), ...new Set(relations.filter((r: RelationInfo) => r.name === t.name).map((r: RelationInfo) => r.relation))]
    }
  });

  context.interfaces = interfaceTypes.map((t: InputModelTypeContext) => {
    return {
      "name": t.name,
      "fields": [...t.fields.filter((f: InputModelFieldContext, ) => !f.isType).map(maybeNullField), ...new Set(relations.filter((r: RelationInfo) => r.name === t.name).map((r: RelationInfo) => r.relation))]
    }
  });

  const fieldExists = (name: string, fields: InputModelFieldContext[]) => {
    const field = fields.find((f: InputModelFieldContext) => {
      return f.name === name;
    });

    return Boolean(field);
  }

  context.inputFields = objectTypes.map((t: InputModelTypeContext) => {
    return {
      "name": t.name,
      "type": 'input',
      "fields": [...new Set([...t.fields.filter((f: InputModelFieldContext) => f.type !== 'ID' && (!(f.isType && f.isArray) || !f.isType))
        .map(maybeNullField),
      ...[].concat(relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID' && fieldExists(r.name, t.fields)).map((r: RelationInfo) => r.idField))])]
    }
  })

  context.filterFields = objectTypes.map((t: InputModelTypeContext) => {
    return {
      "name": t.name,
      "type": 'input',
      "fields": [...new Set([...t.fields.filter((f: InputModelFieldContext) => (!(f.isType && f.isArray) || !f.isType))
        .map(nullField),
      ...[].concat(relations.filter((r: RelationInfo) => r.name === t.name && r.type === 'ID').map((r: RelationInfo) => r.idField.slice(0, -1)))])]
    }
  })

  context.queries = [...findQueries(objectTypes), ...findAllQueries(objectTypes)]
  context.mutations = [...createQueries(objectTypes), ...updateQueries(objectTypes), ...delQueries(objectTypes)]
  context.subscriptions = [...objectTypes.filter((t: InputModelTypeContext) => !t.config.disableGen && t.config.create && t.config.subCreate).map((t: InputModelTypeContext) => newSub(t.name)),
  ...objectTypes.filter((t: InputModelTypeContext) => !t.config.disableGen && t.config.update && t.config.subUpdate).map((t: InputModelTypeContext) => updatedSub(t.name)),
  ...objectTypes.filter((t: InputModelTypeContext) => !t.config.disableGen && t.config.delete && t.config.subDelete).map((t: InputModelTypeContext) => deletedSub(t.name))]

  return context
}

/**
 * Create custom queries and mutations from user's input
 * @param inputContext Type[]
 */
export const createCustomSchemaContext = (inputContext: InputModelTypeContext[]) => {
  const objectTypes = filterObjectTypes(inputContext);

  const queryType = objectTypes.filter((t: InputModelTypeContext) => t.name === 'Query')
  let customQueries = []
  if (queryType.length) {
    customQueries = queryType[0].fields.map(maybeNullFieldArgs)
  }

  const mutationType = objectTypes.filter((t: InputModelTypeContext) => t.name === 'Mutation')
  let customMutations = []
  if (mutationType.length) {
    customMutations = mutationType[0].fields.map(maybeNullFieldArgs)
  }

  const subscriptionType = objectTypes.filter((t: InputModelTypeContext) => t.name === 'Subscription')
  let customSubscriptions = []
  if (subscriptionType.length) {
    customSubscriptions = subscriptionType[0].fields.map(maybeNullFieldArgs)
  }

  return { customQueries, customMutations, customSubscriptions }
}

function addRelations(inputContext: InputModelTypeContext[], relations: any[]) {
  const maybeDuplicateRelationsQueue = [];

  inputContext.forEach((t: InputModelTypeContext) => {
    t.fields.forEach((f: InputModelFieldContext) => {
      if (f.isType) {
        if (f.annotations.OneToOne || !f.isArray) {
          relations.push({
            "name": t.name,
            "type": 'Type',
            "fieldInfo": {
              "name": f.name,
              "type": f.type,
              "isArray": f.isArray
            },
            "relation": `${f.name}: ${f.type}!`,
          })
        } else if (f.annotations.OneToMany || f.isArray) {
          relations.push({
            "name": t.name,
            "type": 'Type',
            "fieldInfo": {
              "name": f.name,
              "type": f.type,
              "isArray": f.isArray
            },
            "relation": `${f.name}: [${f.type}!]!`
          })

          const relationFieldName = getRelationFieldName(f, t)

          const fieldInfo = {
            "name": relationFieldName,
            "type": t.name,
            "isArray": false
          };

          relations.push({
            "name": f.type,
            "type": 'ID',
            "relation": `${relationFieldName}: ${t.name}!`,
            "idField": `${relationFieldName}Id: ID!`,
            "fieldInfo": fieldInfo
          });

          relations.push({
            "name": f.type,
            "type": 'ID',
            "relation": `${relationFieldName}: ${t.name}!`,
            "idField": `${relationFieldName}Id: ID!`,
            "fieldInfo": fieldInfo
          });

          maybeDuplicateRelationsQueue.push({
            "name": f.type,
            "type": 'Type',
            "relation": `${relationFieldName}: ${t.name}!`,
            "fieldInfo": fieldInfo
          })
        }
      }
    })
  });

  for (const maybeDuplicate of maybeDuplicateRelationsQueue) {
    const existingRelation = findRelationByFieldName(maybeDuplicate, relations);

    if (existingRelation && existingRelation.fieldInfo.type !== maybeDuplicate.fieldInfo.type) {
      throw new Error(`Cannot create relationship: ${maybeDuplicate.name}.${maybeDuplicate.fieldInfo.name} does not match type ${maybeDuplicate.fieldInfo.type}`);
    }
    if (!existingRelation || !relationExists(existingRelation.fieldInfo, relations)) {
      relations.push(maybeDuplicate);
    }
  }
}
