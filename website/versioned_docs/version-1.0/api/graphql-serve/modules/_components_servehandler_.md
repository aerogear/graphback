---
id: "_components_servehandler_"
title: "components/serveHandler"
sidebar_label: "components/serveHandler"
---

## Index

### Type aliases

* [GraphQLServeParams](_components_servehandler_.md#graphqlserveparams)

### Functions

* [serveHandler](_components_servehandler_.md#const-servehandler)

## Type aliases

###  GraphQLServeParams

Ƭ **GraphQLServeParams**: *object*

*Defined in [components/serveHandler.ts:4](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/components/serveHandler.ts#L4)*

#### Type declaration:

* **conflict**? : *[ConflictResolutionStrategyName](_runtime_.md#conflictresolutionstrategyname)*

* **datasync**: *boolean*

* **deltaTTL**? : *number*

* **model**? : *string*

* **port**? : *number*

## Functions

### `Const` serveHandler

▸ **serveHandler**(`argv`: [GraphQLServeParams](_components_servehandler_.md#graphqlserveparams)): *Promise‹void›*

*Defined in [components/serveHandler.ts:6](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-serve/src/components/serveHandler.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`argv` | [GraphQLServeParams](_components_servehandler_.md#graphqlserveparams) |

**Returns:** *Promise‹void›*
