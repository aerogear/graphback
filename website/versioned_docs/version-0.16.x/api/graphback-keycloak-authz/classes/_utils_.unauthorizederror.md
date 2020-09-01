---
id: "_utils_.unauthorizederror"
title: "UnauthorizedError"
sidebar_label: "UnauthorizedError"
---

Custom Error class. The code property will be propagated back to the client side
for proper error handling

## Hierarchy

* [Error](_utils_.unauthorizederror.md#static-error)

  ↳ **UnauthorizedError**

## Index

### Constructors

* [constructor](_utils_.unauthorizederror.md#constructor)

### Properties

* [code](_utils_.unauthorizederror.md#code)
* [message](_utils_.unauthorizederror.md#message)
* [name](_utils_.unauthorizederror.md#name)
* [stack](_utils_.unauthorizederror.md#optional-stack)
* [Error](_utils_.unauthorizederror.md#static-error)

## Constructors

###  constructor

\+ **new UnauthorizedError**(`message`: string): *[UnauthorizedError](_utils_.unauthorizederror.md)*

*Defined in [packages/graphback-keycloak-authz/src/utils.ts:54](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/utils.ts#L54)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | "User is not authorized." |

**Returns:** *[UnauthorizedError](_utils_.unauthorizederror.md)*

## Properties

###  code

• **code**: *string*

*Defined in [packages/graphback-keycloak-authz/src/utils.ts:54](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/utils.ts#L54)*

___

###  message

• **message**: *string*

*Inherited from [UnauthorizedError](_utils_.unauthorizederror.md).[message](_utils_.unauthorizederror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [UnauthorizedError](_utils_.unauthorizederror.md).[name](_utils_.unauthorizederror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [UnauthorizedError](_utils_.unauthorizederror.md).[stack](_utils_.unauthorizederror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
