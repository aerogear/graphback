import { GraphQLInputObjectType, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLID, GraphQLEnumType, GraphQLObjectType, GraphQLNonNull, GraphQLField, getNamedType, isScalarType, GraphQLInputFieldMap, GraphQLScalarType, GraphQLNamedType, GraphQLInputField, isSpecifiedScalarType } from "graphql";
import { GraphbackOperationType, getInputTypeName, getInputFieldName, getInputFieldType, isOneToManyField, getPrimaryKey } from '@graphback/core';

const PageRequestTypeName = 'PageRequest';
const SortDirectionEnumName = 'SortDirectionEnum';
const OrderByInputTypeName = 'OrderByInput';

const getScalarInputName = (type: GraphQLNamedType) => {
  if (isSpecifiedScalarType(type)) {
    return `${type.name}Input`;
  }

  return 'StringInput';
}

export const FloatScalarInputType = new GraphQLInputObjectType({
  name: getScalarInputName(GraphQLFloat),
  fields: {
    ne: { type: GraphQLFloat },
    eq: { type: GraphQLFloat },
    le: { type: GraphQLFloat },
    lt: { type: GraphQLFloat },
    ge: { type: GraphQLFloat },
    gt: { type: GraphQLFloat },
    in: { type: GraphQLList(GraphQLFloat) },
    between: { type: GraphQLList(GraphQLFloat) }
  }
})

export const IntScalarInputType = new GraphQLInputObjectType({
  name: getScalarInputName(GraphQLInt),
  fields: {
    ne: { type: GraphQLInt },
    eq: { type: GraphQLInt },
    le: { type: GraphQLInt },
    lt: { type: GraphQLInt },
    ge: { type: GraphQLInt },
    gt: { type: GraphQLInt },
    in: { type: GraphQLList(GraphQLInt) },
    between: { type: GraphQLList(GraphQLInt) }
  }
})

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
    contains: { type: GraphQLID },
    startsWith: { type: GraphQLID },
    endsWith: { type: GraphQLID }
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
  return {
    "id": {
      name: "id",
      type: GraphQLNonNull(GraphQLID),
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

function getModelInputFields(modelType: GraphQLObjectType): GraphQLInputField[] {
  return Object.values(modelType.getFields())
    .filter((f: GraphQLField<any, any>) => !isOneToManyField(f))
    .map((f: GraphQLField<any, any>) => {
      return {
        name: getInputFieldName(f),
        type: getInputFieldType(f),
        description: undefined,
        extensions: []
      }
    })
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
  const scalarFields = modelFields.filter((f: GraphQLField<any, any>) => isScalarType(getNamedType(f.type)));

  return new GraphQLInputObjectType({
    name: inputTypeName,
    fields: () => scalarFields
      .map(({ name, type }: GraphQLField<any, any>) => {
        const fieldType: GraphQLNamedType = getNamedType(type)

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
