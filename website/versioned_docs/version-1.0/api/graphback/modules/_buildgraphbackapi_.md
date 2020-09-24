---
id: "_buildgraphbackapi_"
title: "buildGraphbackAPI"
sidebar_label: "buildGraphbackAPI"
---

## Index

### Interfaces

* [GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)
* [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md)

### Type aliases

* [GraphbackDataProviderCreator](_buildgraphbackapi_.md#graphbackdataprovidercreator)
* [GraphbackServiceCreator](_buildgraphbackapi_.md#graphbackservicecreator)

### Functions

* [buildGraphbackAPI](_buildgraphbackapi_.md#buildgraphbackapi)

## Type aliases

###  GraphbackDataProviderCreator

Ƭ **GraphbackDataProviderCreator**: *function*

*Defined in [buildGraphbackAPI.ts:57](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback/src/buildGraphbackAPI.ts#L57)*

#### Type declaration:

▸ (`model`: [ModelDefinition](_index_.md#modeldefinition)): *GraphbackDataProvider*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelDefinition](_index_.md#modeldefinition) |

___

###  GraphbackServiceCreator

Ƭ **GraphbackServiceCreator**: *function*

*Defined in [buildGraphbackAPI.ts:56](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback/src/buildGraphbackAPI.ts#L56)*

#### Type declaration:

▸ (`model`: [ModelDefinition](_index_.md#modeldefinition), `dataProvider`: GraphbackDataProvider): *GraphbackCRUDService*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelDefinition](_index_.md#modeldefinition) |
`dataProvider` | GraphbackDataProvider |

## Functions

###  buildGraphbackAPI

▸ **buildGraphbackAPI**(`model`: string | GraphQLSchema, `config`: [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md)): *[GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)*

*Defined in [buildGraphbackAPI.ts:113](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback/src/buildGraphbackAPI.ts#L113)*

Creates all of the components needed for the GraphQL server - resolvers, schema and services.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | string &#124; GraphQLSchema | Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database |
`config` | [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md) | - |

**Returns:** *[GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)*

Generated schema, CRUD resolvers and services
