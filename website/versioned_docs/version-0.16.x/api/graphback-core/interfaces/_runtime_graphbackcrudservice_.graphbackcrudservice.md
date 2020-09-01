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

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context`: GraphbackContext, `info?`: GraphQLResolveInfo): *any*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:106](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L106)*

Specialized function that can utilize batching the data basing on
DataLoader library

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationField` | string | name of the field that will be used to match ids |
`id` | string &#124; number | id of the object we want to load |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | - |
`context` | GraphbackContext | resolver context object that will be used to apply new loader |
`info?` | GraphQLResolveInfo | GraphQL resolver info  |

**Returns:** *any*

___

###  create

▸ **create**(`data`: Type, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:33](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L33)*

Implementation for object creation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | input data |
`context?` | GraphbackContext | context object passed from graphql or rest layer  |
`info?` | GraphQLResolveInfo | - |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:49](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L49)*

Implementation for object deletes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | data used for consistency reasons |
`context?` | GraphbackContext | context object passed from graphql or rest layer  |
`info?` | GraphQLResolveInfo | - |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: [FindByArgs](_runtime_interfaces_.findbyargs.md), `context?`: GraphbackContext, `info?`: GraphQLResolveInfo, `path?`: string): *Promise‹[ResultList](_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:70](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L70)*

Implementation for reading objects with filtering capabilities

**Parameters:**

Name | Type |
------ | ------ |
`args?` | [FindByArgs](_runtime_interfaces_.findbyargs.md) |
`context?` | GraphbackContext |
`info?` | GraphQLResolveInfo |
`path?` | string |

**Returns:** *Promise‹[ResultList](_runtime_graphbackcrudservice_.resultlist.md)‹Type››*

___

###  findOne

▸ **findOne**(`filter`: Partial‹Type›, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:57](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L57)*

Fetch a single record by its unique attribute(s)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | Partial‹Type› | the unique attributes to fetch the record with |
`context?` | GraphbackContext | context object from GraphQL/REST layer  |
`info?` | GraphQLResolveInfo | - |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:78](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L78)*

Subscription for all creation events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:94](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L94)*

Subscription for all deletion events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `context?`: GraphbackContext): *AsyncIterator‹Type› | undefined*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:86](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L86)*

Subscription for all update events

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter?` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | filter used in subscription |
`context?` | GraphbackContext | additional context  |

**Returns:** *AsyncIterator‹Type› | undefined*

___

###  update

▸ **update**(`data`: Partial‹Type›, `context?`: GraphbackContext, `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackCRUDService.ts:41](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/GraphbackCRUDService.ts#L41)*

Implementation for object updates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | input data including id |
`context?` | GraphbackContext | context object passed from graphql or rest layer  |
`info?` | GraphQLResolveInfo | - |

**Returns:** *Promise‹Type›*
