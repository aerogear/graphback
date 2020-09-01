---
id: "_utils_createindexes_"
title: "utils/createIndexes"
sidebar_label: "utils/createIndexes"
---

## Index

### Functions

* [applyIndexes](_utils_createindexes_.md#applyindexes)
* [findAndCreateIndexes](_utils_createindexes_.md#findandcreateindexes)
* [getCustomIndex](_utils_createindexes_.md#getcustomindex)
* [getIndexFields](_utils_createindexes_.md#getindexfields)
* [getRelationIndex](_utils_createindexes_.md#getrelationindex)

## Functions

###  applyIndexes

▸ **applyIndexes**(`indexes`: IndexSpecification[], `collection`: Collection): *Promise‹void›*

*Defined in [utils/createIndexes.ts:12](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`indexes` | IndexSpecification[] |
`collection` | Collection |

**Returns:** *Promise‹void›*

___

###  findAndCreateIndexes

▸ **findAndCreateIndexes**(`baseType`: GraphQLObjectType, `collection`: Collection): *Promise‹void›*

*Defined in [utils/createIndexes.ts:6](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |
`collection` | Collection |

**Returns:** *Promise‹void›*

___

###  getCustomIndex

▸ **getCustomIndex**(`field`: GraphQLField‹any, any›): *IndexSpecification*

*Defined in [utils/createIndexes.ts:64](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *IndexSpecification*

___

###  getIndexFields

▸ **getIndexFields**(`baseType`: GraphQLObjectType): *IndexSpecification[]*

*Defined in [utils/createIndexes.ts:39](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |

**Returns:** *IndexSpecification[]*

___

###  getRelationIndex

▸ **getRelationIndex**(`field`: GraphQLField‹any, any›): *IndexSpecification*

*Defined in [utils/createIndexes.ts:79](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-runtime-mongodb/src/utils/createIndexes.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *IndexSpecification*
