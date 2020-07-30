---
id: "_runtime_crudservice_.crudservice"
title: "CRUDService"
sidebar_label: "CRUDService"
---

Default implementation of the CRUD service offering following capabilities:

- Subscriptions: using default publish subscribe method
- Logging: using logging abstraction

## Type parameters

▪ **Type**

## Hierarchy

* **CRUDService**

## Implements

* [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)‹Type›

## Index

### Constructors

* [constructor](_runtime_crudservice_.crudservice.md#constructor)

### Properties

* [crudOptions](_runtime_crudservice_.crudservice.md#private-crudoptions)
* [db](_runtime_crudservice_.crudservice.md#protected-db)
* [modelName](_runtime_crudservice_.crudservice.md#private-modelname)
* [pubSub](_runtime_crudservice_.crudservice.md#private-pubsub)

### Methods

* [batchLoadData](_runtime_crudservice_.crudservice.md#batchloaddata)
* [buildEventPayload](_runtime_crudservice_.crudservice.md#private-buildeventpayload)
* [create](_runtime_crudservice_.crudservice.md#create)
* [delete](_runtime_crudservice_.crudservice.md#delete)
* [findBy](_runtime_crudservice_.crudservice.md#findby)
* [findOne](_runtime_crudservice_.crudservice.md#findone)
* [subscribeToCreate](_runtime_crudservice_.crudservice.md#subscribetocreate)
* [subscribeToDelete](_runtime_crudservice_.crudservice.md#subscribetodelete)
* [subscribeToUpdate](_runtime_crudservice_.crudservice.md#subscribetoupdate)
* [subscriptionTopicMapping](_runtime_crudservice_.crudservice.md#protected-subscriptiontopicmapping)
* [update](_runtime_crudservice_.crudservice.md#update)

## Constructors

###  constructor

\+ **new CRUDService**(`modelName`: string, `db`: [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md), `config`: [CRUDServiceConfig](../interfaces/_runtime_crudservice_.crudserviceconfig.md)): *[CRUDService](_runtime_crudservice_.crudservice.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:32](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`db` | [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md) |
`config` | [CRUDServiceConfig](../interfaces/_runtime_crudservice_.crudserviceconfig.md) |

**Returns:** *[CRUDService](_runtime_crudservice_.crudservice.md)*

## Properties

### `Private` crudOptions

• **crudOptions**: *[GraphbackCRUDGeneratorConfig](../interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:32](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L32)*

___

### `Protected` db

• **db**: *[GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:29](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L29)*

___

### `Private` modelName

• **modelName**: *string*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L31)*

___

### `Private` pubSub

• **pubSub**: *PubSubEngine*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:30](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L30)*

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: any, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *any*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:162](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | any |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *any*

___

### `Private` buildEventPayload

▸ **buildEventPayload**(`action`: string, `result`: any): *object*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:181](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`result` | any |

**Returns:** *object*

___

###  create

▸ **create**(`data`: Type, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:41](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:76](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type›, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `page?`: [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md), `orderBy?`: [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md)): *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:96](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type› |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`page?` | [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md) |
`orderBy?` | [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md) |

**Returns:** *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:92](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter`: any, `_context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:119](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`_context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter`: any, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:147](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter`: any, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:133](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

### `Protected` subscriptionTopicMapping

▸ **subscriptionTopicMapping**(`triggerType`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md), `objectName`: string): *string*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:177](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L177)*

Provides way to map runtime topics for subscriptions for specific types and object names

**Parameters:**

Name | Type |
------ | ------ |
`triggerType` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |
`objectName` | string |

**Returns:** *string*

___

###  update

▸ **update**(`data`: Type, `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:58](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/CRUDService.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *Promise‹Type›*
