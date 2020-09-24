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
* [sortQuery](_mongodbdataprovider_.mongodbdataprovider.md#private-sortquery)
* [update](_mongodbdataprovider_.mongodbdataprovider.md#update)
* [usePage](_mongodbdataprovider_.mongodbdataprovider.md#private-usepage)
* [verifyMongoDBPrimaryKey](_mongodbdataprovider_.mongodbdataprovider.md#private-verifymongodbprimarykey)

## Constructors

###  constructor

\+ **new MongoDBDataProvider**(`model`: ModelDefinition, `db`: any): *[MongoDBDataProvider](_mongodbdataprovider_.mongodbdataprovider.md)*

*Defined in [MongoDBDataProvider.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | ModelDefinition |
`db` | any |

**Returns:** *[MongoDBDataProvider](_mongodbdataprovider_.mongodbdataprovider.md)*

## Properties

### `Protected` collectionName

• **collectionName**: *string*

*Defined in [MongoDBDataProvider.ts:15](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L15)*

___

### `Protected` db

• **db**: *Db*

*Defined in [MongoDBDataProvider.ts:14](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L14)*

___

### `Protected` fieldTransformMap

• **fieldTransformMap**: *FieldTransformMap*

*Defined in [MongoDBDataProvider.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L17)*

___

### `Protected` tableMap

• **tableMap**: *ModelTableMap*

*Defined in [MongoDBDataProvider.ts:16](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L16)*

## Methods

###  batchRead

▸ **batchRead**(`relationField`: string, `ids`: string[], `filter?`: QueryFilter, `selectedFields?`: string[]): *Promise‹Type[][]›*

*Defined in [MongoDBDataProvider.ts:127](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`ids` | string[] |
`filter?` | QueryFilter |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[][]›*

___

### `Protected` buildProjectionOption

▸ **buildProjectionOption**(`selectedFields`: string[]): *object*

*Defined in [MongoDBDataProvider.ts:153](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`selectedFields` | string[] |

**Returns:** *object*

* **[field]**: *number* = 1

___

###  count

▸ **count**(`filter?`: QueryFilter): *Promise‹number›*

*Defined in [MongoDBDataProvider.ts:123](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L123)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |

**Returns:** *Promise‹number›*

___

###  create

▸ **create**(`data`: Type): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:30](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:78](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args?`: FindByArgs, `selectedFields?`: string[]): *Promise‹Type[]›*

*Defined in [MongoDBDataProvider.ts:110](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`args?` | FindByArgs |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type[]›*

___

###  findOne

▸ **findOne**(`filter`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:96](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Private` sortQuery

▸ **sortQuery**(`query`: Cursor‹any›, `orderBy`: GraphbackOrderBy): *Cursor‹any›*

*Defined in [MongoDBDataProvider.ts:174](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Cursor‹any› |
`orderBy` | GraphbackOrderBy |

**Returns:** *Cursor‹any›*

___

###  update

▸ **update**(`data`: Partial‹Type›, `selectedFields?`: string[]): *Promise‹Type›*

*Defined in [MongoDBDataProvider.ts:50](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Partial‹Type› |
`selectedFields?` | string[] |

**Returns:** *Promise‹Type›*

___

### `Private` usePage

▸ **usePage**(`query`: Cursor‹any›, `page?`: GraphbackPage): *Promise‹any[]›*

*Defined in [MongoDBDataProvider.ts:191](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L191)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | Cursor‹any› |
`page?` | GraphbackPage |

**Returns:** *Promise‹any[]›*

___

### `Private` verifyMongoDBPrimaryKey

▸ **verifyMongoDBPrimaryKey**(`modelName`: string, `primaryKey`: FieldDescriptor): *void*

*Defined in [MongoDBDataProvider.ts:167](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-runtime-mongodb/src/MongoDBDataProvider.ts#L167)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`primaryKey` | FieldDescriptor |

**Returns:** *void*
