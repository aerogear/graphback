---
id: "_db_buildmodeltablemap_"
title: "db/buildModelTableMap"
sidebar_label: "db/buildModelTableMap"
---

## Index

### Interfaces

* [ModelTableMap](../interfaces/_db_buildmodeltablemap_.modeltablemap.md)

### Functions

* [buildModelTableMap](_db_buildmodeltablemap_.md#const-buildmodeltablemap)
* [getColumnName](_db_buildmodeltablemap_.md#getcolumnname)
* [getTableName](_db_buildmodeltablemap_.md#gettablename)

## Functions

### `Const` buildModelTableMap

▸ **buildModelTableMap**(`model`: GraphQLObjectType): *[ModelTableMap](../interfaces/_db_buildmodeltablemap_.modeltablemap.md)*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:75](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/db/buildModelTableMap.ts#L75)*

Builds a database mapping model of a GraphQLObject type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | GraphQLObjectType | The GraphQL object data model representation  |

**Returns:** *[ModelTableMap](../interfaces/_db_buildmodeltablemap_.modeltablemap.md)*

A model containing the table name, any field customisations and a mapping of the primary key field.

___

###  getColumnName

▸ **getColumnName**(`field`: GraphQLField‹any, any›): *string*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:44](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/db/buildModelTableMap.ts#L44)*

Gets the datase column name for a GraphQL field.
Checks for the `@db(name)` annotation for a customised name

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`field` | GraphQLField‹any, any› |   |

**Returns:** *string*

___

###  getTableName

▸ **getTableName**(`model`: GraphQLObjectType): *string*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:27](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/db/buildModelTableMap.ts#L27)*

Gets the datase column name for a GraphQL type.
Checks for the `@db(name)` annotation for a customised name

**Parameters:**

Name | Type |
------ | ------ |
`model` | GraphQLObjectType |

**Returns:** *string*
