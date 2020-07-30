---
id: "_crud_mappinghelpers_"
title: "crud/mappingHelpers"
sidebar_label: "crud/mappingHelpers"
---

## Index

### Functions

* [filterModelTypes](_crud_mappinghelpers_.md#filtermodeltypes)
* [filterNonModelTypes](_crud_mappinghelpers_.md#filternonmodeltypes)
* [getFieldName](_crud_mappinghelpers_.md#const-getfieldname)
* [getInputFieldName](_crud_mappinghelpers_.md#getinputfieldname)
* [getInputFieldTypeName](_crud_mappinghelpers_.md#getinputfieldtypename)
* [getInputTypeName](_crud_mappinghelpers_.md#const-getinputtypename)
* [getRelationFieldName](_crud_mappinghelpers_.md#getrelationfieldname)
* [getSubscriptionName](_crud_mappinghelpers_.md#const-getsubscriptionname)
* [getUserModels](_crud_mappinghelpers_.md#getusermodels)
* [isInputField](_crud_mappinghelpers_.md#isinputfield)
* [isModelType](_crud_mappinghelpers_.md#ismodeltype)
* [lowerCaseFirstChar](_crud_mappinghelpers_.md#lowercasefirstchar)
* [upperCaseFirstChar](_crud_mappinghelpers_.md#uppercasefirstchar)

## Functions

###  filterModelTypes

▸ **filterModelTypes**(`schema`: GraphQLSchema): *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:103](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L103)*

Get only user types annotated by ```@model```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | GraphQLSchema |   |

**Returns:** *GraphQLObjectType[]*

___

###  filterNonModelTypes

▸ **filterNonModelTypes**(`schema`: GraphQLSchema): *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:112](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L112)*

Get only user types not annotated by ```@model```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | GraphQLSchema |   |

**Returns:** *GraphQLObjectType[]*

___

### `Const` getFieldName

▸ **getFieldName**(`typeName`: string, `action`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md)): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:37](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L37)*

Get name of the field for query and mutation using our crud model.
Method trasform specific CRUD operation into compatible name

Example:
```
type Query {
  getUser()
}
```
This method is compatible with Graphback CRUD specification

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`typeName` | string | - |
`action` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |   |

**Returns:** *string*

___

###  getInputFieldName

▸ **getInputFieldName**(`field`: GraphQLField‹any, any›): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:145](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *string*

___

###  getInputFieldTypeName

▸ **getInputFieldTypeName**(`modelName`: string, `field`: GraphQLField‹any, any›, `operation`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md)): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:159](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |
`operation` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |

**Returns:** *string*

___

### `Const` getInputTypeName

▸ **getInputTypeName**(`typeName`: string, `action`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md)): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:55](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L55)*

Returns the input type assocatiated with a CRUD operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`typeName` | string | - |
`action` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |   |

**Returns:** *string*

___

###  getRelationFieldName

▸ **getRelationFieldName**(`field`: any, `type`: any): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:127](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | any |
`type` | any |

**Returns:** *string*

___

### `Const` getSubscriptionName

▸ **getSubscriptionName**(`typeName`: string, `action`: [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md)): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:77](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L77)*

Provides naming patterns for CRUD subscriptions

**Parameters:**

Name | Type |
------ | ------ |
`typeName` | string |
`action` | [GraphbackOperationType](../enums/_crud_graphbackoperationtype_.graphbackoperationtype.md) |

**Returns:** *string*

___

###  getUserModels

▸ **getUserModels**(`modelTypes`: GraphQLObjectType[]): *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:116](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`modelTypes` | GraphQLObjectType[] |

**Returns:** *GraphQLObjectType[]*

___

###  isInputField

▸ **isInputField**(`field`: GraphQLField‹any, any›): *boolean*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:120](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *boolean*

___

###  isModelType

▸ **isModelType**(`graphqlType`: GraphQLObjectType): *boolean*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:94](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`graphqlType` | GraphQLObjectType |

**Returns:** *boolean*

___

###  lowerCaseFirstChar

▸ **lowerCaseFirstChar**(`text`: string): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:14](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L14)*

Graphback CRUD Mapping helpers

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *string*

___

###  upperCaseFirstChar

▸ **upperCaseFirstChar**(`text`: string): *string*

*Defined in [packages/graphback-core/src/crud/mappingHelpers.ts:18](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/crud/mappingHelpers.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`text` | string |

**Returns:** *string*
