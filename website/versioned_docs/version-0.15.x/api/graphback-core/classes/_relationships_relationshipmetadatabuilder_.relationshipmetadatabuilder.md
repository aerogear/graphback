---
id: "_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder"
title: "RelationshipMetadataBuilder"
sidebar_label: "RelationshipMetadataBuilder"
---

Builds relationship context for entire data model.
Performs validation on relationship fields and metadata
Dynamically creates relationship fields and maps values to data layer.

## Hierarchy

* **RelationshipMetadataBuilder**

## Index

### Constructors

* [constructor](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#constructor)

### Properties

* [modelTypes](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-modeltypes)
* [relationships](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-relationships)

### Methods

* [addManyToOne](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-addmanytoone)
* [addOneToMany](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-addonetomany)
* [addOneToOne](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-addonetoone)
* [build](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#build)
* [buildModelRelationshipContext](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-buildmodelrelationshipcontext)
* [createManyToOneField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-createmanytoonefield)
* [createOneToManyField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-createonetomanyfield)
* [getModelRelationships](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#getmodelrelationships)
* [getRelationshipFields](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-getrelationshipfields)
* [getRelationships](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#getrelationships)
* [updateManyToOneField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-updatemanytoonefield)
* [updateOneToManyField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-updateonetomanyfield)
* [updateOneToOneField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-updateonetoonefield)
* [validateManyToOneField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-validatemanytoonefield)
* [validateOneToManyRelationship](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-validateonetomanyrelationship)
* [validateOneToOneRelationship](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-validateonetoonerelationship)
* [validateRelationshipField](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md#private-validaterelationshipfield)

## Constructors

###  constructor

\+ **new RelationshipMetadataBuilder**(`modelTypes`: GraphQLObjectType[]): *[RelationshipMetadataBuilder](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md)*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`modelTypes` | GraphQLObjectType[] |

**Returns:** *[RelationshipMetadataBuilder](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md)*

## Properties

### `Private` modelTypes

• **modelTypes**: *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:30](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L30)*

___

### `Private` relationships

• **relationships**: *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L31)*

## Methods

### `Private` addManyToOne

▸ **addManyToOne**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:199](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

### `Private` addOneToMany

▸ **addOneToMany**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:174](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

### `Private` addOneToOne

▸ **addOneToOne**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:224](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

###  build

▸ **build**(): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:41](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L41)*

Builds relationship context for entire data model
Generates fields and anotations

**Returns:** *void*

___

### `Private` buildModelRelationshipContext

▸ **buildModelRelationshipContext**(`modelType`: GraphQLObjectType): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:68](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L68)*

Collects relationship information for a model based on relationship field annotations
and pushes to list of all relationships in data model.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelType` | GraphQLObjectType |   |

**Returns:** *void*

___

### `Private` createManyToOneField

▸ **createManyToOneField**(`fieldName`: string, `baseType`: GraphQLOutputType, `relationFieldName`: string, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:126](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`fieldName` | string |
`baseType` | GraphQLOutputType |
`relationFieldName` | string |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

### `Private` createOneToManyField

▸ **createOneToManyField**(`fieldName`: string, `baseType`: GraphQLOutputType, `relationFieldName`: string, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:109](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`fieldName` | string |
`baseType` | GraphQLOutputType |
`relationFieldName` | string |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

###  getModelRelationships

▸ **getModelRelationships**(`modelName`: string): *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:58](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L58)*

Get all relationships where the model is the parent.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelName` | string |   |

**Returns:** *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

___

### `Private` getRelationshipFields

▸ **getRelationshipFields**(`modelType`: GraphQLObjectType): *GraphQLField‹any, any›[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:250](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L250)*

**Parameters:**

Name | Type |
------ | ------ |
`modelType` | GraphQLObjectType |

**Returns:** *GraphQLField‹any, any›[]*

___

###  getRelationships

▸ **getRelationships**(): *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:50](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L50)*

Get all relationships

**Returns:** *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

___

### `Private` updateManyToOneField

▸ **updateManyToOneField**(`field`: GraphQLField‹any, any›, `relationFieldName`: string, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:152](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |
`relationFieldName` | string |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

### `Private` updateOneToManyField

▸ **updateOneToManyField**(`field`: GraphQLField‹any, any›, `relationFieldName`: string, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:141](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |
`relationFieldName` | string |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

### `Private` updateOneToOneField

▸ **updateOneToOneField**(`field`: GraphQLField‹any, any›, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:163](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

### `Private` validateManyToOneField

▸ **validateManyToOneField**(`modelName`: string, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:290](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L290)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

### `Private` validateOneToManyRelationship

▸ **validateOneToManyRelationship**(`modelName`: string, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:256](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L256)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

### `Private` validateOneToOneRelationship

▸ **validateOneToOneRelationship**(`modelName`: string, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:300](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L300)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |

**Returns:** *void*

___

### `Private` validateRelationshipField

▸ **validateRelationshipField**(`modelName`: string, `field`: GraphQLField‹any, any›): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:314](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L314)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |

**Returns:** *void*
