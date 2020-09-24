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

* [db](_knexdbdataprovider_.knexdbdataprovider.md#protected-db)
* [queryBuilder](_knexdbdataprovider_.knexdbdataprovider.md#protected-querybuilder)
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

\+ **new KnexDBDataProvider**(`model`: ModelDefinition, `db`: Knex): *[KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)*

*Defined in [KnexDBDataProvider.ts:21](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | Knex |

**Returns:** *[KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)*

## Properties

### `Protected` db

• **db**: *Knex*

*Defined in [KnexDBDataProvider.ts:18](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L18)*

___

### `Protected` queryBuilder

• **queryBuilder**: *[CRUDKnexQueryMapper](../interfaces/_knexquerymapper_.crudknexquerymapper.md)*

*Defined in [KnexDBDataProvider.ts:21](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L21)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [KnexDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter?`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Defined in [KnexDBDataProvider.ts:97](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter?` | QueryFilter |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[][]›*

___

###  count

▸ **count**(`filter?`: QueryFilter): *Promise‹number›*

*Defined in [KnexDBDataProvider.ts:90](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:30](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:52](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Defined in [KnexDBDataProvider.ts:74](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:63](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Protected` getSelectedFields

▸ **getSelectedFields**(`selectedFields`: string[]): *string[] | "*"*

*Defined in [KnexDBDataProvider.ts:111](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *string[] | "*"*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:40](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Private` usePage

▸ **usePage**(`query`: QueryBuilder, `page?`: GraphbackPage): *QueryBuilder‹any, any›*

*Defined in [KnexDBDataProvider.ts:115](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | QueryBuilder |
`page?` | GraphbackPage |

**Returns:** *QueryBuilder‹any, any›*
