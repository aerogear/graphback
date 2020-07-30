---
id: "_buildgraphbackapi_.graphbackapi"
title: "GraphbackAPI"
sidebar_label: "GraphbackAPI"
---

Defines the individual components created in the Graphback API

## Hierarchy

* **GraphbackAPI**

## Index

### Properties

* [resolvers](_buildgraphbackapi_.graphbackapi.md#resolvers)
* [schema](_buildgraphbackapi_.graphbackapi.md#schema)
* [services](_buildgraphbackapi_.graphbackapi.md#services)
* [typeDefs](_buildgraphbackapi_.graphbackapi.md#typedefs)

### Methods

* [contextCreator](_buildgraphbackapi_.graphbackapi.md#contextcreator)

## Properties

###  resolvers

• **resolvers**: *any*

*Defined in [buildGraphbackAPI.ts:43](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L43)*

CRUD resolvers for every data model

___

###  schema

• **schema**: *GraphQLSchema*

*Defined in [buildGraphbackAPI.ts:39](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L39)*

GraphQL schema object

___

###  services

• **services**: *GraphbackServiceConfigMap*

*Defined in [buildGraphbackAPI.ts:47](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L47)*

Model:Service map of CRUD services for every data model

___

###  typeDefs

• **typeDefs**: *string*

*Defined in [buildGraphbackAPI.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L35)*

GraphQL schema as a string

## Methods

###  contextCreator

▸ **contextCreator**(`context?`: any): *GraphbackContext*

*Defined in [buildGraphbackAPI.ts:52](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback/src/buildGraphbackAPI.ts#L52)*

Creates context to be attached to the running server

**Parameters:**

Name | Type |
------ | ------ |
`context?` | any |

**Returns:** *GraphbackContext*
