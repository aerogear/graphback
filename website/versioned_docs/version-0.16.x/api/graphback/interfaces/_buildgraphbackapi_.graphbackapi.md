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

• **resolvers**: *Record‹string, any›*

*Defined in [buildGraphbackAPI.ts:44](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L44)*

CRUD resolvers for every data model

___

###  schema

• **schema**: *GraphQLSchema*

*Defined in [buildGraphbackAPI.ts:40](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L40)*

GraphQL schema object

___

###  services

• **services**: *GraphbackServiceConfigMap*

*Defined in [buildGraphbackAPI.ts:48](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L48)*

Model:Service map of CRUD services for every data model

___

###  typeDefs

• **typeDefs**: *string*

*Defined in [buildGraphbackAPI.ts:36](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L36)*

GraphQL schema as a string

## Methods

###  contextCreator

▸ **contextCreator**(`context?`: any): *GraphbackContext*

*Defined in [buildGraphbackAPI.ts:53](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/buildGraphbackAPI.ts#L53)*

Creates context to be attached to the running server

**Parameters:**

Name | Type |
------ | ------ |
`context?` | any |

**Returns:** *GraphbackContext*
