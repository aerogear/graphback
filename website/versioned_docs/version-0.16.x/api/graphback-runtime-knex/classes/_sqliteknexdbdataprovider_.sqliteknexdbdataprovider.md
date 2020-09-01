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

\+ **new SQLiteKnexDBDataProvider**(`model`: ModelDefinition, `db`: Knex): *[SQLiteKnexDBDataProvider](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md)*

*Overrides [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[constructor](_knexdbdataprovider_.knexdbdataprovider.md#constructor)*

*Defined in [SQLiteKnexDBDataProvider.ts:11](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/SQLiteKnexDBDataProvider.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | Knex |

**Returns:** *[SQLiteKnexDBDataProvider](_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md)*

## Properties

### `Protected` db

• **db**: *Knex*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[db](_knexdbdataprovider_.knexdbdataprovider.md#protected-db)*

*Defined in [KnexDBDataProvider.ts:18](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L18)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[tableMap](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablemap)*

*Defined in [KnexDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L20)*

___

### `Protected` tableName

• **tableName**: *string*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[tableName](_knexdbdataprovider_.knexdbdataprovider.md#protected-tablename)*

*Defined in [KnexDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L19)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter?`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[batchRead](_knexdbdataprovider_.knexdbdataprovider.md#batchread)*

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

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[count](_knexdbdataprovider_.knexdbdataprovider.md#count)*

*Defined in [KnexDBDataProvider.ts:93](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `selectedFields?`: string[]): *Promise‹Type›*

*Overrides [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[create](_knexdbdataprovider_.knexdbdataprovider.md#create)*

*Defined in [SQLiteKnexDBDataProvider.ts:17](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/SQLiteKnexDBDataProvider.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[delete](_knexdbdataprovider_.knexdbdataprovider.md#delete)*

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

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[findBy](_knexdbdataprovider_.knexdbdataprovider.md#findby)*

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

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[findOne](_knexdbdataprovider_.knexdbdataprovider.md#findone)*

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

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[getSelectedFields](_knexdbdataprovider_.knexdbdataprovider.md#protected-getselectedfields)*

*Defined in [KnexDBDataProvider.ts:114](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *string[] | "*"*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [KnexDBDataProvider](_knexdbdataprovider_.knexdbdataprovider.md).[update](_knexdbdataprovider_.knexdbdataprovider.md#update)*

*Defined in [KnexDBDataProvider.ts:38](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-knex/src/KnexDBDataProvider.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*
