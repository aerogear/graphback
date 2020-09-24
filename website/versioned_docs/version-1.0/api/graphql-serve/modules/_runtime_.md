---
id: "_runtime_"
title: "runtime"
sidebar_label: "runtime"
---

## Index

### Interfaces

* [DataSyncServeConfig](../interfaces/_runtime_.datasyncserveconfig.md)
* [Runtime](../interfaces/_runtime_.runtime.md)

### Type aliases

* [ConflictResolutionStrategyName](_runtime_.md#conflictresolutionstrategyname)

### Functions

* [createMongoDBClient](_runtime_.md#const-createmongodbclient)
* [createRuntime](_runtime_.md#createruntime)

### Object literals

* [ConflictStrategyMap](_runtime_.md#const-conflictstrategymap)

## Type aliases

###  ConflictResolutionStrategyName

Ƭ **ConflictResolutionStrategyName**: *keyof typeof ConflictStrategyMap*

*Defined in [runtime.ts:12](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L12)*

## Functions

### `Const` createMongoDBClient

▸ **createMongoDBClient**(): *Promise‹MongoClient›*

*Defined in [runtime.ts:35](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L35)*

**Returns:** *Promise‹MongoClient›*

___

###  createRuntime

▸ **createRuntime**(`modelDir`: string, `db`: Db, `datasyncServeConfig`: [DataSyncServeConfig](../interfaces/_runtime_.datasyncserveconfig.md)): *GraphbackAPI*

*Defined in [runtime.ts:51](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L51)*

Method used to create runtime schema
It will be part of the integration tests

**Parameters:**

Name | Type |
------ | ------ |
`modelDir` | string |
`db` | Db |
`datasyncServeConfig` | [DataSyncServeConfig](../interfaces/_runtime_.datasyncserveconfig.md) |

**Returns:** *GraphbackAPI*

## Object literals

### `Const` ConflictStrategyMap

### ▪ **ConflictStrategyMap**: *object*

*Defined in [runtime.ts:14](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L14)*

###  clientSideWins

• **clientSideWins**: *ConflictResolutionStrategy* = ClientSideWins

*Defined in [runtime.ts:15](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L15)*

###  serverSideWins

• **serverSideWins**: *ConflictResolutionStrategy* = ServerSideWins

*Defined in [runtime.ts:16](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L16)*

###  throwOnConflict

• **throwOnConflict**: *ConflictResolutionStrategy* = ThrowOnConflict

*Defined in [runtime.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/runtime.ts#L17)*
