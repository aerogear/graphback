---
id: "_writer_schemaformatter_.schemaformatter"
title: "SchemaFormatter"
sidebar_label: "SchemaFormatter"
---

Schema formatter that provides ability to wrap schema string with language specific code
that can simplify importing and using it within server side code.

**`see`** jsSchemaFormatter

**`see`** tsSchemaFormatter

**`see`** gqlSchemaFormatter

## Hierarchy

* **SchemaFormatter**

## Index

### Methods

* [format](_writer_schemaformatter_.schemaformatter.md#format)

## Methods

###  format

▸ **format**(`schemaString`: string): *string*

*Defined in [graphback-codegen-schema/src/writer/SchemaFormatter.ts:17](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-schema/src/writer/SchemaFormatter.ts#L17)*

Transform schema string to new format.
Can be used to wrap schema into js or typescript import format that can be added to the file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schemaString` | string |   |

**Returns:** *string*
