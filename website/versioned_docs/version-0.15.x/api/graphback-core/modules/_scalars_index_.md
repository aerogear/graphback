---
id: "_scalars_index_"
title: "scalars/index"
sidebar_label: "scalars/index"
---

## Index

### Variables

* [GraphbackDate](_scalars_index_.md#const-graphbackdate)
* [GraphbackDateTime](_scalars_index_.md#const-graphbackdatetime)
* [GraphbackJSON](_scalars_index_.md#const-graphbackjson)
* [GraphbackJSONObject](_scalars_index_.md#const-graphbackjsonobject)
* [GraphbackObjectID](_scalars_index_.md#const-graphbackobjectid)
* [GraphbackTime](_scalars_index_.md#const-graphbacktime)
* [GraphbackTimestamp](_scalars_index_.md#const-graphbacktimestamp)
* [graphbackScalarsTypes](_scalars_index_.md#const-graphbackscalarstypes)

### Functions

* [isSpecifiedGraphbackJSONScalarType](_scalars_index_.md#isspecifiedgraphbackjsonscalartype)
* [isSpecifiedGraphbackScalarType](_scalars_index_.md#isspecifiedgraphbackscalartype)

## Variables

### `Const` GraphbackDate

• **GraphbackDate**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(DateResolver),
  name: "GraphbackDate"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:14](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L14)*

___

### `Const` GraphbackDateTime

• **GraphbackDateTime**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(DateTimeResolver),
  name: "GraphbackDateTime"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L19)*

___

### `Const` GraphbackJSON

• **GraphbackJSON**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(JSONResolver),
  name: "GraphbackJSON"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:44](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L44)*

___

### `Const` GraphbackJSONObject

• **GraphbackJSONObject**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(JSONObjectResolver),
  name: "GraphbackJSONObject"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:49](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L49)*

___

### `Const` GraphbackObjectID

• **GraphbackObjectID**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...objectIDConfig,
  parseLiteral: (ast: ValueNode, variables: { [key: string]: any}) => {
    const { ObjectID } = require('mongodb');

    return new ObjectID(parseLiteral(ast, variables));
  },
  parseValue: (value: any) => {
    const { ObjectID } = require('mongodb');

    return new ObjectID(parseValue(value));
  },
  name: "GraphbackObjectID"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:27](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L27)*

___

### `Const` GraphbackTime

• **GraphbackTime**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(TimeResolver),
  name: "GraphbackTime"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:4](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L4)*

___

### `Const` GraphbackTimestamp

• **GraphbackTimestamp**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(TimestampResolver),
  name: "GraphbackTimestamp"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:9](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L9)*

___

### `Const` graphbackScalarsTypes

• **graphbackScalarsTypes**: *GraphQLScalarType‹›[]* = [ GraphbackTime, GraphbackDate, GraphbackJSON, GraphbackObjectID, GraphbackDateTime, GraphbackTimestamp, GraphbackJSONObject ]

*Defined in [packages/graphback-core/src/scalars/index.ts:54](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L54)*

## Functions

###  isSpecifiedGraphbackJSONScalarType

▸ **isSpecifiedGraphbackJSONScalarType**(`type`: GraphQLNamedType): *boolean*

*Defined in [packages/graphback-core/src/scalars/index.ts:70](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L70)*

Checks if the type is on the known JSON Graphback supported scalars

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | GraphQLNamedType | GraphQL type  |

**Returns:** *boolean*

___

###  isSpecifiedGraphbackScalarType

▸ **isSpecifiedGraphbackScalarType**(`type`: GraphQLNamedType): *boolean*

*Defined in [packages/graphback-core/src/scalars/index.ts:61](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/scalars/index.ts#L61)*

Checks if the type is on the default Graphback supported scalars

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | GraphQLNamedType | GraphQL type  |

**Returns:** *boolean*
