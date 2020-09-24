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

* [crudOptions](_runtime_crudservice_.crudservice.md#protected-crudoptions)
* [db](_runtime_crudservice_.crudservice.md#protected-db)
* [model](_runtime_crudservice_.crudservice.md#protected-model)
* [pubSub](_runtime_crudservice_.crudservice.md#protected-pubsub)

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

\+ **new CRUDService**(`model`: [ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition), `db`: [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md), `config`: [CRUDServiceConfig](../interfaces/_runtime_crudservice_.crudserviceconfig.md)): *[CRUDService](_runtime_crudservice_.crudservice.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:37](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition) |
`db` | [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md) |
`config` | [CRUDServiceConfig](../interfaces/_runtime_crudservice_.crudserviceconfig.md) |

**Returns:** *[CRUDService](_runtime_crudservice_.crudservice.md)*

## Properties

### `Protected` crudOptions

• **crudOptions**: *[GraphbackCRUDGeneratorConfig](../interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:37](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L37)*

___

### `Protected` db

• **db**: *[GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:34](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L34)*

___

### `Protected` model

• **model**: *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:35](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L35)*

___

### `Protected` pubSub

• **pubSub**: *PubSubEngine*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:36](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L36)*

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *any*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:196](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L196)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |
`context` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *any*

___

### `Private` buildEventPayload

▸ **buildEventPayload**(`action`: string, `result`: any): *object*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:232](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | string |
`result` | any |

**Returns:** *object*

___

###  create

▸ **create**(`data`: Type, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:46](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:89](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: [FindByArgs](../interfaces/_runtime_interfaces_.findbyargs.md), `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo, `path?`: string): *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:119](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | [FindByArgs](../interfaces/_runtime_interfaces_.findbyargs.md) |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |
`path?` | string |

**Returns:** *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:110](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:148](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:180](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:164](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |

**Returns:** *AsyncIterator‹Type› | undefined*

___

### `Protected` subscriptionTopicMapping

▸ **subscriptionTopicMapping**(`triggerType`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md), `objectName`: string): *string*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:228](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L228)*

Provides way to map runtime topics for subscriptions for specific types and object names

**Parameters:**

Name | Type |
------ | ------ |
`triggerType` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |
`objectName` | string |

**Returns:** *string*

___

###  update

▸ **update**(`data`: Type, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/CRUDService.ts:67](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/CRUDService.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*
