---
id: "_deltasource_.mongodeltasource"
title: "MongoDeltaSource"
sidebar_label: "MongoDeltaSource"
---

Provides the ability to insert delta snapshots into MongoDB collections
and get base for conflict resolution

## Type parameters

▪ **Type**

## Hierarchy

* **MongoDeltaSource**

## Index

### Constructors

* [constructor](_deltasource_.mongodeltasource.md#constructor)

### Properties

* [collectionName](_deltasource_.mongodeltasource.md#protected-collectionname)
* [db](_deltasource_.mongodeltasource.md#protected-db)
* [deltaTTL](_deltasource_.mongodeltasource.md#protected-deltattl)

### Methods

* [findBaseForConflicts](_deltasource_.mongodeltasource.md#findbaseforconflicts)
* [insertDiff](_deltasource_.mongodeltasource.md#insertdiff)

## Constructors

###  constructor

\+ **new MongoDeltaSource**(`model`: ModelDefinition, `db`: Db, `deltaTTL`: number): *[MongoDeltaSource](_deltasource_.mongodeltasource.md)*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:17](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | Db |
`deltaTTL` | number |

**Returns:** *[MongoDeltaSource](_deltasource_.mongodeltasource.md)*

## Properties

### `Protected` collectionName

• **collectionName**: *string*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:16](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L16)*

___

### `Protected` db

• **db**: *Db*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:15](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L15)*

___

### `Protected` deltaTTL

• **deltaTTL**: *number*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:17](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L17)*

## Methods

###  findBaseForConflicts

▸ **findBaseForConflicts**(`updateDocument`: any): *Promise‹Type›*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:46](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`updateDocument` | any |

**Returns:** *Promise‹Type›*

___

###  insertDiff

▸ **insertDiff**(`updatedDocument`: Type): *Promise‹void›*

*Defined in [packages/graphback-datasync/src/deltaSource.ts:34](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/deltaSource.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`updatedDocument` | Type |

**Returns:** *Promise‹void›*
