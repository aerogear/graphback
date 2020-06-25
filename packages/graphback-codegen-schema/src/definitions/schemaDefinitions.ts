/* eslint-disable max-lines */
import { GraphQLInputObjectType, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, GraphQLField, getNamedType, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLNamedType, GraphQLInputField, isEnumType, isObjectType, isNonNullType, isInputObjectType, isNullableType, isWrappingType, isListType, GraphQLOutputType, GraphQLInputType, assertInputType, getNullableType } from "graphql";
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldNamedType, isOneToManyField, getPrimaryKey, metadataMap, GraphQLJSON } from '@graphback/core';
import { SchemaComposer } from 'graphql-compose';
import { copyWrappingType } from './copyWrappingType';

const PageRequestTypeName = 'PageRequest';
const SortDirectionEnumName = 'SortDirectionEnum';
const OrderByInputTypeName = 'OrderByInput';

const getInputName = (type: GraphQLNamedType) => {
  if (isEnumType(type)) {
    return `StringInput`
  }

  if (isInputObjectType(type)) {
    return type.name
  }

  return `${type.name}Input`
}

export const createInputTypeForScalar = (scalarType: GraphQLScalarType) => {
  const newInput = new GraphQLInputObjectType({
    name: getInputName(scalarType),
    fields: {
      ne: { type: scalarType },
      eq: { type: scalarType },
      le: { type: scalarType },
      lt: { type: scalarType },
      ge: { type: scalarType },
      gt: { type: scalarType },
      in: { type: GraphQLList(scalarType) },
      between: { type: GraphQLList(scalarType) }
    }
  });

  return newInput;
}

export const JSONScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLJSON),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    contains: { type: GraphQLString }
  }
})

export const StringScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLString),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    le: { type: GraphQLString },
    lt: { type: GraphQLString },
    ge: { type: GraphQLString },
    gt: { type: GraphQLString },
    in: { type: GraphQLList(GraphQLString) },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
    endsWith: { type: GraphQLString }
  }
})

export const IDScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLID),
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList(GraphQLID) },
  }
})

export const BooleanScalarInputType = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
})

export const PageRequest = new GraphQLInputObjectType({
  name: PageRequestTypeName,
  fields: {
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  }
})

export const SortDirectionEnum = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: 'desc' },
    ASC: { value: 'asc' }
  }
})

export const OrderByInputType = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: 'asc' }
  }
})

function getModelInputFields(schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType, operationType: GraphbackOperationType): GraphQLInputField[] {
  const inputFields: GraphQLInputField[] = [];
  const fields: GraphQLField<any, any>[] = Object.values(modelType.getFields());

  for (const field of fields) {
    if (isOneToManyField(field)) {
      continue;
    }

    const type = getInputFieldNamedType(schemaComposer, field, operationType);

    if (!type) {
      continue;
    }

    const name = getInputFieldName(field);

    const inputField: GraphQLInputField = {
      name,
      type: isNonNullType(field.type) ? GraphQLNonNull(type) : type,
      description: undefined,
      extensions: []
    }

    inputFields.push(inputField);
  }

  return inputFields;
}

export function buildFindOneFieldMap(modelType: GraphQLObjectType): GraphQLInputFieldMap {
  return {
    id: {
      name: "id",
      type: GraphQLNonNull(GraphQLID),
      description: undefined,
      extensions: undefined
    }
  }
}

export const buildFilterInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.FIND

  const inputTypeName = getInputTypeName(modelType.name, operationType);

  const inputFields = getModelInputFields(schemaComposer, modelType, operationType);

  const scalarInputFields = inputFields
    .map(({ name, type }: GraphQLInputField) => {
      return {
        name,
        type: getInputName(getNamedType(type)),
        description: undefined
      }
    }).reduce((fieldObj: any, { name, type, description }: any) => {
      fieldObj[name] = { type, description }

      return fieldObj;
    }, {})

  const filterInput = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: {
      ...scalarInputFields,
      and: {
        type: `[${inputTypeName}]`
      },
      or: {
        type: `[${inputTypeName}]`
      },
      not: {
        type: `${inputTypeName}`
      }
    }
  });

  schemaComposer.add(filterInput)
}

export const buildCreateMutationInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.CREATE
  const inputTypeName = getInputTypeName(modelType.name, operationType);

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);

  const mutationInputType = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => allModelFields
      .map(({ name, type }: GraphQLInputField) => {
        let fieldType: GraphQLNamedType
        // Remove required from ID
        if (name === idField.name) {
          fieldType = getNamedType(type)
        }

        return {
          name,
          type: fieldType || type,
          description: undefined
        }
      }).reduce((fieldObj: any, { name, type, description }: any) => {
        fieldObj[name] = { type, description }

        return fieldObj;
      }, {})
  });

  schemaComposer.add(mutationInputType)
}

export const buildSubscriptionFilterType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.SUBSCRIPTION_CREATE);
  const modelFields = Object.values(modelType.getFields());
  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => {
    const namedType = getNamedType(f.type);

    return isScalarType(namedType) || isEnumType(namedType);
  });

  const filterInputType = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => scalarFields
      .map(({ name, type }: GraphQLField<any, any>) => {
        const fieldType: GraphQLNamedType = getNamedType(type);

        return {
          name,
          type: fieldType || type,
          description: undefined
        };
      }).reduce((fieldObj: any, { name, type, description }: any) => {
        fieldObj[name] = { type, description }

        return fieldObj;
      }, {})
  });

  schemaComposer.add(filterInputType)
}

export const buildMutationInputType = (schemaComposer: SchemaComposer<any>, modelType: GraphQLObjectType) => {
  const operationType = GraphbackOperationType.UPDATE
  const inputTypeName = getInputTypeName(modelType.name, operationType);

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(schemaComposer, modelType, operationType);

  const mutationInputObject = new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => allModelFields
      .map(({ name, type }: GraphQLInputField) => {
        let fieldType: GraphQLNamedType
        if (name !== idField.name) {
          fieldType = getNamedType(type)
        }

        return {
          name,
          type: fieldType || type,
          description: undefined
        }
      }).reduce((fieldObj: any, { name, type, description }: any) => {
        fieldObj[name] = { type, description }

        return fieldObj;
      }, {})
  });

  schemaComposer.add(mutationInputObject)
}

function mapObjectInputFields(schemaComposer: SchemaComposer<any>, fields: GraphQLField<any, any>[]): GraphQLInputField[] {
  return fields.map((field: GraphQLField<any, any>) => {
    let namedType = getNamedType(field.type)
    let typeName = namedType.name

    let inputType
    if (isObjectType(namedType)) {
      typeName = getInputTypeName(typeName, GraphbackOperationType.CREATE)
      namedType = schemaComposer.getOrCreateITC(typeName).getType()

      inputType = copyWrappingType(field.type, namedType)
    }

    return {
      name: field.name,
      type: inputType || field.type,
      extensions: []
    }
  })
}

export function addCreateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType) {
  const objectFields = Object.values(objectType.getFields())
  const operationType = GraphbackOperationType.CREATE

  const inputType = new GraphQLInputObjectType({
    name: getInputTypeName(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields)
      .reduce((fieldObj: any, { name, type, description }: any) => {
        fieldObj[name] = { type, description }

        return fieldObj
      }, {})
  })

  schemaComposer.add(inputType)
}

export function addUpdateObjectInputType(schemaComposer: SchemaComposer<any>, objectType: GraphQLObjectType) {
  const objectFields = Object.values(objectType.getFields())
  const operationType = GraphbackOperationType.UPDATE

  const inputType = new GraphQLInputObjectType({
    name: getInputTypeName(objectType.name, operationType),
    fields: mapObjectInputFields(schemaComposer, objectFields)
      .reduce((fieldObj: any, { name, type, description }: any) => {
        fieldObj[name] = { type: getNullableType(type), description }

        return fieldObj
      }, {})
  })

  schemaComposer.add(inputType)
}

export const createModelListResultType = (modelType: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      count: { type: GraphQLInt }
    }
  })
}

export function createVersionedInputFields() {
  return {
    [metadataMap.fieldNames.createdAt]: {
      type: StringScalarInputType
    },
    [metadataMap.fieldNames.updatedAt]: {
      type: StringScalarInputType
    }
  };
}

export function createVersionedFields() {
  return {
    [metadataMap.fieldNames.createdAt]: {
      type: GraphQLString,
      description: `@${metadataMap.markers.createdAt}\n@db(type: 'timestamp')`
    },
    [metadataMap.fieldNames.updatedAt]: {
      type: GraphQLString,
      description: `@${metadataMap.markers.updatedAt}\n@db(type: 'timestamp')`
    }
  };
}

