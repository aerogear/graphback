---
id: "_connector_read_"
title: "connector/read"
sidebar_label: "connector/read"
---

## Index

### Functions

* [read](_connector_read_.md#read)

## Functions

###  read

▸ **read**(`config`: Config, `schemaName`: string, `tablePrefix`: string, `columnPrefix`: string): *Promise‹[AbstractDatabase](../interfaces/_abstract_abstractdatabase_.abstractdatabase.md)›*

*Defined in [connector/read.ts:21](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphql-migrations/src/connector/read.ts#L21)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`config` | Config | - | Knex configuration |
`schemaName` | string | "public" | Table and column prefix: `<schemaName>.<tableName>` |
`tablePrefix` | string | "" | Table name prefix: `<prefix><tableName>` |
`columnPrefix` | string | "" | Column name prefix: `<prefix><columnName>`  |

**Returns:** *Promise‹[AbstractDatabase](../interfaces/_abstract_abstractdatabase_.abstractdatabase.md)›*
