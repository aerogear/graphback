---
id: "_relationships_relationshiphelpers_"
title: "relationships/relationshipHelpers"
sidebar_label: "relationships/relationshipHelpers"
---

## Index

### Functions

* [addRelationshipFields](_relationships_relationshiphelpers_.md#addRelationshipFields)
* [extendRelationshipFields](_relationships_relationshiphelpers_.md#extendRelationshipFields)
* [extendOneToManyFieldArguments](_relationships_relationshiphelpers_.md#extendOneToManyFieldArguments)
* [getRelationshipAnnotationString](_relationships_relationshiphelpers_.md#const-getrelationshipannotationstring)
* [isOneToManyField](_relationships_relationshiphelpers_.md#isonetomanyfield)
* [mergeDescriptionWithRelationshipAnnotation](_relationships_relationshiphelpers_.md#const-mergedescriptionwithrelationshipannotation)
* [parseRelationshipAnnotation](_relationships_relationshiphelpers_.md#parserelationshipannotation)
* [relationshipFieldDescriptionTemplate](_relationships_relationshiphelpers_.md#const-relationshipfielddescriptiontemplate)
* [relationshipOneToOneFieldDescriptionTemplate](_relationships_relationshiphelpers_.md#const-relationshiponetoonefielddescriptiontemplate)
* [stripRelationshipAnnotation](_relationships_relationshiphelpers_.md#const-striprelationshipannotation)

## Functions

###  addRelationshipFields

▸ **addRelationshipFields**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)): *object*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:159](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L159)*

Creates an object of relationship fields if fields do not already exist on the model type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) |   |

**Returns:** *object*

___

###  extendRelationshipFields

▸ **extendRelationshipFields**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)): *object*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:182](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L182)*

Creates an object of relationship fields which already exist on a model type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) |   |

**Returns:** *object*

___

###  extendOneToManyFieldArguments

▸ **extendOneToManyFieldArguments**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)): *object*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:105](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L105)*

Creates an object of relationship fields if fields do not already exist on the model type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) |   |

**Returns:** *object*

___

### `Const` getRelationshipAnnotationString

▸ **getRelationshipAnnotationString**(`fieldDescription`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:66](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L66)*

Strips all non-relationship annotations from a string

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`fieldDescription` | string | "" |   |

**Returns:** *string*

___

###  isOneToManyField

▸ **isOneToManyField**(`field`: GraphQLField‹any, any›): *boolean*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:41](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L41)*

Helper to check if a field is a oneToMany

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *boolean*

___

### `Const` mergeDescriptionWithRelationshipAnnotation

▸ **mergeDescriptionWithRelationshipAnnotation**(`generatedDescription`: string, `customDescription`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:84](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L84)*

Helper to merge two description strings which may or may not have a relationship annotation.
This helper keeps non-relationship annotations and merges them together.
It chooses the relationship annotation with the `key` field when merging.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`generatedDescription` | string | - |
`customDescription` | string |   |

**Returns:** *string*

___

###  parseRelationshipAnnotation

▸ **parseRelationshipAnnotation**(`description`: string): *[RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) | undefined*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:12](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L12)*

Parse relationship metadata string to strongly-typed interface

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`description` | string | "" | field description  |

**Returns:** *[RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) | undefined*

___

### `Const` relationshipFieldDescriptionTemplate

▸ **relationshipFieldDescriptionTemplate**(`relationshipKind`: "oneToOne" | "oneToMany" | "manyToOne", `fieldName`: string, `columnKey`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:139](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L139)*

Generic template for relationship annotations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationshipKind` | "oneToOne" &#124; "oneToMany" &#124; "manyToOne" | - |
`fieldName` | string | - |
`columnKey` | string |   |

**Returns:** *string*

___

### `Const` relationshipOneToOneFieldDescriptionTemplate

▸ **relationshipOneToOneFieldDescriptionTemplate**(`relationshipKind`: "oneToOne" | "oneToMany" | "manyToOne", `columnKey`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:150](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L150)*

Template for one-to-one relationship annotations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationshipKind` | "oneToOne" &#124; "oneToMany" &#124; "manyToOne" | - |
`columnKey` | string |   |

**Returns:** *string*

___

### `Const` stripRelationshipAnnotation

▸ **stripRelationshipAnnotation**(`fieldDescription`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:51](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/relationships/relationshipHelpers.ts#L51)*

Strips all relationship annotations from a string

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`fieldDescription` | string | "" |   |

**Returns:** *string*
