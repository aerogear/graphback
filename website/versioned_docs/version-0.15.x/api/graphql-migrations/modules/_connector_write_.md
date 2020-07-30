---
id: "_connector_write_"
title: "connector/write"
sidebar_label: "connector/write"
---

## Index

### Functions

* [write](_connector_write_.md#write)

## Functions

###  write

▸ **write**(`operations`: [Operation](../interfaces/_diff_operation_.operation.md)[], `config`: Config, `schemaName`: string, `tablePrefix`: string, `columnPrefix`: string, `plugins`: [MigratePlugin](../interfaces/_plugin_migrateplugin_.migrateplugin.md)[]): *Promise‹void›*

*Defined in [connector/write.ts:36](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/connector/write.ts#L36)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`operations` | [Operation](../interfaces/_diff_operation_.operation.md)[] | - | - |
`config` | Config | - | Knex configuration |
`schemaName` | string | "public" | Table schema prefix: `<schemaName>.<tableName>` |
`tablePrefix` | string | "" | Table name prefix: `<prefix><tableName>` |
`columnPrefix` | string | "" | Column name prefix: `<prefix><columnName>`  |
`plugins` | [MigratePlugin](../interfaces/_plugin_migrateplugin_.migrateplugin.md)[] | [] | - |

**Returns:** *Promise‹void›*
