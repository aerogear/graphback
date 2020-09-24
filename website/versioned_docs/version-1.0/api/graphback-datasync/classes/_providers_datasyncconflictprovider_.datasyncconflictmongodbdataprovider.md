---
id: "_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider"
title: "DataSyncConflictMongoDBDataProvider"
sidebar_label: "DataSyncConflictMongoDBDataProvider"
---

Data Provider with update conflicts and optional conflict resolution
that connects to the MongoDB database

## Type parameters

▪ **Type**

## Hierarchy

  ↳ [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)‹Type›

  ↳ **DataSyncConflictMongoDBDataProvider**

## Implements

* GraphbackDataProvider‹Type›
* [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)

## Index

### Constructors

* [constructor](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#constructor)

### Properties

* [TTLinSeconds](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-ttlinseconds)
* [collectionName](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-collectionname)
* [conflictConfig](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-conflictconfig)
* [db](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-db)
* [deltaSource](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-deltasource)
* [fieldTransformMap](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-fieldtransformmap)
* [tableMap](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-tablemap)

### Methods

* [batchRead](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#batchread)
* [buildProjectionOption](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-buildprojectionoption)
* [checkForConflict](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#protected-checkforconflict)
* [count](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#count)
* [create](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#create)
* [delete](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#delete)
* [findBy](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#findby)
* [findOne](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#findone)
* [sync](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#sync)
* [update](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md#update)

## Constructors

###  constructor

\+ **new DataSyncConflictMongoDBDataProvider**(`model`: ModelDefinition, `client`: any, `dataSyncConflictConfig`: [DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md)): *[DataSyncConflictMongoDBDataProvider](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md)*

*Overrides [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[constructor](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#constructor)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:14](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`client` | any |
`dataSyncConflictConfig` | [DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md) |

**Returns:** *[DataSyncConflictMongoDBDataProvider](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md)*

## Properties

### `Protected` TTLinSeconds

• **TTLinSeconds**: *number*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[TTLinSeconds](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-ttlinseconds)*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11)*

___

### `Protected` collectionName

• **collectionName**: *string*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[collectionName](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-collectionname)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:8

___

### `Protected` conflictConfig

• **conflictConfig**: *[DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:13](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L13)*

___

### `Protected` db

• **db**: *Db*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[db](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-db)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:7

___

### `Protected` deltaSource

• **deltaSource**: *[MongoDeltaSource](_deltasource_.mongodeltasource.md)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:14](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L14)*

___

### `Protected` fieldTransformMap

• **fieldTransformMap**: *FieldTransformMap*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[fieldTransformMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-fieldtransformmap)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:10

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[tableMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-tablemap)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:9

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter?`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[batchRead](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#batchread)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter?` | QueryFilter |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[][]›*

___

### `Protected` buildProjectionOption

▸ **buildProjectionOption**(`selectedFields`: string[]): *object*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[buildProjectionOption](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-buildprojectionoption)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *object*

* \[ **x**: *string*\]: any

___

### `Protected` checkForConflict

▸ **checkForConflict**(`clientData`: any, `base`: any, `serverData`: any, `operation`: GraphbackOperationType): *[ConflictMetadata](../interfaces/_util_.conflictmetadata.md) | undefined*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:134](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`clientData` | any |
`base` | any |
`serverData` | any |
`operation` | GraphbackOperationType |

**Returns:** *[ConflictMetadata](../interfaces/_util_.conflictmetadata.md) | undefined*

___

###  count

▸ **count**(`filter`: QueryFilter): *Promise‹number›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[count](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#count)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:122](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: any): *Promise‹Type›*

*Overrides [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[create](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#create)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:27](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: any, `selectedFields`: string[]): *Promise‹Type›*

*Overrides [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[delete](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#delete)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:86](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`selectedFields` | string[] |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[findBy](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findby)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:108](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`filter`: any, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[findOne](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findone)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:89](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  sync

▸ **sync**(`lastSync`: Date, `selectedFields?`: string[], `filter?`: QueryFilter, `limit?`: number): *Promise‹Type[]›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[sync](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#sync)*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:130](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`lastSync` | Date |
`selectedFields?` | string[] |
`filter?` | QueryFilter |
`limit?` | number |

**Returns:** *Promise‹Type[]›*

___

###  update

▸ **update**(`updateDocument`: any, `selectedFields`: string[]): *Promise‹Type›*

*Overrides [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[update](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#update)*

*Defined in [packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts:41](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/providers/DataSyncConflictProvider.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`updateDocument` | any |
`selectedFields` | string[] |

**Returns:** *Promise‹Type›*
