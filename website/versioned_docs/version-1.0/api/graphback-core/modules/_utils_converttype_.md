---
id: "_utils_converttype_"
title: "utils/convertType"
sidebar_label: "utils/convertType"
---

## Index

### Functions

* [convertType](_utils_converttype_.md#converttype)
* [isDateObject](_utils_converttype_.md#const-isdateobject)

## Functions

###  convertType

▸ **convertType**(`value`: any, `toType`: any): *string | number | boolean | BigInt | ObjectID*

*Defined in [packages/graphback-core/src/utils/convertType.ts:9](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/utils/convertType.ts#L9)*

Helper function to convert a value to another type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | Value to convert |
`toType` | any | convert value to this type  |

**Returns:** *string | number | boolean | BigInt | ObjectID*

___

### `Const` isDateObject

▸ **isDateObject**(`value`: any): *boolean*

*Defined in [packages/graphback-core/src/utils/convertType.ts:43](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/utils/convertType.ts#L43)*

Check if value is a Date object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any |   |

**Returns:** *boolean*
