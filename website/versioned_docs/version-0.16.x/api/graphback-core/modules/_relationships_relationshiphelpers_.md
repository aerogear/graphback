---
id: "_relationships_relationshiphelpers_"
title: "relationships/relationshipHelpers"
sidebar_label: "relationships/relationshipHelpers"
---

## Index

### Functions

* [addRelationshipFields](_relationships_relationshiphelpers_.md#addrelationshipfields)
* [extendOneToManyFieldArguments](_relationships_relationshiphelpers_.md#extendonetomanyfieldarguments)
* [extendRelationshipFields](_relationships_relationshiphelpers_.md#extendrelationshipfields)
* [isOneToManyField](_relationships_relationshiphelpers_.md#isonetomanyfield)
* [parseRelationshipAnnotation](_relationships_relationshiphelpers_.md#parserelationshipannotation)
* [relationshipFieldDescriptionTemplate](_relationships_relationshiphelpers_.md#const-relationshipfielddescriptiontemplate)
* [relationshipOneToOneFieldDescriptionTemplate](_relationships_relationshiphelpers_.md#const-relationshiponetoonefielddescriptiontemplate)

## Functions

###  addRelationshipFields

▸ **addRelationshipFields**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `typeComposer`: ObjectTypeComposer): *void*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:77](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L77)*

Generate relationship fields inferred from metadata
and add to the model type

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | Graphback model definition |
`typeComposer` | ObjectTypeComposer | GraphQL Compose Type composer for the model  |

**Returns:** *void*

___

###  extendOneToManyFieldArguments

▸ **extendOneToManyFieldArguments**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `typeComposer`: ObjectTypeComposer): *void*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:127](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L127)*

Extend one-to-many field by adding filter arguments

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | Graphback model definition |
`typeComposer` | ObjectTypeComposer | GraphQL Compose Type composer for the model  |

**Returns:** *void*

___

###  extendRelationshipFields

▸ **extendRelationshipFields**(`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `typeComposer`: ObjectTypeComposer): *void*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:101](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L101)*

Extends an existing relationship field by adding metadata such as annotations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | Graphback model definition |
`typeComposer` | ObjectTypeComposer | GraphQL Compose Type composer for the model  |

**Returns:** *void*

___

###  isOneToManyField

▸ **isOneToManyField**(`field`: GraphQLField‹any, any›): *boolean*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:42](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L42)*

Helper to check if a field is a oneToMany

**Parameters:**

Name | Type |
------ | ------ |
`field` | GraphQLField‹any, any› |

**Returns:** *boolean*

___

###  parseRelationshipAnnotation

▸ **parseRelationshipAnnotation**(`description`: string): *[RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) | undefined*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:13](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L13)*

Parse relationship metadata string to strongly-typed interface

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`description` | string | "" | field description  |

**Returns:** *[RelationshipAnnotation](../interfaces/_relationships_relationshipmetadatabuilder_.relationshipannotation.md) | undefined*

___

### `Const` relationshipFieldDescriptionTemplate

▸ **relationshipFieldDescriptionTemplate**(`relationshipKind`: "oneToOne" | "oneToMany" | "manyToOne", `fieldName`: string, `columnKey`: string): *string*

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:55](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L55)*

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

*Defined in [packages/graphback-core/src/relationships/relationshipHelpers.ts:66](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/relationships/relationshipHelpers.ts#L66)*

Template for one-to-one relationship annotations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relationshipKind` | "oneToOne" &#124; "oneToMany" &#124; "manyToOne" | - |
`columnKey` | string |   |

**Returns:** *string*
