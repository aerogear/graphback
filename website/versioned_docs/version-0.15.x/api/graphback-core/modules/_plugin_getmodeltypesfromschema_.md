---
id: "_plugin_getmodeltypesfromschema_"
title: "plugin/getModelTypesFromSchema"
sidebar_label: "plugin/getModelTypesFromSchema"
---

## Index

### Functions

* [getModelTypesFromSchema](_plugin_getmodeltypesfromschema_.md#const-getmodeltypesfromschema)

## Functions

### `Const` getModelTypesFromSchema

▸ **getModelTypesFromSchema**(`schema`: GraphQLSchema): *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/plugin/getModelTypesFromSchema.ts:14](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/getModelTypesFromSchema.ts#L14)*

Get all GraphQL types from schema without:

- Query, Mutation, Subscription objects
- Internal scalars added by parser

**`deprecated`** Please use `getUserTypes` from @graphql-toolkit/common

**Parameters:**

Name | Type |
------ | ------ |
`schema` | GraphQLSchema |

**Returns:** *GraphQLObjectType[]*
