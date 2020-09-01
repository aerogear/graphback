---
id: "_clientcrudplugin_.clientcrudplugin"
title: "ClientCRUDPlugin"
sidebar_label: "ClientCRUDPlugin"
---

Graphback CRUD operations plugin

Plugins generates client side documents containing CRUD operations:
Queries, Mutations and Subscriptions that reference coresponding schema and resolves.
Plugin operates on all types annotated with model

Used graphql metadata:

- model: marks type to be processed by CRUD generator
- crud: controls what types of operations can be generated.
For example crud.update: false will disable updates for type

## Hierarchy

* GraphbackPlugin

  ↳ **ClientCRUDPlugin**

## Index

### Constructors

* [constructor](_clientcrudplugin_.clientcrudplugin.md#constructor)

### Properties

* [pluginConfig](_clientcrudplugin_.clientcrudplugin.md#private-pluginconfig)

### Methods

* [createResolvers](_clientcrudplugin_.clientcrudplugin.md#createresolvers)
* [createResources](_clientcrudplugin_.clientcrudplugin.md#createresources)
* [getDocuments](_clientcrudplugin_.clientcrudplugin.md#getdocuments)
* [getPluginName](_clientcrudplugin_.clientcrudplugin.md#getpluginname)
* [logError](_clientcrudplugin_.clientcrudplugin.md#protected-logerror)
* [logWarning](_clientcrudplugin_.clientcrudplugin.md#protected-logwarning)
* [transformSchema](_clientcrudplugin_.clientcrudplugin.md#transformschema)

## Constructors

###  constructor

\+ **new ClientCRUDPlugin**(`pluginConfig?`: [ClientGeneratorPluginConfig](../interfaces/_clientcrudplugin_.clientgeneratorpluginconfig.md)): *[ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md)*

*Defined in [graphback-codegen-client/src/ClientCRUDPlugin.ts:40](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`pluginConfig?` | [ClientGeneratorPluginConfig](../interfaces/_clientcrudplugin_.clientgeneratorpluginconfig.md) |

**Returns:** *[ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md)*

## Properties

### `Private` pluginConfig

• **pluginConfig**: *[ClientGeneratorPluginConfig](../interfaces/_clientcrudplugin_.clientgeneratorpluginconfig.md)*

*Defined in [graphback-codegen-client/src/ClientCRUDPlugin.ts:40](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L40)*

## Methods

###  createResolvers

▸ **createResolvers**(`metadata`: GraphbackCoreMetadata): *IResolvers*

*Inherited from [ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md).[createResolvers](_clientcrudplugin_.clientcrudplugin.md#createresolvers)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:35

Method to create in-memory resolvers which will be
added to a list of resolvers output by Graphback

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | GraphbackCoreMetadata | metadata object with model metadata  |

**Returns:** *IResolvers*

___

###  createResources

▸ **createResources**(`metadata`: GraphbackCoreMetadata): *void*

*Overrides void*

*Defined in [graphback-codegen-client/src/ClientCRUDPlugin.ts:50](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *void*

___

###  getDocuments

▸ **getDocuments**(`metadata`: GraphbackCoreMetadata): *[ClientTemplates](../interfaces/_templates_clienttemplates_.clienttemplates.md)*

*Defined in [graphback-codegen-client/src/ClientCRUDPlugin.ts:60](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`metadata` | GraphbackCoreMetadata |

**Returns:** *[ClientTemplates](../interfaces/_templates_clienttemplates_.clienttemplates.md)*

___

###  getPluginName

▸ **getPluginName**(): *string*

*Overrides void*

*Defined in [graphback-codegen-client/src/ClientCRUDPlugin.ts:56](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/ClientCRUDPlugin.ts#L56)*

**Returns:** *string*

___

### `Protected` logError

▸ **logError**(`message`: string): *void*

*Inherited from [ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md).[logError](_clientcrudplugin_.clientcrudplugin.md#protected-logerror)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

### `Protected` logWarning

▸ **logWarning**(`message`: string): *void*

*Inherited from [ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md).[logWarning](_clientcrudplugin_.clientcrudplugin.md#protected-logwarning)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  transformSchema

▸ **transformSchema**(`metadata`: GraphbackCoreMetadata): *GraphQLSchema*

*Inherited from [ClientCRUDPlugin](_clientcrudplugin_.clientcrudplugin.md).[transformSchema](_clientcrudplugin_.clientcrudplugin.md#transformschema)*

Defined in graphback-core/types/plugin/GraphbackPlugin.d.ts:23

Performs transformation on the schema and returns target schema
Implementations should extend this method if they wish to apply some changes
to schema. Otherwise unchanged schema should be returned

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`metadata` | GraphbackCoreMetadata | metadata object containing schema  |

**Returns:** *GraphQLSchema*
