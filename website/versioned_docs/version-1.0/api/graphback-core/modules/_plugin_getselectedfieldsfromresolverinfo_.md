---
id: "_plugin_getselectedfieldsfromresolverinfo_"
title: "plugin/getSelectedFieldsFromResolverInfo"
sidebar_label: "plugin/getSelectedFieldsFromResolverInfo"
---

## Index

### Functions

* [getModelFieldsFromResolverFields](_plugin_getselectedfieldsfromresolverinfo_.md#const-getmodelfieldsfromresolverfields)
* [getResolverInfoFieldsList](_plugin_getselectedfieldsfromresolverinfo_.md#const-getresolverinfofieldslist)
* [getSelectedFieldsFromResolverInfo](_plugin_getselectedfieldsfromresolverinfo_.md#const-getselectedfieldsfromresolverinfo)

## Functions

### `Const` getModelFieldsFromResolverFields

▸ **getModelFieldsFromResolverFields**(`resolverFields`: string[], `model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)): *string[]*

*Defined in [packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts:23](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts#L23)*

Get the model specific-fields from a full list of fields

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resolverFields` | string[] | resolver field names |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | Graphback model  |

**Returns:** *string[]*

___

### `Const` getResolverInfoFieldsList

▸ **getResolverInfoFieldsList**(`info`: GraphQLResolveInfo, `path?`: string): *string[]*

*Defined in [packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts:42](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts#L42)*

Find fields list of resolver info starting at a given path.
If path is undefined, return top level fields information.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`info` | GraphQLResolveInfo | the resolver info object |
`path?` | string | the root path to start field resolution from  |

**Returns:** *string[]*

___

### `Const` getSelectedFieldsFromResolverInfo

▸ **getSelectedFieldsFromResolverInfo**(`info`: GraphQLResolveInfo, `model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `path?`: string): *string[]*

*Defined in [packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts:11](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts#L11)*

Find selectable fields from resolve info for a given model starting on a given path

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`info` | GraphQLResolveInfo | the resolver info object |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | the model to find the fields from |
`path?` | string | the root path to start field resolution from.  |

**Returns:** *string[]*
