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

* [crudOptions](_services_datasynccrudservice_.datasynccrudservice.md#protected-crudoptions)
* [db](_services_datasynccrudservice_.datasynccrudservice.md#protected-db)
* [model](_services_datasynccrudservice_.datasynccrudservice.md#protected-model)
* [pubSub](_services_datasynccrudservice_.datasynccrudservice.md#protected-pubsub)

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

\+ **new DataSyncCRUDService**(`model`: ModelDefinition, `db`: [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md), `config`: CRUDServiceConfig): *[DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md)*

*Overrides void*

*Defined in [packages/graphback-datasync/src/services/DataSyncCRUDService.ts:15](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | [DataSyncProvider](../interfaces/_providers_datasyncprovider_.datasyncprovider.md) |
`config` | CRUDServiceConfig |

**Returns:** *[DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md)*

## Properties

### `Protected` crudOptions

• **crudOptions**: *GraphbackCRUDGeneratorConfig*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[crudOptions](_services_datasynccrudservice_.datasynccrudservice.md#protected-crudoptions)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:31

___

### `Protected` db

• **db**: *GraphbackDataProvider*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[db](_services_datasynccrudservice_.datasynccrudservice.md#protected-db)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:28

___

### `Protected` model

• **model**: *ModelDefinition*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[model](_services_datasynccrudservice_.datasynccrudservice.md#protected-model)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:29

___

### `Protected` pubSub

• **pubSub**: *PubSubEngine*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[pubSub](_services_datasynccrudservice_.datasynccrudservice.md#protected-pubsub)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:30

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: QueryFilter, `context`: GraphbackContext, `info?`: GraphQLResolveInfo): *any*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[batchLoadData](_services_datasynccrudservice_.datasynccrudservice.md#batchloaddata)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | QueryFilter |
`context` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *any*

___

###  create

▸ **create**(`data`: T, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[create](_services_datasynccrudservice_.datasynccrudservice.md#create)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹T›*

___

###  delete

▸ **delete**(`data`: T, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[delete](_services_datasynccrudservice_.datasynccrudservice.md#delete)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹T›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo, `path?`: string): *Promise‹ResultList‹T››*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[findBy](_services_datasynccrudservice_.datasynccrudservice.md#findby)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |
`path?` | string |

**Returns:** *Promise‹ResultList‹T››*

___

###  findOne

▸ **findOne**(`args`: Partial‹T›, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[findOne](_services_datasynccrudservice_.datasynccrudservice.md#findone)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹T› |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹T›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: QueryFilter): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToCreate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetocreate)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *AsyncIterator‹T› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: QueryFilter): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToDelete](_services_datasynccrudservice_.datasynccrudservice.md#subscribetodelete)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *AsyncIterator‹T› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: QueryFilter): *AsyncIterator‹T› | undefined*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscribeToUpdate](_services_datasynccrudservice_.datasynccrudservice.md#subscribetoupdate)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *AsyncIterator‹T› | undefined*

___

### `Protected` subscriptionTopicMapping

▸ **subscriptionTopicMapping**(`triggerType`: GraphbackOperationType, `objectName`: string): *string*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[subscriptionTopicMapping](_services_datasynccrudservice_.datasynccrudservice.md#protected-subscriptiontopicmapping)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:45

Provides way to map runtime topics for subscriptions for specific types and object names

**Parameters:**

Name | Type |
------ | ------ |
`triggerType` | GraphbackOperationType |
`objectName` | string |

**Returns:** *string*

___

###  sync

▸ **sync**(`lastSync`: Date, `info?`: GraphQLResolveInfo, `filter?`: any, `limit?`: number): *Promise‹[SyncList](../interfaces/_services_datasynccrudservice_.synclist.md)‹T››*

*Defined in [packages/graphback-datasync/src/services/DataSyncCRUDService.ts:24](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/services/DataSyncCRUDService.ts#L24)*

sync
For delta queries

**Parameters:**

Name | Type |
------ | ------ |
`lastSync` | Date |
`info?` | GraphQLResolveInfo |
`filter?` | any |
`limit?` | number |

**Returns:** *Promise‹[SyncList](../interfaces/_services_datasynccrudservice_.synclist.md)‹T››*

___

###  update

▸ **update**(`data`: T, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹T›*

*Inherited from [DataSyncCRUDService](_services_datasynccrudservice_.datasynccrudservice.md).[update](_services_datasynccrudservice_.datasynccrudservice.md#update)*

Defined in packages/graphback-core/types/runtime/CRUDService.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹T›*
