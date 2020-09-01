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

### Constructors

* [constructor](_datasyncplugin_.datasyncplugin.md#constructor)

### Properties

* [config](_datasyncplugin_.datasyncplugin.md#protected-config)

### Methods

* [addDataSyncFieldsToInputTypes](_datasyncplugin_.datasyncplugin.md#protected-adddatasyncfieldstoinputtypes)
* [addDataSyncFieldsToModel](_datasyncplugin_.datasyncplugin.md#protected-adddatasyncfieldstomodel)
* [addDeltaQuery](_datasyncplugin_.datasyncplugin.md#protected-adddeltaquery)
* [addDeltaSyncResolver](_datasyncplugin_.datasyncplugin.md#protected-adddeltasyncresolver)
* [createResolvers](_datasyncplugin_.datasyncplugin.md#createresolvers)
* [createResources](_datasyncplugin_.datasyncplugin.md#createresources)
* [getDeltaTypeFieldNames](_datasyncplugin_.datasyncplugin.md#private-getdeltatypefieldnames)
* [getPluginName](_datasyncplugin_.datasyncplugin.md#getpluginname)
* [logError](_datasyncplugin_.datasyncplugin.md#protected-logerror)
* [logWarning](_datasyncplugin_.datasyncplugin.md#protected-logwarning)
* [transformSchema](_datasyncplugin_.datasyncplugin.md#transformschema)

## Constructors

###  constructor

\+ **new DataSyncPlugin**(`config?`: [DataSyncPluginConfig](../interfaces/_datasyncplugin_.datasyncpluginconfig.md)): *[DataSyncPlugin](_datasyncplugin_.datasyncplugin.md)*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`config?` | [DataSyncPluginConfig](../interfaces/_datasyncplugin_.datasyncpluginconfig.md) |

**Returns:** *[DataSyncPlugin](_datasyncplugin_.datasyncplugin.md)*

## Properties

### `Protected` config

• **config**: *[DataSyncPluginConfig](../interfaces/_datasyncplugin_.datasyncpluginconfig.md)*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L21)*

## Methods

### `Protected` addDataSyncFieldsToInputTypes

▸ **addDataSyncFieldsToInputTypes**(`schemaComposer`: SchemaComposer‹any›, `model`: ModelDefinition): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:145](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`model` | ModelDefinition |

**Returns:** *void*

___

### `Protected` addDataSyncFieldsToModel

▸ **addDataSyncFieldsToModel**(`schemaComposer`: SchemaComposer‹any›, `model`: ModelDefinition): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:123](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹any› |
`model` | ModelDefinition |

**Returns:** *void*

___

### `Protected` addDeltaQuery

▸ **addDeltaQuery**(`schemaComposer`: SchemaComposer‹unknown›, `model`: ModelDefinition): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:159](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaComposer` | SchemaComposer‹unknown› |
`model` | ModelDefinition |

**Returns:** *void*

___

### `Protected` addDeltaSyncResolver

▸ **addDeltaSyncResolver**(`model`: ModelDefinition, `queryObj`: IFieldResolver‹any, any›): *void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:106](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L106)*

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

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:76](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L76)*

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

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:95](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *void*

___

### `Private` getDeltaTypeFieldNames

▸ **getDeltaTypeFieldNames**(`modelTC`: GraphQLObjectType): *string[]*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:202](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`modelTC` | GraphQLObjectType |

**Returns:** *string[]*

___

###  getPluginName

▸ **getPluginName**(): *string*

*Overrides void*

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:102](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L102)*

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

*Defined in [packages/graphback-datasync/src/DataSyncPlugin.ts:31](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/DataSyncPlugin.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *GraphQLSchema*
