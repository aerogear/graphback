---
id: "_runtime_graphbackproxyservice_.graphbackproxyservice"
title: "GraphbackProxyService"
sidebar_label: "GraphbackProxyService"
---

ProxyService that can be used by any services that wish to extend
Graphback functionality.
Service works by proxying method requests to another service or
datastore.

## Type parameters

▪ **Type**

## Hierarchy

* **GraphbackProxyService**

## Implements

* [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)‹Type›

## Index

### Constructors

* [constructor](_runtime_graphbackproxyservice_.graphbackproxyservice.md#constructor)

### Properties

* [proxiedService](_runtime_graphbackproxyservice_.graphbackproxyservice.md#protected-proxiedservice)

### Methods

* [batchLoadData](_runtime_graphbackproxyservice_.graphbackproxyservice.md#batchloaddata)
* [create](_runtime_graphbackproxyservice_.graphbackproxyservice.md#create)
* [delete](_runtime_graphbackproxyservice_.graphbackproxyservice.md#delete)
* [findBy](_runtime_graphbackproxyservice_.graphbackproxyservice.md#findby)
* [findOne](_runtime_graphbackproxyservice_.graphbackproxyservice.md#findone)
* [subscribeToCreate](_runtime_graphbackproxyservice_.graphbackproxyservice.md#subscribetocreate)
* [subscribeToDelete](_runtime_graphbackproxyservice_.graphbackproxyservice.md#subscribetodelete)
* [subscribeToUpdate](_runtime_graphbackproxyservice_.graphbackproxyservice.md#subscribetoupdate)
* [update](_runtime_graphbackproxyservice_.graphbackproxyservice.md#update)

## Constructors

###  constructor

\+ **new GraphbackProxyService**(`service`: [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)): *[GraphbackProxyService](_runtime_graphbackproxyservice_.graphbackproxyservice.md)*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:14](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`service` | [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md) |

**Returns:** *[GraphbackProxyService](_runtime_graphbackproxyservice_.graphbackproxyservice.md)*

## Properties

### `Protected` proxiedService

• **proxiedService**: *[GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:14](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L14)*

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *any*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:52](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L52)*

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

###  create

▸ **create**(`data`: Type, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:20](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L20)*

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

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:28](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L28)*

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

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:36](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L36)*

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

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:32](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Partial‹Type› |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:40](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:48](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:44](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |

**Returns:** *AsyncIterator‹Type›*

___

###  update

▸ **update**(`data`: Type, `context?`: [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:24](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*
