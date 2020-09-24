---
id: "_plugin_graphbackcoremetadata_.graphbackcoremetadata"
title: "GraphbackCoreMetadata"
sidebar_label: "GraphbackCoreMetadata"
---

Contains Graphback Core Models

## Hierarchy

* **GraphbackCoreMetadata**

## Index

### Constructors

* [constructor](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#constructor)

### Properties

* [models](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#private-models)
* [resolvers](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#private-resolvers)
* [schema](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#private-schema)
* [supportedCrudMethods](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#private-supportedcrudmethods)

### Methods

* [addResolvers](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#addresolvers)
* [buildModel](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#private-buildmodel)
* [getGraphQLTypesWithModel](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#getgraphqltypeswithmodel)
* [getModelDefinitions](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#getmodeldefinitions)
* [getResolvers](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#getresolvers)
* [getSchema](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#getschema)
* [setSchema](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md#setschema)

## Constructors

###  constructor

\+ **new GraphbackCoreMetadata**(`globalConfig`: [GraphbackGlobalConfig](../interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig.md), `schema`: GraphQLSchema): *[GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:31](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`globalConfig` | [GraphbackGlobalConfig](../interfaces/_plugin_graphbackglobalconfig_.graphbackglobalconfig.md) |
`schema` | GraphQLSchema |

**Returns:** *[GraphbackCoreMetadata](_plugin_graphbackcoremetadata_.graphbackcoremetadata.md)*

## Properties

### `Private` models

• **models**: *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)[]*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:31](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L31)*

___

### `Private` resolvers

• **resolvers**: *IResolvers*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:30](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L30)*

___

### `Private` schema

• **schema**: *GraphQLSchema*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:29](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L29)*

___

### `Private` supportedCrudMethods

• **supportedCrudMethods**: *[GraphbackCRUDGeneratorConfig](../interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig.md)*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:28](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L28)*

## Methods

###  addResolvers

▸ **addResolvers**(`resolvers`: IResolvers): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:46](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`resolvers` | IResolvers |

**Returns:** *void*

___

### `Private` buildModel

▸ **buildModel**(`modelType`: GraphQLObjectType, `relationships`: [FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]): *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:93](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | GraphQLObjectType |
`relationships` | [FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[] |

**Returns:** *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)*

___

###  getGraphQLTypesWithModel

▸ **getGraphQLTypesWithModel**(): *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:87](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L87)*

Helper for plugins to fetch all types that should be processed by Graphback plugins.
To mark type as enabled for graphback generators we need to add `model` annotations over the type.

Returns all user types that have @model in description

**Returns:** *GraphQLObjectType[]*

___

###  getModelDefinitions

▸ **getModelDefinitions**(): *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)[]*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:63](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L63)*

Get Graphback Models - GraphQL Types with additional CRUD configuration

**Returns:** *[ModelDefinition](../modules/_plugin_modeldefinition_.md#modeldefinition)[]*

___

###  getResolvers

▸ **getResolvers**(): *IResolvers*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:56](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L56)*

**Returns:** *IResolvers*

___

###  getSchema

▸ **getSchema**(): *GraphQLSchema‹›*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:38](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L38)*

**Returns:** *GraphQLSchema‹›*

___

###  setSchema

▸ **setSchema**(`newSchema`: GraphQLSchema): *void*

*Defined in [packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts:42](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/GraphbackCoreMetadata.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`newSchema` | GraphQLSchema |

**Returns:** *void*
