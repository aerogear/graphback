---
id: "_util_.conflicterror"
title: "ConflictError"
sidebar_label: "ConflictError"
---

Error that signifies conflict between server-side and client-side data

## Hierarchy

* [Error](_util_.conflicterror.md#static-error)

  ↳ **ConflictError**

## Index

### Constructors

* [constructor](_util_.conflicterror.md#constructor)

### Properties

* [conflictInfo](_util_.conflicterror.md#conflictinfo)
* [message](_util_.conflicterror.md#message)
* [name](_util_.conflicterror.md#name)
* [stack](_util_.conflicterror.md#optional-stack)
* [Error](_util_.conflicterror.md#static-error)

## Constructors

###  constructor

\+ **new ConflictError**(`stateMap`: [ConflictStateMap](../interfaces/_util_.conflictstatemap.md)): *[ConflictError](_util_.conflicterror.md)*

*Defined in [packages/graphback-datasync/src/util.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/util.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`stateMap` | [ConflictStateMap](../interfaces/_util_.conflictstatemap.md) |

**Returns:** *[ConflictError](_util_.conflicterror.md)*

## Properties

###  conflictInfo

• **conflictInfo**: *[ConflictStateMap](../interfaces/_util_.conflictstatemap.md)*

*Defined in [packages/graphback-datasync/src/util.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-datasync/src/util.ts#L35)*

___

###  message

• **message**: *string*

*Inherited from [ConflictError](_util_.conflicterror.md).[message](_util_.conflicterror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [ConflictError](_util_.conflicterror.md).[name](_util_.conflicterror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [ConflictError](_util_.conflicterror.md).[stack](_util_.conflicterror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
