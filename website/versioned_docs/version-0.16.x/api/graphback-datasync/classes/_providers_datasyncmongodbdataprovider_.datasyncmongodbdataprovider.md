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

  ↳ [DataSyncConflictMongoDBDataProvider](_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md)

## Implements

* GraphbackDataProvider‹Type›
* [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)

## Index

### Constructors

* [constructor](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#constructor)

### Properties

* [TTLinSeconds](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-ttlinseconds)
* [coerceTSFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-coercetsfields)
* [collectionName](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-collectionname)
* [db](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-db)
* [fieldTransformMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-fieldtransformmap)
* [tableMap](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-tablemap)

### Methods

* [batchRead](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#batchread)
* [buildProjectionOption](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-buildprojectionoption)
* [count](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#count)
* [create](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#create)
* [delete](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#delete)
* [findBy](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findby)
* [findOne](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#findone)
* [sync](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#sync)
* [update](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#update)

## Constructors

###  constructor

\+ **new DataSyncMongoDBDataProvider**(`model`: ModelDefinition, `client`: any): *[DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`client` | any |

**Returns:** *[DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)*

## Properties

### `Protected` TTLinSeconds

• **TTLinSeconds**: *number*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:11](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L11)*

___

### `Protected` coerceTSFields

• **coerceTSFields**: *boolean*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[coerceTSFields](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-coercetsfields)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:11

___

### `Protected` collectionName

• **collectionName**: *string*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[collectionName](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-collectionname)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:8

___

### `Protected` db

• **db**: *Db*

*Inherited from [DataSyncMongoDBDataProvider](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md).[db](_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md#protected-db)*

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:7

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

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:19

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

Defined in packages/graphback-runtime-mongodb/types/MongoDBDataProvider.d.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *object*

* \[ **x**: *string*\]: any

___

###  count

▸ **count**(`filter`: QueryFilter): *Promise‹number›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:121](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: any): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:39](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: any, `selectedFields?`: string[]): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:68](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Implementation of [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:107](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`filter`: any, `selectedFields?`: string[]): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:90](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L90)*

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

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:129](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L129)*

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

▸ **update**(`data`: any, `selectedFields?`: string[]): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts:46](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DatasyncMongoDBDataProvider.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*
