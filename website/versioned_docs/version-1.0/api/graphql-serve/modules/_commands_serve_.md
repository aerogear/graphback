---
id: "_commands_serve_"
title: "commands/serve"
sidebar_label: "commands/serve"
---

## Index

### Variables

* [command](_commands_serve_.md#const-command)
* [desc](_commands_serve_.md#const-desc)

### Functions

* [builder](_commands_serve_.md#const-builder)
* [handler](_commands_serve_.md#handler)

## Variables

### `Const` command

• **command**: *"serve [modelDir] [options]"* = "serve [modelDir] [options]"

*Defined in [commands/serve.ts:5](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/commands/serve.ts#L5)*

___

### `Const` desc

• **desc**: *"Generate and start GraphQL server from data model files"* = "Generate and start GraphQL server from data model files"

*Defined in [commands/serve.ts:7](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/commands/serve.ts#L7)*

## Functions

### `Const` builder

▸ **builder**(`args`: Argv): *void*

*Defined in [commands/serve.ts:10](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/commands/serve.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | Argv |

**Returns:** *void*

___

###  handler

▸ **handler**(`args`: [GraphQLServeParams](_components_servehandler_.md#graphqlserveparams)): *Promise‹void›*

*Defined in [commands/serve.ts:41](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/commands/serve.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | [GraphQLServeParams](_components_servehandler_.md#graphqlserveparams) |

**Returns:** *Promise‹void›*
