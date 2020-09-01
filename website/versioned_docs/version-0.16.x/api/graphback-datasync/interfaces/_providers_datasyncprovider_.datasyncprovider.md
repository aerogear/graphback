---
id: "_providers_datasyncprovider_.datasyncprovider"
title: "DataSyncProvider"
sidebar_label: "DataSyncProvider"
---

## Type parameters

▪ **Type**

## Hierarchy

* GraphbackDataProvider‹Type›

  ↳ **DataSyncProvider**

## Implemented by

* [DataSyncConflictMongoDBDataProvider](../classes/_providers_datasyncconflictprovider_.datasyncconflictmongodbdataprovider.md)
* [DataSyncMongoDBDataProvider](../classes/_providers_datasyncmongodbdataprovider_.datasyncmongodbdataprovider.md)

## Index

### Methods

* [batchRead](_providers_datasyncprovider_.datasyncprovider.md#batchread)
* [count](_providers_datasyncprovider_.datasyncprovider.md#count)
* [create](_providers_datasyncprovider_.datasyncprovider.md#create)
* [delete](_providers_datasyncprovider_.datasyncprovider.md#delete)
* [findBy](_providers_datasyncprovider_.datasyncprovider.md#findby)
* [findOne](_providers_datasyncprovider_.datasyncprovider.md#findone)
* [sync](_providers_datasyncprovider_.datasyncprovider.md#sync)
* [update](_providers_datasyncprovider_.datasyncprovider.md#update)

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[batchRead](_providers_datasyncprovider_.datasyncprovider.md#batchread)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:70

Read multiple items by their id's (used for lazy data loading purposes)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationField` | string | name of the field that will be used to match ids |
`ids` | string[] | array of identifiers that needs to be fetched |
`filter` | QueryFilter | filter by specific type  |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type[][]›*

___

###  count

▸ **count**(`filter`: QueryFilter): *Promise‹number›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[count](_providers_datasyncprovider_.datasyncprovider.md#count)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:61

Implementation for counting number of objects with filtering capabilities

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | QueryFilter | filter by specific type  |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[create](_providers_datasyncprovider_.datasyncprovider.md#create)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:23

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

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[delete](_providers_datasyncprovider_.datasyncprovider.md#delete)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:39

Implementation for object deletes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | data used for checking consistency |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[findBy](_providers_datasyncprovider_.datasyncprovider.md#findby)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:55

Implementation for reading objects with filtering capabilities

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`args`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[findOne](_providers_datasyncprovider_.datasyncprovider.md#findone)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:46

Implementation for finding a single unique object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | Partial‹Type› | filter by unique attriburtes |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*

___

###  sync

▸ **sync**(`lastSync`: Date, `selectedFields?`: string[], `filter?`: QueryFilter, `limit?`: number): *Promise‹Type[]›*

*Defined in [packages/graphback-datasync/src/providers/DataSyncProvider.ts:5](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/providers/DataSyncProvider.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`lastSync` | Date |
`selectedFields?` | string[] |
`filter?` | QueryFilter |
`limit?` | number |

**Returns:** *Promise‹Type[]›*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Inherited from [DataSyncProvider](_providers_datasyncprovider_.datasyncprovider.md).[update](_providers_datasyncprovider_.datasyncprovider.md#update)*

Defined in packages/graphback-core/types/runtime/GraphbackDataProvider.d.ts:31

Implementation for object updates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Partial‹Type› | input data |
`selectedFields?` | string[] | - |

**Returns:** *Promise‹Type›*
