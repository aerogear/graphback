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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:32](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`modelTypes` | GraphQLObjectType[] |

**Returns:** *[RelationshipMetadataBuilder](_relationships_relationshipmetadatabuilder_.relationshipmetadatabuilder.md)*

## Properties

### `Private` modelTypes

• **modelTypes**: *GraphQLObjectType[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:31](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L31)*

___

### `Private` relationships

• **relationships**: *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:32](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L32)*

## Methods

### `Private` addManyToOne

▸ **addManyToOne**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›, `manyToOneAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:223](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |
`manyToOneAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

### `Private` addOneToMany

▸ **addOneToMany**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›, `oneToManyAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md), `corresspondingManyToOneMetadata`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:201](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L201)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |
`oneToManyAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |
`corresspondingManyToOneMetadata` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

### `Private` addOneToOne

▸ **addOneToOne**(`ownerType`: GraphQLObjectType, `field`: GraphQLField‹any, any›, `oneToOneAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:245](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L245)*

**Parameters:**

Name | Type |
------ | ------ |
`ownerType` | GraphQLObjectType |
`field` | GraphQLField‹any, any› |
`oneToOneAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

###  build

▸ **build**(): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:42](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L42)*

Builds relationship context for entire data model
Generates fields and anotations

**Returns:** *void*

___

### `Private` buildModelRelationshipContext

▸ **buildModelRelationshipContext**(`modelType`: GraphQLObjectType): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:69](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L69)*

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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:139](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L139)*

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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:122](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L122)*

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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:59](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L59)*

Get all relationships where the model is the parent.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`modelName` | string |   |

**Returns:** *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

___

###  getRelationships

▸ **getRelationships**(): *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:51](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L51)*

Get all relationships

**Returns:** *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

___

### `Private` updateManyToOneField

▸ **updateManyToOneField**(`field`: GraphQLField‹any, any›, `relationFieldName`: string, `columnName?`: string): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:169](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L169)*

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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:154](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L154)*

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

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:186](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |
`columnName?` | string |

**Returns:** *GraphQLField‹any, any›*

___

### `Private` validateManyToOneField

▸ **validateManyToOneField**(`modelName`: string, `field`: GraphQLField‹any, any›, `manyToOneAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:297](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L297)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |
`manyToOneAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

### `Private` validateOneToManyRelationship

▸ **validateOneToManyRelationship**(`modelName`: string, `field`: GraphQLField‹any, any›, `oneToManyMetadata`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md), `corresspondingManyToOneMetadata`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:267](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L267)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |
`oneToManyMetadata` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |
`corresspondingManyToOneMetadata` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

### `Private` validateOneToOneRelationship

▸ **validateOneToOneRelationship**(`modelName`: string, `field`: GraphQLField‹any, any›, `oneToOneAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:305](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L305)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |
`oneToOneAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*

___

### `Private` validateRelationshipField

▸ **validateRelationshipField**(`modelName`: string, `field`: GraphQLField‹any, any›, `relationshipAnnotation`: [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md)): *void*

*Defined in [packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts:317](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/RelationshipMetadataBuilder.ts#L317)*

**Parameters:**

Name | Type |
------ | ------ |
`modelName` | string |
`field` | GraphQLField‹any, any› |
`relationshipAnnotation` | [RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) |

**Returns:** *void*
