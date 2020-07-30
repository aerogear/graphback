---
id: "_plugin_getselectedfieldsfromresolverinfo_"
title: "plugin/getSelectedFieldsFromResolverInfo"
sidebar_label: "plugin/getSelectedFieldsFromResolverInfo"
---

## Index

### Functions

* [getSelectedFieldsFromResolverInfo](_plugin_getselectedfieldsfromresolverinfo_.md#const-getselectedfieldsfromresolverinfo)

## Functions

### `Const` getSelectedFieldsFromResolverInfo

▸ **getSelectedFieldsFromResolverInfo**(`info`: GraphQLResolveInfo, `model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `path?`: string): *string[]*

*Defined in [packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts:18](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/plugin/getSelectedFieldsFromResolverInfo.ts#L18)*

Find selectable fields from resolve info for a given model starting on a given path

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`info` | GraphQLResolveInfo | the resolver info object |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) | the model to find the fields from |
`path?` | string | the root path to start field resolution from.  |

**Returns:** *string[]*
