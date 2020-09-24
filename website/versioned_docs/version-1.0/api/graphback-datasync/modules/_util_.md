---
id: "_util_"
title: "util"
sidebar_label: "util"
---

## Index

### Classes

* [ConflictError](../classes/_util_.conflicterror.md)

### Interfaces

* [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)
* [ConflictResolutionStrategy](../interfaces/_util_.conflictresolutionstrategy.md)
* [DataSyncModelConfigMap](../interfaces/_util_.datasyncmodelconfigmap.md)
* [DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md)
* [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md)

### Functions

* [getDataSyncAnnotationData](_util_.md#getdatasyncannotationdata)
* [getModelConfigFromGlobal](_util_.md#getmodelconfigfromglobal)
* [isDataSyncModel](_util_.md#isdatasyncmodel)
* [isDataSyncService](_util_.md#isdatasyncservice)
* [isDataSyncType](_util_.md#isdatasynctype)

### Object literals

* [ClientSideWins](_util_.md#const-clientsidewins)
* [DataSyncFieldNames](_util_.md#const-datasyncfieldnames)
* [ServerSideWins](_util_.md#const-serversidewins)
* [ThrowOnConflict](_util_.md#const-throwonconflict)

## Functions

###  getDataSyncAnnotationData

▸ **getDataSyncAnnotationData**(`model`: ModelDefinition): *any*

*Defined in [packages/graphback-datasync/src/util.ts:14](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |

**Returns:** *any*

___

###  getModelConfigFromGlobal

▸ **getModelConfigFromGlobal**(`modelName`: string, `globalConfig`: [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md)): *[DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md)*

*Defined in [packages/graphback-datasync/src/util.ts:51](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L51)*

Function to get conflict configuration of specific model from specified global configuration

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`modelName` | string | - | Name of the model's GraphQL type |
`globalConfig` | [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md) | {} | Specified global config  |

**Returns:** *[DataSyncModelConflictConfig](../interfaces/_util_.datasyncmodelconflictconfig.md)*

___

###  isDataSyncModel

▸ **isDataSyncModel**(`model`: ModelDefinition): *boolean*

*Defined in [packages/graphback-datasync/src/util.ts:6](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |

**Returns:** *boolean*

___

###  isDataSyncService

▸ **isDataSyncService**(`service`: GraphbackCRUDService): *[DataSyncCRUDService](../classes/_services_datasynccrudservice_.datasynccrudservice.md)*

*Defined in [packages/graphback-datasync/src/util.ts:18](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`service` | GraphbackCRUDService |

**Returns:** *[DataSyncCRUDService](../classes/_services_datasynccrudservice_.datasynccrudservice.md)*

___

###  isDataSyncType

▸ **isDataSyncType**(`graphqlType`: GraphQLObjectType): *boolean*

*Defined in [packages/graphback-datasync/src/util.ts:10](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`graphqlType` | GraphQLObjectType |

**Returns:** *boolean*

## Object literals

### `Const` ClientSideWins

### ▪ **ClientSideWins**: *object*

*Defined in [packages/graphback-datasync/src/util.ts:148](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L148)*

The ClientSideWins conflict resolution strategy

###  resolveDelete

▸ **resolveDelete**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:160](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*

###  resolveUpdate

▸ **resolveUpdate**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:149](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*

___

### `Const` DataSyncFieldNames

### ▪ **DataSyncFieldNames**: *object*

*Defined in [packages/graphback-datasync/src/util.ts:80](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L80)*

###  deleted

• **deleted**: *string* = "_deleted"

*Defined in [packages/graphback-datasync/src/util.ts:83](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L83)*

###  lastUpdatedAt

• **lastUpdatedAt**: *string* = "_lastUpdatedAt"

*Defined in [packages/graphback-datasync/src/util.ts:82](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L82)*

###  ttl

• **ttl**: *string* = "_ttl"

*Defined in [packages/graphback-datasync/src/util.ts:84](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L84)*

###  version

• **version**: *string* = "_version"

*Defined in [packages/graphback-datasync/src/util.ts:81](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L81)*

___

### `Const` ServerSideWins

### ▪ **ServerSideWins**: *object*

*Defined in [packages/graphback-datasync/src/util.ts:127](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L127)*

The ServerSideWins conflict resolution strategy

###  resolveDelete

▸ **resolveDelete**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:139](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*

###  resolveUpdate

▸ **resolveUpdate**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:128](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*

___

### `Const` ThrowOnConflict

### ▪ **ThrowOnConflict**: *object*

*Defined in [packages/graphback-datasync/src/util.ts:173](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L173)*

###  resolveDelete

▸ **resolveDelete**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:177](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*

###  resolveUpdate

▸ **resolveUpdate**(`conflict`: [ConflictMetadata](../interfaces/_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:174](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](../interfaces/_util_.conflictmetadata.md) |

**Returns:** *any*
