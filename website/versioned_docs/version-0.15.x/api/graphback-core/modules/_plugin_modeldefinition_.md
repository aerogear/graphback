---
id: "_plugin_modeldefinition_"
title: "plugin/ModelDefinition"
sidebar_label: "plugin/ModelDefinition"
---

## Index

### Type aliases

* [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)

### Functions

* [getModelByName](_plugin_modeldefinition_.md#getmodelbyname)

## Type aliases

###  ModelDefinition

Ƭ **ModelDefinition**: *object*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:8](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/ModelDefinition.ts#L8)*

Used to encapsulate configuration for the type

#### Type declaration:

* **config**(): *object*

  * **deltaSync**: *boolean*

* **crudOptions**: *[GraphbackCRUDGeneratorConfig](../interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig.md)*

* **graphqlType**: *GraphQLObjectType*

* **primaryKey**: *string*

* **relationships**: *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

## Functions

###  getModelByName

▸ **getModelByName**(`name`: string, `models`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)[]): *[ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | undefined*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/ModelDefinition.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`models` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)[] |

**Returns:** *[ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | undefined*
