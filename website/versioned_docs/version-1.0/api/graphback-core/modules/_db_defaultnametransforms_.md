---
id: "_db_defaultnametransforms_"
title: "db/defaultNameTransforms"
sidebar_label: "db/defaultNameTransforms"
---

## Index

### Type aliases

* [DatabaseNameTransform](_db_defaultnametransforms_.md#databasenametransform)
* [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection)

### Functions

* [defaultTableNameTransform](_db_defaultnametransforms_.md#defaulttablenametransform)
* [transformForeignKeyName](_db_defaultnametransforms_.md#transformforeignkeyname)

## Type aliases

###  DatabaseNameTransform

Ƭ **DatabaseNameTransform**: *function*

*Defined in [packages/graphback-core/src/db/defaultNameTransforms.ts:6](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/defaultNameTransforms.ts#L6)*

Transform to/from database table or column name

#### Type declaration:

▸ (`name`: string, `direction`: [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`direction` | [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection) |

___

###  DatabaseNameTransformDirection

Ƭ **DatabaseNameTransformDirection**: *"from-db" | "to-db"*

*Defined in [packages/graphback-core/src/db/defaultNameTransforms.ts:1](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/defaultNameTransforms.ts#L1)*

## Functions

###  defaultTableNameTransform

▸ **defaultTableNameTransform**(`name`: string, `direction`: [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection)): *string*

*Defined in [packages/graphback-core/src/db/defaultNameTransforms.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/defaultNameTransforms.ts#L17)*

Transform to/from database table name

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | model name |
`direction` | [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection) | transform to or from database  |

**Returns:** *string*

___

###  transformForeignKeyName

▸ **transformForeignKeyName**(`name`: string, `direction`: [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection)): *string*

*Defined in [packages/graphback-core/src/db/defaultNameTransforms.ts:25](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/defaultNameTransforms.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`direction` | [DatabaseNameTransformDirection](_db_defaultnametransforms_.md#databasenametransformdirection) | "to-db" |

**Returns:** *string*
