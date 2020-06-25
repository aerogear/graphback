/* eslint-disable max-lines */
import { GraphQLInputObjectType, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, GraphQLField, getNamedType, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLNamedType, GraphQLInputField, isEnumType } from "graphql";
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldType, isOneToManyField, getPrimaryKey, metadataMap } from '@graphback/core';

const PageRequestTypeName = 'PageRequest';
const SortDirectionEnumName = 'SortDirectionEnum';
const OrderByInputTypeName = 'OrderByInput';

const getScalarInputName = (type: GraphQLNamedType) => {
  if (isEnumType(type)) {
    return `StringInput`
  }

  return `${type.name}Input`
}

export const createInputTypeForScalar = (scalarType: GraphQLScalarType) => {
  const newInput = new GraphQLInputObjectType({
    name: getScalarInputName(scalarType),
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

export const StringScalarInputType = new GraphQLInputObjectType({
  name: getScalarInputName(GraphQLString),
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
  name: getScalarInputName(GraphQLID),
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
  name: getScalarInputName(GraphQLBoolean),
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

function getModelInputFields(modelType: GraphQLObjectType): GraphQLInputField[] {
  const inputFields: GraphQLInputField[] = [];
  const fields: GraphQLField<any, any>[] = Object.values(modelType.getFields());

  for (const field of fields) {
    if (isOneToManyField(field)) {
      continue;
    }

    const type = getInputFieldType(field);

    if (!type) {
      continue;
    }

    const name = getInputFieldName(field);

    const inputField: GraphQLInputField = {
      name,
      type,
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

export const buildFilterInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.FIND);

  const inputFields = getModelInputFields(modelType);

  const scalarInputFields = inputFields
    .map(({ name, type }: GraphQLInputField) => {
      return {
        name,
        type: getScalarInputName(getNamedType(type)),
        description: undefined
      }
    }).reduce((fieldObj: any, { name, type, description }: any) => {
      fieldObj[name] = { type, description }

      return fieldObj;
    }, {})

  return new GraphQLInputObjectType({
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
}

export const buildCreateMutationInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.CREATE);

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(modelType);

  return new GraphQLInputObjectType({
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
}

export const buildSubscriptionFilterType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.SUBSCRIPTION_CREATE);
  const modelFields = Object.values(modelType.getFields());
  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => {
    const namedType = getNamedType(f.type);

    return isScalarType(namedType) || isEnumType(namedType);
  });

  return new GraphQLInputObjectType({
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
}



export const buildMutationInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.UPDATE);

  const idField = getPrimaryKey(modelType)
  const allModelFields = getModelInputFields(modelType);

  return new GraphQLInputObjectType({
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

