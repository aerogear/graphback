---
id: "_runtime_interfaces_"
title: "runtime/interfaces"
sidebar_label: "runtime/interfaces"
---

## Index

### Interfaces

* [FindByArgs](../interfaces/_runtime_interfaces_.findbyargs.md)
* [GraphbackContext](../interfaces/_runtime_interfaces_.graphbackcontext.md)
* [GraphbackOrderBy](../interfaces/_runtime_interfaces_.graphbackorderby.md)
* [GraphbackPage](../interfaces/_runtime_interfaces_.graphbackpage.md)
* [GraphbackServiceConfigMap](../interfaces/_runtime_interfaces_.graphbackserviceconfigmap.md)

### Type aliases

* [DataProviderCreator](_runtime_interfaces_.md#dataprovidercreator)
* [ServiceCreator](_runtime_interfaces_.md#servicecreator)
* [SortDirection](_runtime_interfaces_.md#sortdirection)

## Type aliases

###  DataProviderCreator

Ƭ **DataProviderCreator**: *function*

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:50](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/interfaces.ts#L50)*

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

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:55](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/interfaces.ts#L55)*

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

*Defined in [packages/graphback-core/src/runtime/interfaces.ts:28](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/interfaces.ts#L28)*
