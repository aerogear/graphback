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

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | Knex |

**Returns:** *[KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md)*

## Properties

### `Protected` db

• **db**: *Knex*

*Defined in [KnexDBDataProvider.ts:18](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L18)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [KnexDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter?`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Defined in [KnexDBDataProvider.ts:100](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L100)*

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

*Defined in [KnexDBDataProvider.ts:93](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:28](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:53](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Defined in [KnexDBDataProvider.ts:77](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:66](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Protected` getSelectedFields

▸ **getSelectedFields**(`selectedFields`: string[]): *string[] | "*"*

*Defined in [KnexDBDataProvider.ts:114](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *string[] | "*"*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [KnexDBDataProvider.ts:38](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Private` usePage

▸ **usePage**(`query`: QueryBuilder, `page?`: GraphbackPage): *QueryBuilder‹any, any›*

*Defined in [KnexDBDataProvider.ts:118](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | QueryBuilder |
`page?` | GraphbackPage |

**Returns:** *QueryBuilder‹any, any›*
