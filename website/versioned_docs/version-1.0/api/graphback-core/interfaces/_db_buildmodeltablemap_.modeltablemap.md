---
id: "_db_buildmodeltablemap_.modeltablemap"
title: "ModelTableMap"
sidebar_label: "ModelTableMap"
---

Contains mapping information between GraphQL Model type and database table

- typeName: Original GraphQLObjectType name
- tableName: Name of datase table
- id: Indicates the primary key field
- fieldMap: Object of key-value mapping between GraphQL fields and database columns.

## Hierarchy

* **ModelTableMap**

## Index

### Properties

* [fieldMap](_db_buildmodeltablemap_.modeltablemap.md#optional-fieldmap)
* [idField](_db_buildmodeltablemap_.modeltablemap.md#idfield)
* [tableName](_db_buildmodeltablemap_.modeltablemap.md#tablename)
* [typeName](_db_buildmodeltablemap_.modeltablemap.md#typename)

## Properties

### `Optional` fieldMap

• **fieldMap**? : *object*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:18](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L18)*

#### Type declaration:

* \[ **key**: *string*\]: string

___

###  idField

• **idField**: *string*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L17)*

___

###  tableName

• **tableName**: *string*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:16](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L16)*

___

###  typeName

• **typeName**: *string*

*Defined in [packages/graphback-core/src/db/buildModelTableMap.ts:15](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/buildModelTableMap.ts#L15)*
