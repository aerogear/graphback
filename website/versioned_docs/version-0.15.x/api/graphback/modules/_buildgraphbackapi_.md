---
id: "_buildgraphbackapi_"
title: "buildGraphbackAPI"
sidebar_label: "buildGraphbackAPI"
---

## Index

### Interfaces

* [GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)
* [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md)

### Functions

* [buildGraphbackAPI](_buildgraphbackapi_.md#buildgraphbackapi)

## Functions

###  buildGraphbackAPI

▸ **buildGraphbackAPI**(`model`: string | GraphQLSchema, `config`: [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md)): *[GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)*

*Defined in [buildGraphbackAPI.ts:108](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L108)*

Creates all of the components needed for the GraphQL server - resolvers, schema and services.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | string &#124; GraphQLSchema | Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database |
`config` | [GraphbackAPIConfig](../interfaces/_buildgraphbackapi_.graphbackapiconfig.md) | - |

**Returns:** *[GraphbackAPI](../interfaces/_buildgraphbackapi_.graphbackapi.md)*

Generated schema, CRUD resolvers and services
