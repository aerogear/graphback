---
id: "_plugin_modeldefinition_"
title: "plugin/ModelDefinition"
sidebar_label: "plugin/ModelDefinition"
---

## Index

### Type aliases

* [FieldDescriptor](_plugin_modeldefinition_.md#fielddescriptor)
* [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)
* [ModelFieldMap](_plugin_modeldefinition_.md#modelfieldmap)

### Functions

* [getModelByName](_plugin_modeldefinition_.md#getmodelbyname)

## Type aliases

###  FieldDescriptor

Ƭ **FieldDescriptor**: *object*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:8](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/plugin/ModelDefinition.ts#L8)*

Describe the name and type of primary key

#### Type declaration:

* **name**: *string*

* **transient**? : *boolean | undefined*

* **type**: *string*

___

###  ModelDefinition

Ƭ **ModelDefinition**: *object*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/plugin/ModelDefinition.ts#L21)*

Used to encapsulate configuration for the type

#### Type declaration:

* **crudOptions**: *[GraphbackCRUDGeneratorConfig](../interfaces/_plugin_graphbackcrudgeneratorconfig_.graphbackcrudgeneratorconfig.md)*

* **fields**: *[ModelFieldMap](_plugin_modeldefinition_.md#modelfieldmap)*

* **graphqlType**: *GraphQLObjectType*

* **primaryKey**: *[FieldDescriptor](_plugin_modeldefinition_.md#fielddescriptor)*

* **relationships**: *[FieldRelationshipMetadata](../interfaces/_relationships_relationshipmetadatabuilder_.fieldrelationshipmetadata.md)[]*

___

###  ModelFieldMap

Ƭ **ModelFieldMap**: *object*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:14](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/plugin/ModelDefinition.ts#L14)*

#### Type declaration:

* \[ **key**: *string*\]: [FieldDescriptor](_plugin_modeldefinition_.md#fielddescriptor)

## Functions

###  getModelByName

▸ **getModelByName**(`name`: string, `models`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)[]): *[ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | undefined*

*Defined in [packages/graphback-core/src/plugin/ModelDefinition.ts:29](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/plugin/ModelDefinition.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`models` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)[] |

**Returns:** *[ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | undefined*
