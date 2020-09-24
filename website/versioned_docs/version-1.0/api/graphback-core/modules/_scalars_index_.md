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

*Defined in [packages/graphback-core/src/scalars/index.ts:15](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L15)*

___

### `Const` GraphbackDateTime

• **GraphbackDateTime**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(DateTimeResolver),
  name: "GraphbackDateTime"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:20](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L20)*

___

### `Const` GraphbackJSON

• **GraphbackJSON**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(JSONResolver),
  name: "GraphbackJSON"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:34](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L34)*

___

### `Const` GraphbackJSONObject

• **GraphbackJSONObject**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(JSONObjectResolver),
  name: "GraphbackJSONObject"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:39](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L39)*

___

### `Const` GraphbackObjectID

• **GraphbackObjectID**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...objectIDConfig,
  name: "GraphbackObjectID",
  parseValue: (value: any) => parseObjectID(parseValue(value)),
  parseLiteral: (ast: ValueNode, variables: { [key: string]: any}) => parseObjectID(parseLiteral(ast, variables))
})

*Defined in [packages/graphback-core/src/scalars/index.ts:27](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L27)*

___

### `Const` GraphbackTime

• **GraphbackTime**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(TimeResolver),
  name: "GraphbackTime"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:5](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L5)*

___

### `Const` GraphbackTimestamp

• **GraphbackTimestamp**: *GraphQLScalarType‹›* = new GraphQLScalarType({
  ...extractConfig(TimestampResolver),
  name: "GraphbackTimestamp"
})

*Defined in [packages/graphback-core/src/scalars/index.ts:10](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L10)*

___

### `Const` graphbackScalarsTypes

• **graphbackScalarsTypes**: *GraphQLScalarType‹›[]* = [ GraphbackTime, GraphbackDate, GraphbackJSON, GraphbackObjectID, GraphbackDateTime, GraphbackTimestamp, GraphbackJSONObject ]

*Defined in [packages/graphback-core/src/scalars/index.ts:44](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L44)*

## Functions

###  isSpecifiedGraphbackJSONScalarType

▸ **isSpecifiedGraphbackJSONScalarType**(`type`: GraphQLNamedType): *boolean*

*Defined in [packages/graphback-core/src/scalars/index.ts:60](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L60)*

Checks if the type is on the known JSON Graphback supported scalars

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | GraphQLNamedType | GraphQL type  |

**Returns:** *boolean*

___

###  isSpecifiedGraphbackScalarType

▸ **isSpecifiedGraphbackScalarType**(`type`: GraphQLNamedType): *boolean*

*Defined in [packages/graphback-core/src/scalars/index.ts:51](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/scalars/index.ts#L51)*

Checks if the type is on the default Graphback supported scalars

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | GraphQLNamedType | GraphQL type  |

**Returns:** *boolean*
