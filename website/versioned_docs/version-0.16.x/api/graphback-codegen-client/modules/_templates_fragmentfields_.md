---
id: "_templates_fragmentfields_"
title: "templates/fragmentFields"
sidebar_label: "templates/fragmentFields"
---

## Index

### Functions

* [buildReturnFields](_templates_fragmentfields_.md#buildreturnfields)
* [printReturnFields](_templates_fragmentfields_.md#const-printreturnfields)

## Functions

###  buildReturnFields

▸ **buildReturnFields**(`t`: GraphQLObjectType, `level?`: number): *any[]*

*Defined in [graphback-codegen-client/src/templates/fragmentFields.ts:12](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/fragmentFields.ts#L12)*

For given type - it returns list of the type fields that
can be used for building GraphQL Fragment

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t` | GraphQLObjectType | type that is going to be used |
`level?` | number | nested level (supports only 0, 1 nested level)  |

**Returns:** *any[]*

___

### `Const` printReturnFields

▸ **printReturnFields**(`resultArray`: any[], `shift`: string): *string*

*Defined in [graphback-codegen-client/src/templates/fragmentFields.ts:38](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/fragmentFields.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`resultArray` | any[] | - |
`shift` | string | "" |

**Returns:** *string*
