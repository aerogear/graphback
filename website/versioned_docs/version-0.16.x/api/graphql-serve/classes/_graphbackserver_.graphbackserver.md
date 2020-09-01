---
id: "_graphbackserver_.graphbackserver"
title: "GraphbackServer"
sidebar_label: "GraphbackServer"
---

## Hierarchy

* **GraphbackServer**

## Index

### Constructors

* [constructor](_graphbackserver_.graphbackserver.md#constructor)

### Properties

* [db](_graphbackserver_.graphbackserver.md#protected-db)
* [graphqlSchema](_graphbackserver_.graphbackserver.md#protected-readonly-graphqlschema)
* [httpServer](_graphbackserver_.graphbackserver.md#protected-readonly-httpserver)
* [serverPort](_graphbackserver_.graphbackserver.md#protected-optional-serverport)

### Methods

* [getDb](_graphbackserver_.graphbackserver.md#getdb)
* [getHttpPort](_graphbackserver_.graphbackserver.md#gethttpport)
* [getHttpUrl](_graphbackserver_.graphbackserver.md#gethttpurl)
* [getSchema](_graphbackserver_.graphbackserver.md#getschema)
* [getWsUrl](_graphbackserver_.graphbackserver.md#getwsurl)
* [start](_graphbackserver_.graphbackserver.md#start)
* [stop](_graphbackserver_.graphbackserver.md#stop)

## Constructors

###  constructor

\+ **new GraphbackServer**(`httpServer`: Server, `graphqlSchema`: string, `dbClient`: MongoClient): *[GraphbackServer](_graphbackserver_.graphbackserver.md)*

*Defined in [GraphbackServer.ts:23](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`httpServer` | Server |
`graphqlSchema` | string |
`dbClient` | MongoClient |

**Returns:** *[GraphbackServer](_graphbackserver_.graphbackserver.md)*

## Properties

### `Protected` db

• **db**: *MongoClient*

*Defined in [GraphbackServer.ts:22](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L22)*

___

### `Protected` `Readonly` graphqlSchema

• **graphqlSchema**: *string*

*Defined in [GraphbackServer.ts:20](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L20)*

___

### `Protected` `Readonly` httpServer

• **httpServer**: *Server*

*Defined in [GraphbackServer.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L21)*

___

### `Protected` `Optional` serverPort

• **serverPort**? : *number*

*Defined in [GraphbackServer.ts:23](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L23)*

## Methods

###  getDb

▸ **getDb**(): *MongoClient*

*Defined in [GraphbackServer.ts:70](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L70)*

**Returns:** *MongoClient*

___

###  getHttpPort

▸ **getHttpPort**(): *number*

*Defined in [GraphbackServer.ts:84](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L84)*

**Returns:** *number*

___

###  getHttpUrl

▸ **getHttpUrl**(): *string*

*Defined in [GraphbackServer.ts:74](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L74)*

**Returns:** *string*

___

###  getSchema

▸ **getSchema**(): *string*

*Defined in [GraphbackServer.ts:98](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L98)*

**Returns:** *string*

___

###  getWsUrl

▸ **getWsUrl**(): *string*

*Defined in [GraphbackServer.ts:88](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L88)*

**Returns:** *string*

___

###  start

▸ **start**(`port?`: number): *Promise‹void›*

*Defined in [GraphbackServer.ts:31](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`port?` | number |

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

*Defined in [GraphbackServer.ts:52](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-serve/src/GraphbackServer.ts#L52)*

**Returns:** *Promise‹void›*
