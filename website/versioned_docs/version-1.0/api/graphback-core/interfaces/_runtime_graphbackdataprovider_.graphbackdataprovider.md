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

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter), `selectedFields?`: string[]): *Promise‹Type[][]›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:78](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L78)*

Read multiple items by their id's (used for lazy data loading purposes)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationField` | string | name of the field that will be used to match ids |
`ids` | string[] | array of identifiers that needs to be fetched |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | filter by specific type  |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type[][]›*

___

###  count

▸ **count**(`filter`: [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter)): *Promise‹number›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:68](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L68)*

Implementation for counting number of objects with filtering capabilities

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | [QueryFilter](../modules/_runtime_queryfilter_.md#queryfilter) | filter by specific type  |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:26](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L26)*

Implementation for object creation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Type | input data |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:44](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L44)*

Implementation for object deletes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | data used for checking consistency |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: [FindByArgs](_runtime_interfaces_.findbyargs.md), `selectedFields?`: string[]): *Promise‹Type[]›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:61](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L61)*

Implementation for reading objects with filtering capabilities

**Parameters:**

Name | Type |
------ | ------ |
`args?` | [FindByArgs](_runtime_interfaces_.findbyargs.md) |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:52](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L52)*

Implementation for finding a single unique object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Partial‹Type› | filter by unique attriburtes |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [packages/graphback-core/src/runtime/GraphbackDataProvider.ts:35](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/runtime/GraphbackDataProvider.ts#L35)*

Implementation for object updates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | input data |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*
