---
id: "_runtime_"
title: "runtime"
sidebar_label: "runtime"
---

## Index

### Interfaces

* [Runtime](../interfaces/_runtime_.runtime.md)

### Functions

* [createMongoDBClient](_runtime_.md#const-createmongodbclient)
* [createRuntime](_runtime_.md#const-createruntime)

## Functions

### `Const` createMongoDBClient

▸ **createMongoDBClient**(): *Promise‹MongoClient›*

*Defined in [runtime.ts:20](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-serve/src/runtime.ts#L20)*

**Returns:** *Promise‹MongoClient›*

___

### `Const` createRuntime

▸ **createRuntime**(`modelDir`: string, `db`: Db, `datasync`: boolean): *Promise‹GraphbackAPI›*

*Defined in [runtime.ts:32](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-serve/src/runtime.ts#L32)*

Method used to create runtime schema
It will be part of the integration tests

**Parameters:**

Name | Type |
------ | ------ |
`modelDir` | string |
`db` | Db |
`datasync` | boolean |

**Returns:** *Promise‹GraphbackAPI›*
