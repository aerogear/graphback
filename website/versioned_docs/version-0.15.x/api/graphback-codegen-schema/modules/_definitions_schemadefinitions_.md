---
id: "_definitions_schemadefinitions_"
title: "definitions/schemaDefinitions"
sidebar_label: "definitions/schemaDefinitions"
---

## Index

### Variables

* [BooleanScalarInputType](_definitions_schemadefinitions_.md#const-booleanscalarinputtype)
* [IDScalarInputType](_definitions_schemadefinitions_.md#const-idscalarinputtype)
* [OrderByInputType](_definitions_schemadefinitions_.md#const-orderbyinputtype)
* [PageRequest](_definitions_schemadefinitions_.md#const-pagerequest)
* [SortDirectionEnum](_definitions_schemadefinitions_.md#const-sortdirectionenum)
* [StringScalarInputType](_definitions_schemadefinitions_.md#const-stringscalarinputtype)

### Functions

* [addCreateObjectInputType](_definitions_schemadefinitions_.md#addcreateobjectinputtype)
* [addUpdateObjectInputType](_definitions_schemadefinitions_.md#addupdateobjectinputtype)
* [buildCreateMutationInputType](_definitions_schemadefinitions_.md#const-buildcreatemutationinputtype)
* [buildFilterInputType](_definitions_schemadefinitions_.md#const-buildfilterinputtype)
* [buildFindOneFieldMap](_definitions_schemadefinitions_.md#buildfindonefieldmap)
* [buildMutationInputType](_definitions_schemadefinitions_.md#const-buildmutationinputtype)
* [buildSubscriptionFilterType](_definitions_schemadefinitions_.md#const-buildsubscriptionfiltertype)
* [createInputTypeForScalar](_definitions_schemadefinitions_.md#const-createinputtypeforscalar)
* [createModelListResultType](_definitions_schemadefinitions_.md#const-createmodellistresulttype)
* [createVersionedFields](_definitions_schemadefinitions_.md#createversionedfields)
* [createVersionedInputFields](_definitions_schemadefinitions_.md#createversionedinputfields)

## Variables

### `Const` BooleanScalarInputType

• **BooleanScalarInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:71](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L71)*

___

### `Const` IDScalarInputType

• **IDScalarInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: getInputName(GraphQLID),
  fields: {
    ne: { type: GraphQLID },
    eq: { type: GraphQLID },
    le: { type: GraphQLID },
    lt: { type: GraphQLID },
    ge: { type: GraphQLID },
    gt: { type: GraphQLID },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLID)) },
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:58](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L58)*

___

### `Const` OrderByInputType

• **OrderByInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: 'asc' }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:99](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L99)*

___

### `Const` PageRequest

• **PageRequest**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
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

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:79](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L79)*

___

### `Const` SortDirectionEnum

• **SortDirectionEnum**: *GraphQLEnumType‹›* = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: 'desc' },
    ASC: { value: 'asc' }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:91](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L91)*

___

### `Const` StringScalarInputType

• **StringScalarInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: getInputName(GraphQLString),
  fields: {
    ne: { type: GraphQLString },
    eq: { type: GraphQLString },
    le: { type: GraphQLString },
    lt: { type: GraphQLString },
    ge: { type: GraphQLString },
    gt: { type: GraphQLString },
    in: { type: GraphQLList(GraphQLNonNull(GraphQLString)) },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
    endsWith: { type: GraphQLString }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:42](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L42)*

## Functions

###  addCreateObjectInputType

▸ **addCreateObjectInputType**(`schemaComposer`: SchemaComposer‹any›, `objectType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:306](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L306)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`objectType` | GraphQLObjectType |

**Returns:** *void*

___

###  addUpdateObjectInputType

▸ **addUpdateObjectInputType**(`schemaComposer`: SchemaComposer‹any›, `objectType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:323](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L323)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`objectType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildCreateMutationInputType

▸ **buildCreateMutationInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:195](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildFilterInputType

▸ **buildFilterInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:154](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

###  buildFindOneFieldMap

▸ **buildFindOneFieldMap**(`modelType`: GraphQLObjectType): *GraphQLInputFieldMap*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:139](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | GraphQLObjectType |

**Returns:** *GraphQLInputFieldMap*

___

### `Const` buildMutationInputType

▸ **buildMutationInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:254](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildSubscriptionFilterType

▸ **buildSubscriptionFilterType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:226](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` createInputTypeForScalar

▸ **createInputTypeForScalar**(`scalarType`: GraphQLScalarType): *GraphQLInputObjectType‹›*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:23](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`scalarType` | GraphQLScalarType |

**Returns:** *GraphQLInputObjectType‹›*

___

### `Const` createModelListResultType

▸ **createModelListResultType**(`modelType`: GraphQLObjectType): *GraphQLObjectType‹any, any›*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:340](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L340)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | GraphQLObjectType |

**Returns:** *GraphQLObjectType‹any, any›*

___

###  createVersionedFields

▸ **createVersionedFields**(): *object*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:365](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L365)*

**Returns:** *object*

* ### **[metadataMap.fieldNames.createdAt]**: *object*

  * **description**: *string* = `@${metadataMap.markers.createdAt}\n@db(type: 'timestamp')`

  * **type**: *GraphQLScalarType‹›* = GraphQLString

* ### **[metadataMap.fieldNames.updatedAt]**: *object*

  * **description**: *string* = `@${metadataMap.markers.updatedAt}\n@db(type: 'timestamp')`

  * **type**: *GraphQLScalarType‹›* = GraphQLString

___

###  createVersionedInputFields

▸ **createVersionedInputFields**(): *object*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:354](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L354)*

**Returns:** *object*

* ### **[metadataMap.fieldNames.createdAt]**: *object*

  * **type**: *GraphQLInputObjectType‹›* = StringScalarInputType

* ### **[metadataMap.fieldNames.updatedAt]**: *object*

  * **type**: *GraphQLInputObjectType‹›* = StringScalarInputType
