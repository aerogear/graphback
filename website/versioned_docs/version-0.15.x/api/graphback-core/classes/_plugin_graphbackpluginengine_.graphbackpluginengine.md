---
id: "_plugin_graphbackpluginengine_.graphbackpluginengine"
title: "GraphbackPluginEngine"
sidebar_label: "GraphbackPluginEngine"
---

Allows to execute chain of plugins that create resources.
Common use case is to decorate GraphQL schema with additional
actions and generate files like resolvers and database access logic

Usage:
```js
const engine = GraphbackPluginEngine({ schema });
engine.registerPlugin(plugin);
printSchema(engine.createResources());
```

## Hierarchy

* **GraphbackPluginEngine**

## Index

### Constructors

* [constructor](_plugin_graphbackpluginengine_.graphbackpluginengine.md#constructor)

### Properties

* [metadata](_plugin_graphbackpluginengine_.graphbackpluginengine.md#private-metadata)
* [plugins](_plugin_graphbackpluginengine_.graphbackpluginengine.md#private-plugins)

### Methods

* [createResolvers](_plugin_graphbackpluginengine_.graphbackpluginengine.md#private-createresolvers)
* [createResources](_plugin_graphbackpluginengine_.graphbackpluginengine.md#createresources)
* [createSchema](_plugin_graphbackpluginengine_.graphbackpluginengine.md#private-createschema)
* [registerPlugin](_plugin_graphbackpluginengine_.graphbackpluginengine.md#registerplugin)

## Constructors

###  constructor

\+ **new GraphbackPluginEngine**(`__namedParameters`: object): *[GraphbackPluginEngine](_plugin_graphbackpluginengine_.graphbackpluginengine.md)*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:29](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L29)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`config` | [GraphbackGlobalConfig](../interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig.md) |
`plugins` | [GraphbackPlugin](_plugin_graphbackplugin_.graphbackplugin.md)‹›[] |
`schema` | string &#124; GraphQLSchema‹› |

**Returns:** *[GraphbackPluginEngine](_plugin_graphbackpluginengine_.graphbackpluginengine.md)*

## Properties

### `Private` metadata

• **metadata**: *[GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:29](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L29)*

___

### `Private` plugins

• **plugins**: *[GraphbackPlugin](_plugin_graphbackplugin_.graphbackplugin.md)[]*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:28](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L28)*

## Methods

### `Private` createResolvers

▸ **createResolvers**(): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:80](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L80)*

**Returns:** *void*

___

###  createResources

▸ **createResources**(): *[GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:54](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L54)*

Allows the transformation of schema by applying transformation logic for each plugin
Creation of resolvers, which has to come after all the changes in schema have been applied
Saving of the transformed schema and related files

**Returns:** *[GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)*

___

### `Private` createSchema

▸ **createSchema**(): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:71](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L71)*

**Returns:** *void*

___

###  registerPlugin

▸ **registerPlugin**(...`plugins`: [GraphbackPlugin](_plugin_graphbackplugin_.graphbackplugin.md)[]): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackPluginEngine.ts:45](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/GraphbackPluginEngine.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`...plugins` | [GraphbackPlugin](_plugin_graphbackplugin_.graphbackplugin.md)[] |

**Returns:** *void*
