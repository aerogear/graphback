---
id: "_services_datasynccrudservice_.datasynccrudservice"
title: "DataSyncCRUDService"
sidebar_label: "DataSyncCRUDService"
---

CRUD Service for datasync

## Type parameters

▪ **T**

## Hierarchy

* CRUDService‹T›

  ↳ **DataSyncCRUDService**

## Implements

* GraphbackCRUDService‹T›

## Index

### Constructors

* [constructor](_services_datasynccrudservice_.datasynccrudservice.md#constructor)

### Properties

* [db](_services_datasynccrudservice_.datasynccrudservice.md#protected-db)

### Methods

* [batchLoadData](_services_datasynccrudservice_.datasynccrudservice.md#batchloaddata)
* [create](_services_datasynccrudservice_.datasynccrudservice.md#create)
* [delete](_services_datasynccrudservice_.datasynccrudservice.md#delete)
* [findBy](_services_datasynccrudservice_.datasynccrudservice.md#findby)
* [findOne](_services_datasynccrudservice_.datasynccrudservice.md#findone)
* [subscribeToCreate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetocreate)
* [subscribeToDelete](_services_datasynccrudservice_.datasynccrudservice.md#subscribetodelete)
* [subscribeToUpdate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetoupdate)
* [subscriptionTopicMapping](_services_datasynccrudservice_.datasynccrudservice.md#protected-subscriptiontopicmapping)
* [sync](_services_datasynccrudservice_.datasynccrudservice.md#sync)
* [update](_services_datasynccrudservice_.datasynccrudservice.md#update)

## Constructors

###  constructor

\+ **new DataSyncCRUDService**(`modelName`: string, `db`: [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md), `config`: CRUDServiceConfig): *[DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/services/DataSyncCRUDService.ts:12](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`db` | [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md) |
`config` | CRUDServiceConfig |

**Returns:** *[DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md)*

## Properties

### `Protected` db

• **db**: *GraphbackDataProvider*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[db](_services_datasynccrudservice_.datasynccrudservice.md#protected-db)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:24

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: any, `context`: GraphbackContext): *any*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[batchLoadData](_services_datasynccrudservice_.datasynccrudservice.md#batchloaddata)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *any*

___

###  create

▸ **create**(`data`: T, `context`: GraphbackContext): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[create](_services_datasynccrudservice_.datasynccrudservice.md#create)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context` | GraphbackContext |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`data`: T, `context`: GraphbackContext): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[delete](_services_datasynccrudservice_.datasynccrudservice.md#delete)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context` | GraphbackContext |

**Returns:** *Promise‹T›*

___

###  findBy

▸ **findBy**(`filter`: QueryFilter‹T›, `context`: GraphbackContext, `page?`: GraphbackPage, `orderBy?`: GraphbackOrderBy): *Promise‹ResultList‹T››*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[findBy](_services_datasynccrudservice_.datasynccrudservice.md#findby)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter‹T› |
`context` | GraphbackContext |
`page?` | GraphbackPage |
`orderBy?` | GraphbackOrderBy |

**Returns:** *Promise‹ResultList‹T››*

___

###  findOne

▸ **findOne**(`args`: Partial‹T›, `context`: GraphbackContext): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[findOne](_services_datasynccrudservice_.datasynccrudservice.md#findone)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹T› |
`context` | GraphbackContext |

**Returns:** *Promise‹T›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter`: any, `_context?`: GraphbackContext): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToCreate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetocreate)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`_context?` | GraphbackContext |

**Returns:** *AsyncIterator‹T› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter`: any, `context`: GraphbackContext): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToDelete](_services_datasynccrudservice_.datasynccrudservice.md#subscribetodelete)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *AsyncIterator‹T› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter`: any, `context`: GraphbackContext): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToUpdate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetoupdate)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *AsyncIterator‹T› | undefined*

___

### `Protected` subscriptionTopicMapping

▸ **subscriptionTopicMapping**(`triggerType`: GraphbackOperationType, `objectName`: string): *string*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscriptionTopicMapping](_services_datasynccrudservice_.datasynccrudservice.md#protected-subscriptiontopicmapping)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:41

Provides way to map runtime topics for subscriptions for specific types and object names

**Parameters:**

Name | Type |
------ | ------ |
`triggerType` | GraphbackOperationType |
`objectName` | string |

**Returns:** *string*

___

###  sync

▸ **sync**(`lastSync`: string, `context`: GraphbackContext, `filter?`: any): *Promise‹[SyncList](../interfaces/_services_datasynccrudservice_.synclist.md)‹T››*

*Defined in [packages/graphback-datasync/src/services/DataSyncCRUDService.ts:21](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L21)*

sync
For delta queries

**Parameters:**

Name | Type |
------ | ------ |
`lastSync` | string |
`context` | GraphbackContext |
`filter?` | any |

**Returns:** *Promise‹[SyncList](../interfaces/_services_datasynccrudservice_.synclist.md)‹T››*

___

###  update

▸ **update**(`data`: T, `context`: GraphbackContext): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[update](_services_datasynccrudservice_.datasynccrudservice.md#update)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context` | GraphbackContext |

**Returns:** *Promise‹T›*
