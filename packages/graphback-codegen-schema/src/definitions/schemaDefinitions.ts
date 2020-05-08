import { GraphQLInputObjectType, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, getNullableType, GraphQLField, getNamedType, isInputType, GraphQLInputField, GraphQLFieldMap, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLInputFieldConfig, GraphQLInputType, GraphQLOutputType, GraphQLNamedType } from "graphql";
import { getPrimaryKey, getInputTypeName, GraphbackOperationType } from '@graphback/core';

// scalar input names
const FloatScalarInputTypeName = 'FloatInput'
const IntScalarInputTypeName = 'IntInput';
const StringScalarInputTypeName = 'StringInput'
const BooleanScalarInputTypeName = 'BooleanInput'
const IDScalarInputTypeName = 'IDInput'

const SortDirectionEnumName = 'SortDirectionEnum';
const OrderByInputTypeName = 'OrderByInput';

export interface ModelInputTypeMap {
  findOneQueryFields: GraphQLInputFieldMap
  filterInput: GraphQLInputObjectType
  createMutationInput: GraphQLInputObjectType
  updateMutationInput: GraphQLInputObjectType
  deleteMutationInput: GraphQLInputObjectType
}

export const FloatScalarInputType = new GraphQLInputObjectType({
  name: FloatScalarInputTypeName,
  fields: {
    ne: { type: GraphQLFloat },
    eq: { type: GraphQLFloat },
    le: { type: GraphQLFloat },
    lt: { type: GraphQLFloat },
    ge: { type: GraphQLFloat },
    gt: { type: GraphQLFloat },
    in: { type: GraphQLList(GraphQLFloat) },
    between: { type: GraphQLList(GraphQLFloat) },
    // exists: { type: GraphQLBoolean }
  }
})

export const IntScalarInputType = new GraphQLInputObjectType({
  name: IntScalarInputTypeName,
  fields: {
    ne: { type: GraphQLInt },
    eq: { type: GraphQLInt },
    le: { type: GraphQLInt },
    lt: { type: GraphQLInt },
    ge: { type: GraphQLInt },
    gt: { type: GraphQLInt },
    in: { type: GraphQLList(GraphQLInt) },
    between: { type: GraphQLList(GraphQLInt) },
    // exists: { type: GraphQLBoolean }
  }
})

export const StringScalarInputType = new GraphQLInputObjectType({
  name: StringScalarInputTypeName,
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
    // exists: { type: GraphQLBoolean }
    // TODO: size
  }
})

export const BooleanScalarInputType = new GraphQLInputObjectType({
  name: BooleanScalarInputTypeName,
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean },
    // exists: { type: GraphQLBoolean }
    // TODO: Where not null
  }
})

export const IDScalarInputType = new GraphQLInputObjectType({
  name: IDScalarInputTypeName,
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList(GraphQLID) },
    contains: { type: GraphQLID },
    startsWith: { type: GraphQLID },
    endsWith: { type: GraphQLID }
    // exists: { type: GraphQLBoolean }
    // TODO: size
  }
})


// TODO: Add Date, DateTime scalar inputs

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

export function buildFindOneFieldMap(modelType: GraphQLObjectType): GraphQLInputFieldMap {
  const idField = getPrimaryKey(modelType)
  const idFieldType = getNamedType(idField.type) as GraphQLScalarType

  return {
    [idField.name]: {
      name: idField.name,
      type: GraphQLNonNull(idFieldType),
      description: undefined,
      extensions: undefined
    }
  }
}

export const buildFilterInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.FIND);

  const modelFields = Object.values(modelType.getFields())

  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)))

  const scalarInputFields = scalarFields
    .map(({ name, type }: GraphQLField<any, any>) => {
      return {
        name,
        type: `${getNamedType(type)}Input`,
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
        type: `${inputTypeName}`
      },
      not: {
        type: `[${inputTypeName}]`
      }
    }
  });
}

export const buildCreateMutationInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.CREATE);

  const modelFields = Object.values(modelType.getFields())
  const idField = getPrimaryKey(modelType)
  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)))

  return new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => scalarFields
      .map(({ name, type }: GraphQLField<any, any>) => {
        let fieldType: GraphQLNamedType
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

export const buildUpdateMutationInputType = (modelType: GraphQLObjectType) => {
  const inputTypeName = getInputTypeName(modelType.name, GraphbackOperationType.UPDATE);

  const modelFields = Object.values(modelType.getFields())
  const idField = getPrimaryKey(modelType)
  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)))

  return new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => scalarFields
      .map(({ name, type }: GraphQLField<any, any>) => {
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

export const buildDeleteMutationInputType = (modelType: GraphQLObjectType) => {
  const idField = getPrimaryKey(modelType)

  return new GraphQLInputObjectType({
    name: getInputTypeName(modelType.name, GraphbackOperationType.DELETE),
    fields: {
      [idField.name]: {
        type: GraphQLNonNull(getNullableType(idField.type))
      }
    }
  })
}

export const createModelListResultType = (modelType: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ResultList`,
    fields: {
      items: {
        type: GraphQLNonNull(GraphQLList(modelType))
      },
      nextCursor: { type: GraphQLString }
    }
  })
}
