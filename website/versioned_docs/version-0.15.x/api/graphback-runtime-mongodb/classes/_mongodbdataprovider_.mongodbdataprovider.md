---
id: "_mongodbdataprovider_.mongodbdataprovider"
title: "MongoDBDataProvider"
sidebar_label: "MongoDBDataProvider"
---

Graphback provider that connnects to the MongoDB database

## Type parameters

▪ **Type**

## Hierarchy

* **MongoDBDataProvider**

## Implements

* GraphbackDataProvider‹Type›

## Index

### Constructors

* [constructor](_mongodbdataprovider_.mongodbdataprovider.md#constructor)

### Properties

* [coerceTSFields](_mongodbdataprovider_.mongodbdataprovider.md#protected-coercetsfields)
* [collectionName](_mongodbdataprovider_.mongodbdataprovider.md#protected-collectionname)
* [db](_mongodbdataprovider_.mongodbdataprovider.md#protected-db)
* [fieldTransformMap](_mongodbdataprovider_.mongodbdataprovider.md#protected-fieldtransformmap)
* [tableMap](_mongodbdataprovider_.mongodbdataprovider.md#protected-tablemap)

### Methods

* [batchRead](_mongodbdataprovider_.mongodbdataprovider.md#batchread)
* [buildProjectionOption](_mongodbdataprovider_.mongodbdataprovider.md#protected-buildprojectionoption)
* [count](_mongodbdataprovider_.mongodbdataprovider.md#count)
* [create](_mongodbdataprovider_.mongodbdataprovider.md#create)
* [delete](_mongodbdataprovider_.mongodbdataprovider.md#delete)
* [findBy](_mongodbdataprovider_.mongodbdataprovider.md#findby)
* [findOne](_mongodbdataprovider_.mongodbdataprovider.md#findone)
* [mapFields](_mongodbdataprovider_.mongodbdataprovider.md#protected-mapfields)
* [sortQuery](_mongodbdataprovider_.mongodbdataprovider.md#private-sortquery)
* [update](_mongodbdataprovider_.mongodbdataprovider.md#update)
* [usePage](_mongodbdataprovider_.mongodbdataprovider.md#private-usepage)

## Constructors

###  constructor

\+ **new MongoDBDataProvider**(`baseType`: GraphQLObjectType, `db`: any): *[MongoDBDataProvider](_mongodbdataprovider_.mongodbdataprovider.md)*

*Defined in [MongoDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`baseType` | GraphQLObjectType |
`db` | any |

**Returns:** *[MongoDBDataProvider](_mongodbdataprovider_.mongodbdataprovider.md)*

## Properties

### `Protected` coerceTSFields

• **coerceTSFields**: *boolean*

*Defined in [MongoDBDataProvider.ts:20](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L20)*

___

### `Protected` collectionName

• **collectionName**: *string*

*Defined in [MongoDBDataProvider.ts:17](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L17)*

___

### `Protected` db

• **db**: *Db*

*Defined in [MongoDBDataProvider.ts:16](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L16)*

___

### `Protected` fieldTransformMap

• **fieldTransformMap**: *FieldTransformMap*

*Defined in [MongoDBDataProvider.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L19)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Defined in [MongoDBDataProvider.ts:18](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L18)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter`: any, `context`: GraphbackContext): *Promise‹Type[][]›*

*Defined in [MongoDBDataProvider.ts:130](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type[][]›*

___

### `Protected` buildProjectionOption

▸ **buildProjectionOption**(`context`: GraphbackContext): *object*

*Defined in [MongoDBDataProvider.ts:181](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |

**Returns:** *object*

* **[field]**: *number* = 1

___

###  count

▸ **count**(`filter`: any): *Promise‹number›*

*Defined in [MongoDBDataProvider.ts:126](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: any, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:33](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:79](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: QueryFilter‹Type›, `context`: GraphbackContext, `page?`: GraphbackPage, `orderBy?`: GraphbackOrderBy): *Promise‹Type[]›*

*Defined in [MongoDBDataProvider.ts:113](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter‹Type› |
`context` | GraphbackContext |
`page?` | GraphbackPage |
`orderBy?` | GraphbackOrderBy |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`filter`: any, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:99](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

### `Protected` mapFields

▸ **mapFields**(`document`: any): *any*

*Defined in [MongoDBDataProvider.ts:173](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`document` | any |

**Returns:** *any*

___

### `Private` sortQuery

▸ **sortQuery**(`query`: Cursor‹any›, `orderBy`: GraphbackOrderBy): *Cursor‹any›*

*Defined in [MongoDBDataProvider.ts:195](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Cursor‹any› |
`orderBy` | GraphbackOrderBy |

**Returns:** *Cursor‹any›*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:54](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext |

**Returns:** *Promise‹Type›*

___

### `Private` usePage

▸ **usePage**(`query`: Cursor‹any›, `page?`: GraphbackPage): *Promise‹any[]›*

*Defined in [MongoDBDataProvider.ts:213](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L213)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Cursor‹any› |
`page?` | GraphbackPage |

**Returns:** *Promise‹any[]›*
