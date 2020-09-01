---
id: "_providers_createdatasyncmongodbprovider_"
title: "providers/createDataSyncMongoDbProvider"
sidebar_label: "providers/createDataSyncMongoDbProvider"
---

## Index

### Functions

* [createDataSyncConflictProviderCreator](_providers_createdatasyncmongodbprovider_.md#createdatasyncconflictprovidercreator)
* [createDataSyncMongoDbProvider](_providers_createdatasyncmongodbprovider_.md#createdatasyncmongodbprovider)

## Functions

###  createDataSyncConflictProviderCreator

▸ **createDataSyncConflictProviderCreator**(`db`: Db, `conflictConfig?`: [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md)): *function*

*Defined in [packages/graphback-datasync/src/providers/createDataSyncMongoDbProvider.ts:31](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/createDataSyncMongoDbProvider.ts#L31)*

Creates a new Data Synchronization data provider creator for MongoDB with
optionally specified per-model conflict configuration

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`db` | Db | MongoDB Db object |
`conflictConfig?` | [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md) | Object for configuring conflicts for individual models  |

**Returns:** *function*

▸ (`model`: ModelDefinition): *GraphbackDataProvider*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |

___

###  createDataSyncMongoDbProvider

▸ **createDataSyncMongoDbProvider**(`db`: Db): *function*

*Defined in [packages/graphback-datasync/src/providers/createDataSyncMongoDbProvider.ts:13](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/createDataSyncMongoDbProvider.ts#L13)*

Creates a new Data synchronisation data provider for MongoDb

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`db` | Db | MongoDb connection  |

**Returns:** *function*

▸ (...`args`: any[]): *GraphbackDataProvider*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |
