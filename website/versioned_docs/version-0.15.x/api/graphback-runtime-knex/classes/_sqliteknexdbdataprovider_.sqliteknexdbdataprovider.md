---
id: "_sqliteknexdbdataprovider_.sqliteknexdbdataprovider"
title: "SQLiteKnexDBDataProvider"
sidebar_label: "SQLiteKnexDBDataProvider"
---

Knex.js database data provider exposing basic CRUD operations.

NOTE: This class implements SQLite specific implementaion

## Type parameters

▪ **Type**

## Hierarchy

* [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)‹Type›

  ↳ **SQLiteKnexDBDataProvider**

## Implements

* GraphbackDataProvider‹Type›

## Index

### Constructors

* [constructor](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#constructor)

### Properties

* [baseType](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#protected-basetype)
* [db](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#protected-db)
* [tableMap](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#protected-tablemap)
* [tableName](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#protected-tablename)

### Methods

* [batchRead](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#batchread)
* [count](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#count)
* [create](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#create)
* [delete](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#delete)
* [findBy](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#findby)
* [findOne](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#findone)
* [getSelectedFields](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#protected-getselectedfields)
* [update](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md#update)

## Constructors

###  constructor

\+ **new SQLiteKnexDBDataProvider**(`baseType`: GraphQLObjectType, `db`: Knex): *[SQLiteKnexDBDataProvider](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md)*

*Overrides [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[constructor](_knexdbdataprovider_.knexdbdataprovider.md#constructor)*

*Defined in [SQLiteKnexDBDataProvider.ts:12](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/SQLiteKnexDBDataProvider.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |
`db` | Knex |

**Returns:** *[SQLiteKnexDBDataProvider](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md)*

## Properties

### `Protected` baseType

• **baseType**: *GraphQLObjectType*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[baseType](_knexdbdataprovider_.knexdbdataprovider.md#protected-basetype)*

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

___

### `Protected` db

• **db**: *Knex*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[db](_knexdbdataprovider_.knexdbdataprovider.md#protected-db)*

*Defined in [KnexDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[tableMap](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablemap)*

*Defined in [KnexDBDataProvider.ts:22](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L22)*

___

### `Protected` tableName

• **tableName**: *string*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[tableName](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablename)*

*Defined in [KnexDBDataProvider.ts:21](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: any, `context`: GraphbackContext): *Promise‹Type[][]›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[batchRead](_knexdbdataprovider_.knexdbdataprovider.md#batchread)*

*Defined in [KnexDBDataProvider.ts:104](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type[][]›*

___

###  count

▸ **count**(`filter`: any): *Promise‹number›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[count](_knexdbdataprovider_.knexdbdataprovider.md#count)*

*Defined in [KnexDBDataProvider.ts:97](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Overrides [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[create](_knexdbdataprovider_.knexdbdataprovider.md#create)*

*Defined in [SQLiteKnexDBDataProvider.ts:18](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/SQLiteKnexDBDataProvider.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[delete](_knexdbdataprovider_.knexdbdataprovider.md#delete)*

*Defined in [KnexDBDataProvider.ts:57](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: QueryFilter‹Type›, `context`: GraphbackContext, `page?`: GraphbackPage, `orderBy?`: GraphbackOrderBy): *Promise‹Type[]›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[findBy](_knexdbdataprovider_.knexdbdataprovider.md#findby)*

*Defined in [KnexDBDataProvider.ts:81](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter‹Type› |
`context` | GraphbackContext |
`page?` | GraphbackPage |
`orderBy?` | GraphbackOrderBy |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `context`: GraphbackContext): *Promise‹Type›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[findOne](_knexdbdataprovider_.knexdbdataprovider.md#findone)*

*Defined in [KnexDBDataProvider.ts:70](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

### `Protected` getSelectedFields

▸ **getSelectedFields**(`context`: GraphbackContext): *string[] | "*"*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[getSelectedFields](_knexdbdataprovider_.knexdbdataprovider.md#protected-getselectedfields)*

*Defined in [KnexDBDataProvider.ts:121](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |

**Returns:** *string[] | "*"*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[update](_knexdbdataprovider_.knexdbdataprovider.md#update)*

*Defined in [KnexDBDataProvider.ts:41](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*
