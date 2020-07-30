---
id: "_knexdbdataprovider_.knexdbdataprovider"
title: "KnexDBDataProvider"
sidebar_label: "KnexDBDataProvider"
---

Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
Layer is tested with following databases:

- SQLite (by `SQLiteKnexDBDataProvider`)
- MySQL (MariaDB)
- Postgres

NOTE: For SQLite use dedicated `SQLiteKnexDBDataProvider` that implements more speficic creation method to avoid the not supported `returning()`
statement.

## Type parameters

▪ **Type**

## Hierarchy

* **KnexDBDataProvider**

  ↳ [SQLiteKnexDBDataProvider](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md)

## Implements

* GraphbackDataProvider‹Type›

## Index

### Constructors

* [constructor](_knexdbdataprovider_.knexdbdataprovider.md#constructor)

### Properties

* [baseType](_knexdbdataprovider_.knexdbdataprovider.md#protected-basetype)
* [db](_knexdbdataprovider_.knexdbdataprovider.md#protected-db)
* [tableMap](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablemap)
* [tableName](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablename)

### Methods

* [batchRead](_knexdbdataprovider_.knexdbdataprovider.md#batchread)
* [count](_knexdbdataprovider_.knexdbdataprovider.md#count)
* [create](_knexdbdataprovider_.knexdbdataprovider.md#create)
* [delete](_knexdbdataprovider_.knexdbdataprovider.md#delete)
* [findBy](_knexdbdataprovider_.knexdbdataprovider.md#findby)
* [findOne](_knexdbdataprovider_.knexdbdataprovider.md#findone)
* [getSelectedFields](_knexdbdataprovider_.knexdbdataprovider.md#protected-getselectedfields)
* [update](_knexdbdataprovider_.knexdbdataprovider.md#update)
* [usePage](_knexdbdataprovider_.knexdbdataprovider.md#private-usepage)

## Constructors

###  constructor

\+ **new KnexDBDataProvider**(`baseType`: GraphQLObjectType, `db`: Knex): *[KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)*

*Defined in [KnexDBDataProvider.ts:22](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |
`db` | Knex |

**Returns:** *[KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)*

## Properties

### `Protected` baseType

• **baseType**: *GraphQLObjectType*

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

___

### `Protected` db

• **db**: *Knex*

*Defined in [KnexDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Defined in [KnexDBDataProvider.ts:22](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L22)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [KnexDBDataProvider.ts:21](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: any, `context`: GraphbackContext): *Promise‹Type[][]›*

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

*Defined in [KnexDBDataProvider.ts:97](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

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

*Defined in [KnexDBDataProvider.ts:121](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |

**Returns:** *string[] | "*"*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:41](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

### `Private` usePage

▸ **usePage**(`query`: QueryBuilder, `page?`: GraphbackPage): *QueryBuilder‹any, any›*

*Defined in [KnexDBDataProvider.ts:127](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | QueryBuilder |
`page?` | GraphbackPage |

**Returns:** *QueryBuilder‹any, any›*
