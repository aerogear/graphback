import { GraphQLInputObjectType, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, getNullableType, GraphQLField, getNamedType, isInputType, GraphQLInputField, GraphQLFieldMap, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLInputFieldConfig } from "graphql";
import { getPrimaryKey } from '@graphback/core';

// scalar input names
const FloatScalarInputTypeName = 'FloatInput'
const IntScalarInputTypeName = 'IntInput';
const StringScalarInputTypeName = 'StringInput'
const BooleanScalarInputTypeName = 'BooleanInput'
const IDScalarInputTypeName = 'IDInput'

const SortDirectionEnumName = 'SortDirection';

export interface ModelInputTypeMap {
  findOneQueryFields?: GraphQLInputFieldMap
  filterInput?: GraphQLInputObjectType
  createMutationInput?: GraphQLInputObjectType
  updateMutationInput?: GraphQLInputObjectType
  deleteMutationInput?: GraphQLInputObjectType
  orderByInput?: GraphQLInputObjectType
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
    DESC: { value: 'descending' },
    ASC: { value: 'ascending' }
  }
})

export const createFilterUniqueInputType = (modelType: GraphQLObjectType) => {
  const modelID = getPrimaryKey(modelType)

  return new GraphQLInputObjectType({
    name: `${modelType.name}FilterUniqueInput`,
    fields: {
      [modelID.name]: {
        type: GraphQLNonNull(getNullableType(modelID.type))
      }
    }
  })
}

export function getFindOneFieldMap(modelType: GraphQLObjectType): GraphQLInputFieldMap {
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

function mapScalarFieldInputs(scalarFields: GraphQLField<any, any>[]) {
  return scalarFields
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
}

function mapFieldCreateInputs(scalarFields: GraphQLField<any, any>[]) {
  return scalarFields
    .map(({ name, type }: GraphQLField<any, any>) => {
      return {
        name,
        type: getNamedType(type),
        description: undefined
      }
    }).reduce((fieldObj: any, { name, type, description }: any) => {
      fieldObj[name] = { type, description }

      return fieldObj;
    }, {})
}

function createFilterInputFields(filterInputName: string) {
  return {
    and: {
      type: `[${filterInputName}]`
    },
    or: {
      type: `[${filterInputName}]`
    },
    not: {
      type: `[${filterInputName}]`
    }
  }
}

export const createFilterInputType = (modelType: GraphQLObjectType) => {
  const filterInputName = `${modelType.name}FilterInput`;

  const modelFields = Object.values(modelType.getFields())

  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)))
  const scalarInputFields = mapScalarFieldInputs(scalarFields)

  const standardFields = createFilterInputFields(filterInputName)

  const allInputFields = { ...scalarInputFields, ...standardFields };

  return new GraphQLInputObjectType({
    name: filterInputName,
    fields: allInputFields
  });
}

export const createMutationInputType = (modelType: GraphQLObjectType) => {
  const filterInputName = `${modelType.name}Input`;

  const modelFields = Object.values(modelType.getFields())

  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)))
  const scalarInputFields = mapFieldCreateInputs(scalarFields)

  return new GraphQLInputObjectType({
    name: filterInputName,
    fields: scalarInputFields
  });
}

export const createModelListResultType = (modelType: GraphQLObjectType) => {
  return new GraphQLObjectType({
    name: `${modelType.name}ListResult`,
    fields: {
      items: { type: GraphQLNonNull(GraphQLList(modelType)) },
      nextCursor: { type: GraphQLString }
    }
  })
}
