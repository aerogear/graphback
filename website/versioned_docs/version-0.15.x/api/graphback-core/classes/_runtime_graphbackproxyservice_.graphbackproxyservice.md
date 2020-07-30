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

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:13](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`service` | [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md) |

**Returns:** *[GraphbackProxyService](_runtime_graphbackproxyservice_.graphbackproxyservice.md)*

## Properties

### `Protected` proxiedService

• **proxiedService**: *[GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:13](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L13)*

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: any, `context`: any): *any*

*Implementation of [GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:51](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | any |
`context` | any |

**Returns:** *any*

___

###  create

▸ **create**(`data`: Type, `context`: any): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | any |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: any): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:27](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | any |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type›, `context`: any, `page?`: [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md), `orderBy?`: [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md)): *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type› |
`context` | any |
`page?` | [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md) |
`orderBy?` | [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md) |

**Returns:** *Promise‹[ResultList](../interfaces/_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

___

###  findOne

▸ **findOne**(`args`: any, `context`: any): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`context` | any |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:39](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:47](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:43](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  update

▸ **update**(`data`: Type, `context`: any): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackProxyService.ts:23](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackProxyService.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | any |

**Returns:** *Promise‹Type›*
