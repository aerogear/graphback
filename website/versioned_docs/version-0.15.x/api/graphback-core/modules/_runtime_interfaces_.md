---
id: "_runtime_interfaces_"
title: "runtime/interfaces"
sidebar_label: "runtime/interfaces"
---

## Index

### Interfaces

* [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)
* [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md)
* [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md)
* [GraphbackResolverOptions](../interfaces/_runtime_interfaces_.graphbackresolveroptions.md)
* [GraphbackServiceConfigMap](../interfaces/_runtime_interfaces_.graphbackserviceconfigmap.md)

### Type aliases

* [DataProviderCreator](_runtime_interfaces_.md#dataprovidercreator)
* [ServiceCreator](_runtime_interfaces_.md#servicecreator)
* [SortDirection](_runtime_interfaces_.md#sortdirection)

## Type aliases

###  DataProviderCreator

Ƭ **DataProviderCreator**: *function*

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:52](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/interfaces.ts#L52)*

Creator method that can be used by underlying implementation to create new data service

#### Type declaration:

▸ (`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition)): *[GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) |

___

###  ServiceCreator

Ƭ **ServiceCreator**: *function*

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:57](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/interfaces.ts#L57)*

Creator method that can be used by underlying implementation to create new data service

#### Type declaration:

▸ (`model`: [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition), `dataProvider`: [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md)): *[GraphbackCRUDService](../interfaces/_runtime_graphbackcrudservice_.graphbackcrudservice.md)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [ModelDefinition](_plugin_modeldefinition_.md#modeldefinition) |
`dataProvider` | [GraphbackDataProvider](../interfaces/_runtime_graphbackdataprovider_.graphbackdataprovider.md) |

___

###  SortDirection

Ƭ **SortDirection**: *"asc" | "desc"*

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:39](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/interfaces.ts#L39)*
