---
id: "_abstract_generateabstractdatabase_"
title: "abstract/generateAbstractDatabase"
sidebar_label: "abstract/generateAbstractDatabase"
---

## Index

### Interfaces

* [GenerateAbstractDatabaseOptions](../interfaces/_abstract_generateabstractdatabase_.generateabstractdatabaseoptions.md)

### Type aliases

* [ScalarMap](_abstract_generateabstractdatabase_.md#scalarmap)

### Functions

* [generateAbstractDatabase](_abstract_generateabstractdatabase_.md#generateabstractdatabase)

### Object literals

* [defaultOptions](_abstract_generateabstractdatabase_.md#const-defaultoptions)

## Type aliases

###  ScalarMap

Ƭ **ScalarMap**: *function*

*Defined in [abstract/generateAbstractDatabase.ts:58](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-migrations/src/abstract/generateAbstractDatabase.ts#L58)*

#### Type declaration:

▸ (`field`: GraphQLField‹any, any›, `scalarType`: GraphQLScalarType | undefined, `annotations`: any): *[TableColumnTypeDescriptor](../interfaces/_abstract_getcolumntypefromscalar_.tablecolumntypedescriptor.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |
`scalarType` | GraphQLScalarType &#124; undefined |
`annotations` | any |

## Functions

###  generateAbstractDatabase

▸ **generateAbstractDatabase**(`schema`: GraphQLSchema, `options`: [GenerateAbstractDatabaseOptions](../interfaces/_abstract_generateabstractdatabase_.generateabstractdatabaseoptions.md)): *Promise‹[AbstractDatabase](../interfaces/_abstract_abstractdatabase_.abstractdatabase.md)›*

*Defined in [abstract/generateAbstractDatabase.ts:74](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-migrations/src/abstract/generateAbstractDatabase.ts#L74)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`schema` | GraphQLSchema | - |
`options` | [GenerateAbstractDatabaseOptions](../interfaces/_abstract_generateabstractdatabase_.generateabstractdatabaseoptions.md) | defaultOptions |

**Returns:** *Promise‹[AbstractDatabase](../interfaces/_abstract_abstractdatabase_.abstractdatabase.md)›*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [abstract/generateAbstractDatabase.ts:70](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-migrations/src/abstract/generateAbstractDatabase.ts#L70)*

###  scalarMap

• **scalarMap**: *undefined* = undefined

*Defined in [abstract/generateAbstractDatabase.ts:71](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-migrations/src/abstract/generateAbstractDatabase.ts#L71)*
