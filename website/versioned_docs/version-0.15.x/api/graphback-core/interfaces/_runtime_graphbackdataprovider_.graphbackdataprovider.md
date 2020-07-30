---
id: "_runtime_graphbackdataprovider_.graphbackdataprovider"
title: "GraphbackDataProvider"
sidebar_label: "GraphbackDataProvider"
---

Graphback layered architecture component that can be called
from the service layer in both RESTFULL and GraphQL middlewares.

Graphback implements server side procesing using following flow:

`GraphQL Resolvers` ->  `GraphbackCRUDService` [1-*] -> `GraphbackDataProvider`

Data layer can be composable (each provider can reference multiple layers of other providers).

**`see`** GraphbackCRUDService

## Type parameters

▪ **Type**

▪ **GraphbackContext**

## Hierarchy

* **GraphbackDataProvider**

## Index

### Methods

* [batchRead](_runtime_graphbackdataprovider_.graphbackdataprovider.md#batchread)
* [count](_runtime_graphbackdataprovider_.graphbackdataprovider.md#count)
* [create](_runtime_graphbackdataprovider_.graphbackdataprovider.md#create)
* [delete](_runtime_graphbackdataprovider_.graphbackdataprovider.md#delete)
* [findBy](_runtime_graphbackdataprovider_.graphbackdataprovider.md#findby)
* [findOne](_runtime_graphbackdataprovider_.graphbackdataprovider.md#findone)
* [update](_runtime_graphbackdataprovider_.graphbackdataprovider.md#update)

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: any, `context`: GraphbackContext): *Promise‹Type[][]›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:78](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L78)*

Read multiple items by their id's (used for lazy data loading purposes)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationField` | string | name of the field that will be used to match ids |
`ids` | string[] | array of identifiers that needs to be fetched |
`filter` | any | filter by specific type  |
`context` | GraphbackContext | fields to select from datasource |

**Returns:** *Promise‹Type[][]›*

___

###  count

▸ **count**(`filter`: any): *Promise‹number›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:68](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L68)*

Implementation for counting number of objects with filtering capabilities

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | any | filter by specific type  |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:26](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L26)*

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

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:44](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L44)*

Implementation for object deletes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | data used for checking consistency |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type›, `context`: GraphbackContext, `page?`: [GraphbackPage](_runtime_interfaces_.graphbackpage.md), `orderBy?`: [GraphbackOrderBy](_runtime_interfaces_.graphbackorderby.md)): *Promise‹Type[]›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:61](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L61)*

Implementation for reading objects with filtering capabilities

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)‹Type› | filter by specific type |
`context` | GraphbackContext | context object passed from graphql or rest layer |
`page?` | [GraphbackPage](_runtime_interfaces_.graphbackpage.md) | paging context |
`orderBy?` | [GraphbackOrderBy](_runtime_interfaces_.graphbackorderby.md) | gives the ability to order the results based on a field in ascending or descending order  |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:52](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L52)*

Implementation for finding a single unique object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Partial‹Type› | filter by unique attriburtes |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L35)*

Implementation for object updates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | input data |
`context` | GraphbackContext | context object passed from graphql or rest layer  |

**Returns:** *Promise‹Type›*
