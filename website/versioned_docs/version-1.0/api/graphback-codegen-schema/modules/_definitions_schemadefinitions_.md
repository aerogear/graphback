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
* [getInputName](_definitions_schemadefinitions_.md#const-getinputname)

## Variables

### `Const` BooleanScalarInputType

• **BooleanScalarInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: getInputName(GraphQLBoolean),
  fields: {
    ne: { type: GraphQLBoolean },
    eq: { type: GraphQLBoolean }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:70](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L70)*

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

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:57](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L57)*

___

### `Const` OrderByInputType

• **OrderByInputType**: *GraphQLInputObjectType‹›* = new GraphQLInputObjectType({
  name: OrderByInputTypeName,
  fields: {
    field: { type: GraphQLNonNull(GraphQLString) },
    order: { type: SortDirectionEnum, defaultValue: 'asc' }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:98](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L98)*

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

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:78](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L78)*

___

### `Const` SortDirectionEnum

• **SortDirectionEnum**: *GraphQLEnumType‹›* = new GraphQLEnumType({
  name: SortDirectionEnumName,
  values: {
    DESC: { value: 'desc' },
    ASC: { value: 'asc' }
  }
})

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:90](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L90)*

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

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:41](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L41)*

## Functions

###  addCreateObjectInputType

▸ **addCreateObjectInputType**(`schemaComposer`: SchemaComposer‹any›, `objectType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:310](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L310)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`objectType` | GraphQLObjectType |

**Returns:** *void*

___

###  addUpdateObjectInputType

▸ **addUpdateObjectInputType**(`schemaComposer`: SchemaComposer‹any›, `objectType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:327](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L327)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`objectType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildCreateMutationInputType

▸ **buildCreateMutationInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:191](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L191)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildFilterInputType

▸ **buildFilterInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:151](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

###  buildFindOneFieldMap

▸ **buildFindOneFieldMap**(`modelType`: ModelDefinition, `schemaComposer`: SchemaComposer‹any›): *GraphQLInputFieldMap*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:138](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | ModelDefinition |
`schemaComposer` | SchemaComposer‹any› |

**Returns:** *GraphQLInputFieldMap*

___

### `Const` buildMutationInputType

▸ **buildMutationInputType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:258](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` buildSubscriptionFilterType

▸ **buildSubscriptionFilterType**(`schemaComposer`: SchemaComposer‹any›, `modelType`: GraphQLObjectType): *void*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:222](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L222)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`modelType` | GraphQLObjectType |

**Returns:** *void*

___

### `Const` createInputTypeForScalar

▸ **createInputTypeForScalar**(`scalarType`: GraphQLScalarType): *GraphQLInputObjectType‹›*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:23](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`scalarType` | GraphQLScalarType |

**Returns:** *GraphQLInputObjectType‹›*

___

### `Const` createModelListResultType

▸ **createModelListResultType**(`modelType`: GraphQLObjectType): *GraphQLObjectType‹any, any›*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:344](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | GraphQLObjectType |

**Returns:** *GraphQLObjectType‹any, any›*

___

###  createVersionedFields

▸ **createVersionedFields**(`type`: GraphQLScalarType): *object*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:369](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L369)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | GraphQLScalarType |

**Returns:** *object*

* ### **[metadataMap.fieldNames.createdAt]**: *object*

  * **description**: *string* = `@${metadataMap.markers.createdAt}`

  * **type**: *GraphQLScalarType‹›*

* ### **[metadataMap.fieldNames.updatedAt]**: *object*

  * **description**: *string* = `@${metadataMap.markers.updatedAt}`

  * **type**: *GraphQLScalarType‹›*

___

###  createVersionedInputFields

▸ **createVersionedInputFields**(`versionedInputType`: GraphQLInputObjectType): *object*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:358](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L358)*

**Parameters:**

Name | Type |
------ | ------ |
`versionedInputType` | GraphQLInputObjectType |

**Returns:** *object*

* ### **[metadataMap.fieldNames.createdAt]**: *object*

  * **type**: *GraphQLInputObjectType‹›* = versionedInputType

* ### **[metadataMap.fieldNames.updatedAt]**: *object*

  * **type**: *GraphQLInputObjectType‹›* = versionedInputType

___

### `Const` getInputName

▸ **getInputName**(`type`: GraphQLNamedType): *string*

*Defined in [graphback-codegen-schema/src/definitions/schemaDefinitions.ts:11](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-codegen-schema/src/definitions/schemaDefinitions.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | GraphQLNamedType |

**Returns:** *string*
