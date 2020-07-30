---
id: "_runtime_graphbackcrudservice_.graphbackcrudservice"
title: "GraphbackCRUDService"
sidebar_label: "GraphbackCRUDService"
---

Graphback layered architecture component that can be called
from the resolver layer in GraphQL and Middlerware layer in RESTfull approach.

Graphback implements server side procesing using following flow:

`GraphQL Resolvers` ->  `GraphbackCRUDService` [1-*] -> `GraphbackDataProvider`

Services can be composable (each service can reference multiple layers of other services).
For data abstraction Graphback `GraphbackDataProvider` can be being used.

**`see`** GraphbackDataProvider

## Type parameters

▪ **Type**

▪ **GraphbackContext**

## Hierarchy

* **GraphbackCRUDService**

## Implemented by

* [CRUDService](../classes/_runtime_crudservice_.crudservice.md)
* [GraphbackProxyService](../classes/_runtime_graphbackproxyservice_.graphbackproxyservice.md)

## Index

### Methods

* [batchLoadData](_runtime_graphbackcrudservice_.graphbackcrudservice.md#batchloaddata)
* [create](_runtime_graphbackcrudservice_.graphbackcrudservice.md#create)
* [delete](_runtime_graphbackcrudservice_.graphbackcrudservice.md#delete)
* [findBy](_runtime_graphbackcrudservice_.graphbackcrudservice.md#findby)
* [findOne](_runtime_graphbackcrudservice_.graphbackcrudservice.md#findone)
* [subscribeToCreate](_runtime_graphbackcrudservice_.graphbackcrudservice.md#subscribetocreate)
* [subscribeToDelete](_runtime_graphbackcrudservice_.graphbackcrudservice.md#subscribetodelete)
* [subscribeToUpdate](_runtime_graphbackcrudservice_.graphbackcrudservice.md#subscribetoupdate)
* [update](_runtime_graphbackcrudservice_.graphbackcrudservice.md#update)

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: any, `context`: any): *any*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:102](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L102)*

Speciallized function that can utilize batching the data basing on
DataLoader library

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationField` | string | name of the field that will be used to match ids |
`id` | string &#124; number | id of the object we want to load |
`filter` | any | - |
`context` | any | resolver context object that will be used to apply new loader |

**Returns:** *any*

___

###  create

▸ **create**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:32](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L32)*

Implementation for object creation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | input data |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:48](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L48)*

Implementation for object deletes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | data used for consistency reasons |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type›, `context`: GraphbackContext, `page?`: [GraphbackPage](_runtime_interfaces_.graphbackpage.md), `orderBy?`: any): *Promise‹[ResultList](_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:66](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L66)*

Implementation for reading objects with filtering capabilities

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type› | filter by specific type |
`context` | GraphbackContext | context object passed from graphql or rest layer |
`page?` | [GraphbackPage](_runtime_interfaces_.graphbackpage.md) | pagination options |
`orderBy?` | any | optionally sort the results by a column  |

**Returns:** *Promise‹[ResultList](_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

___

###  findOne

▸ **findOne**(`filter`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:56](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L56)*

Fetch a single record by its unique attribute(s)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | Type | the unique attributes to fetch the record with |
`context` | GraphbackContext | context object from GraphQL/REST layer  |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: any, `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:74](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L74)*

Subscription for all creation events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | any | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: any, `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:90](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L90)*

Subscription for all deletion events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | any | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: any, `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:82](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L82)*

Subscription for all update events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | any | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:40](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L40)*

Implementation for object updates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | input data including id |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*
