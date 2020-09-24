---
id: "_plugin_migrateoperationfilter_.migrateoperationfilter"
title: "MigrateOperationFilter"
sidebar_label: "MigrateOperationFilter"
---

Method that can be used to filter out operations that we do not want to execute.
For example if we want to prevent deletion of the tables filter can remove `table.drop` operations
from array

## Hierarchy

* **MigrateOperationFilter**

## Index

### Methods

* [filter](_plugin_migrateoperationfilter_.migrateoperationfilter.md#filter)

## Methods

###  filter

▸ **filter**(`operations`: [Operation](_diff_operation_.operation.md)[]): *[Operation](_diff_operation_.operation.md)[]*

*Defined in [plugin/MigrateOperationFilter.ts:10](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/plugin/MigrateOperationFilter.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`operations` | [Operation](_diff_operation_.operation.md)[] |

**Returns:** *[Operation](_diff_operation_.operation.md)[]*
