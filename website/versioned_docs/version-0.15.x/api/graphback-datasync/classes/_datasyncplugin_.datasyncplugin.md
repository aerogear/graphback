---
id: "_datasyncplugin_.datasyncplugin"
title: "DataSyncPlugin"
sidebar_label: "DataSyncPlugin"
---

DataSync plugin

Plugin is enabled by """ @datasync """ annotation
It will generate delta queries

## Hierarchy

* GraphbackPlugin

  ↳ **DataSyncPlugin**

## Index

### Methods

* [addDataSyncMetadataFields](_datasyncplugin_.datasyncplugin.md#protected-adddatasyncmetadatafields)
* [addDeltaSyncResolver](_datasyncplugin_.datasyncplugin.md#protected-adddeltasyncresolver)
* [createResolvers](_datasyncplugin_.datasyncplugin.md#createresolvers)
* [createResources](_datasyncplugin_.datasyncplugin.md#createresources)
* [getPluginName](_datasyncplugin_.datasyncplugin.md#getpluginname)
* [logError](_datasyncplugin_.datasyncplugin.md#protected-logerror)
* [logWarning](_datasyncplugin_.datasyncplugin.md#protected-logwarning)
* [transformSchema](_datasyncplugin_.datasyncplugin.md#transformschema)

## Methods

### `Protected` addDataSyncMetadataFields

▸ **addDataSyncMetadataFields**(`schemaComposer`: SchemaComposer‹any›, `model`: ModelDefinition): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:152](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`model` | ModelDefinition |

**Returns:** *void*

___

### `Protected` addDeltaSyncResolver

▸ **addDeltaSyncResolver**(`model`: ModelDefinition, `queryObj`: IFieldResolver‹any, any›): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:132](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`queryObj` | IFieldResolver‹any, any› |

**Returns:** *void*

___

###  createResolvers

▸ **createResolvers**(`metadata`: GraphbackCoreMetadata): *IResolvers*

*Overrides void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:102](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L102)*

Creates resolvers for Data Synchonization

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | GraphbackCoreMetadata | Core metatata containing all model information  |

**Returns:** *IResolvers*

___

###  createResources

▸ **createResources**(`metadata`: GraphbackCoreMetadata): *void*

*Overrides void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:121](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *void*

___

###  getPluginName

▸ **getPluginName**(): *string*

*Overrides void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:128](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L128)*

**Returns:** *string*

___

### `Protected` logError

▸ **logError**(`message`: string): *void*

*Inherited from [DataSyncPlugin](_datasyncplugin_.datasyncplugin.md).[logError](_datasyncplugin_.datasyncplugin.md#protected-logerror)*

Defined in packages/graphback-core/types/plugin/GraphbackPlugin.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

### `Protected` logWarning

▸ **logWarning**(`message`: string): *void*

*Inherited from [DataSyncPlugin](_datasyncplugin_.datasyncplugin.md).[logWarning](_datasyncplugin_.datasyncplugin.md#protected-logwarning)*

Defined in packages/graphback-core/types/plugin/GraphbackPlugin.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  transformSchema

▸ **transformSchema**(`metadata`: GraphbackCoreMetadata): *GraphQLSchema*

*Overrides void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:26](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/DataSyncPlugin.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *GraphQLSchema*
