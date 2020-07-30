---
id: "_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider"
title: "DataSyncMongoDBDataProvider"
sidebar_label: "DataSyncMongoDBDataProvider"
---

Mongo provider that attains data synchronization using soft deletes

## Type parameters

▪ **Type**

## Hierarchy

* MongoDBDataProvider‹Type›

  ↳ **DataSyncMongoDBDataProvider**

## Implements

* GraphbackDataProvider‹Type›
* [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)

## Index

### Constructors

* [constructor](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#constructor)

### Properties

* [coerceTSFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-coercetsfields)
* [collectionName](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-collectionname)
* [db](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-db)
* [fieldTransformMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-fieldtransformmap)
* [tableMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-tablemap)

### Methods

* [batchRead](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#batchread)
* [buildProjectionOption](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-buildprojectionoption)
* [checkForConflicts](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-checkforconflicts)
* [count](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#count)
* [create](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#create)
* [delete](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#delete)
* [findBy](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findby)
* [findOne](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findone)
* [mapFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-mapfields)
* [sync](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#sync)
* [update](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#update)

## Constructors

###  constructor

\+ **new DataSyncMongoDBDataProvider**(`baseType`: GraphQLObjectType, `client`: any): *[DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |
`client` | any |

**Returns:** *[DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)*

## Properties

### `Protected` coerceTSFields

• **coerceTSFields**: *boolean*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[coerceTSFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-coercetsfields)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:12

___

### `Protected` collectionName

• **collectionName**: *string*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[collectionName](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-collectionname)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:9

___

### `Protected` db

• **db**: *Db*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[db](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-db)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:8

___

### `Protected` fieldTransformMap

• **fieldTransformMap**: *FieldTransformMap*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[fieldTransformMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-fieldtransformmap)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:11

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[tableMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-tablemap)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:10

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: any, `context`: GraphbackContext): *Promise‹Type[][]›*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[batchRead](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#batchread)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type[][]›*

___

### `Protected` buildProjectionOption

▸ **buildProjectionOption**(`context`: GraphbackContext): *object*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[buildProjectionOption](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-buildprojectionoption)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |

**Returns:** *object*

* \[ **x**: *string*\]: any

___

### `Protected` checkForConflicts

▸ **checkForConflicts**(`clientData`: any, `context`: GraphbackContext): *Promise‹[ConflictStateMap](../interfaces/_util_.conflictstatemap.md)›*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:116](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`clientData` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹[ConflictStateMap](../interfaces/_util_.conflictstatemap.md)›*

___

###  count

▸ **count**(`filter`: any): *Promise‹number›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:96](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: any, `context`: GraphbackContext): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:27](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: any, `context`: GraphbackContext): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:44](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: QueryFilter‹Type› | any, `context`: GraphbackContext, `page?`: GraphbackPage, `orderBy?`: GraphbackOrderBy): *Promise‹Type[]›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:86](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter‹Type› &#124; any |
`context` | GraphbackContext |
`page?` | GraphbackPage |
`orderBy?` | GraphbackOrderBy |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`filter`: any, `context`: GraphbackContext): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:69](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

### `Protected` mapFields

▸ **mapFields**(`document`: any): *any*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[mapFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-mapfields)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`document` | any |

**Returns:** *any*

___

###  sync

▸ **sync**(`lastSync`: string, `context`: GraphbackContext, `filter?`: any): *Promise‹Type[]›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:106](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`lastSync` | string |
`context` | GraphbackContext |
`filter?` | any |

**Returns:** *Promise‹Type[]›*

___

###  update

▸ **update**(`data`: any, `context`: GraphbackContext): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:33](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*
