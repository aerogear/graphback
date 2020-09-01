---
id: "_writer_schemaformatters_"
title: "writer/schemaFormatters"
sidebar_label: "writer/schemaFormatters"
---

## Index

### Object literals

* [gqlSchemaFormatter](_writer_schemaformatters_.md#const-gqlschemaformatter)
* [jsSchemaFormatter](_writer_schemaformatters_.md#const-jsschemaformatter)
* [tsSchemaFormatter](_writer_schemaformatters_.md#const-tsschemaformatter)

## Object literals

### `Const` gqlSchemaFormatter

### ▪ **gqlSchemaFormatter**: *object*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:41](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L41)*

GQL string template that returns schema in original form

###  format

▸ **format**(`schemaString`: string): *string*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:42](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaString` | string |

**Returns:** *string*

___

### `Const` jsSchemaFormatter

### ▪ **jsSchemaFormatter**: *object*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:24](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L24)*

JS string template that formats schema into common js module that can be imported
easily in server side application

###  format

▸ **format**(`schemaString`: string): *string*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:25](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaString` | string |

**Returns:** *string*

___

### `Const` tsSchemaFormatter

### ▪ **tsSchemaFormatter**: *object*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:9](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L9)*

Typescript string template that formats schema into common js module that can be imported
easily in server side application

###  format

▸ **format**(`schemaString`: string): *string*

*Defined in [graphback-codegen-schema/src/writer/schemaFormatters.ts:10](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-schema/src/writer/schemaFormatters.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`schemaString` | string |

**Returns:** *string*
