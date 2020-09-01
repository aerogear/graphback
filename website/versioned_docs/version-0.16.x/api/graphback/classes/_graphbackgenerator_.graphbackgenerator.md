---
id: "_graphbackgenerator_.graphbackgenerator"
title: "GraphbackGenerator"
sidebar_label: "GraphbackGenerator"
---

GraphbackGenerator

Automatically generate your database structure resolvers and queries from graphql types.
See README for examples

## Hierarchy

* **GraphbackGenerator**

## Index

### Constructors

* [constructor](_graphbackgenerator_.graphbackgenerator.md#constructor)

### Properties

* [config](_graphbackgenerator_.graphbackgenerator.md#protected-config)
* [schema](_graphbackgenerator_.graphbackgenerator.md#protected-schema)

### Methods

* [generateSourceCode](_graphbackgenerator_.graphbackgenerator.md#generatesourcecode)

## Constructors

###  constructor

\+ **new GraphbackGenerator**(`schema`: GraphQLSchema | string, `config`: [GraphbackConfig](../interfaces/_graphbackconfig_.graphbackconfig.md)): *[GraphbackGenerator](_graphbackgenerator_.graphbackgenerator.md)*

*Defined in [GraphbackGenerator.ts:14](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/GraphbackGenerator.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | GraphQLSchema &#124; string |
`config` | [GraphbackConfig](../interfaces/_graphbackconfig_.graphbackconfig.md) |

**Returns:** *[GraphbackGenerator](_graphbackgenerator_.graphbackgenerator.md)*

## Properties

### `Protected` config

• **config**: *[GraphbackConfig](../interfaces/_graphbackconfig_.graphbackconfig.md)*

*Defined in [GraphbackGenerator.ts:13](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/GraphbackGenerator.ts#L13)*

___

### `Protected` schema

• **schema**: *string | GraphQLSchema*

*Defined in [GraphbackGenerator.ts:14](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/GraphbackGenerator.ts#L14)*

## Methods

###  generateSourceCode

▸ **generateSourceCode**(): *void*

*Defined in [GraphbackGenerator.ts:24](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback/src/GraphbackGenerator.ts#L24)*

Create backend with all related resources

**Returns:** *void*
