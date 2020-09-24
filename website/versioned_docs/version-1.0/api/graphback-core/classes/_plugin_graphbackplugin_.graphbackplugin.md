---
id: "_plugin_graphbackplugin_.graphbackplugin"
title: "GraphbackPlugin"
sidebar_label: "GraphbackPlugin"
---

Graphback plugin interface
Plugins are base for every graphback generator and schema transformers.
See documentation for the complete list of the plugins.

Plugins can:

- Modify the schema
- Create resources like files, db tables etc.
- Perform some in memory operations based on configuration

## Hierarchy

* **GraphbackPlugin**

## Index

### Methods

* [createResolvers](_plugin_graphbackplugin_.graphbackplugin.md#createresolvers)
* [createResources](_plugin_graphbackplugin_.graphbackplugin.md#createresources)
* [getPluginName](_plugin_graphbackplugin_.graphbackplugin.md#abstract-getpluginname)
* [logError](_plugin_graphbackplugin_.graphbackplugin.md#protected-logerror)
* [logWarning](_plugin_graphbackplugin_.graphbackplugin.md#protected-logwarning)
* [transformSchema](_plugin_graphbackplugin_.graphbackplugin.md#transformschema)

## Methods

###  createResolvers

▸ **createResolvers**(`metadata`: [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)): *IResolvers*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:42](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L42)*

Method to create in-memory resolvers which will be
added to a list of resolvers output by Graphback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md) | metadata object with model metadata  |

**Returns:** *IResolvers*

___

###  createResources

▸ **createResources**(`metadata`: [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:32](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L32)*

Create resources like files etc. for this plugin.
This method should write resouces to filesystem

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md) |

**Returns:** *void*

___

### `Abstract` getPluginName

▸ **getPluginName**(): *string*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:59](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L59)*

**Returns:** *string*

Unique name of the plugin

___

### `Protected` logError

▸ **logError**(`message`: string): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:51](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

### `Protected` logWarning

▸ **logWarning**(`message`: string): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:46](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  transformSchema

▸ **transformSchema**(`metadata`: [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)): *GraphQLSchema*

*Defined in [packages/graphback-core/src/plugin/GraphbackPlugin.ts:24](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackPlugin.ts#L24)*

Performs transformation on the schema and returns target schema
Implementations should extend this method if they wish to apply some changes
to schema. Otherwise unchanged schema should be returned

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | [GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md) | metadata object containing schema  |

**Returns:** *GraphQLSchema*
