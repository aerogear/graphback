---
id: "_templates_gqltemplates_"
title: "templates/gqlTemplates"
sidebar_label: "templates/gqlTemplates"
---

## Index

### Functions

* [createClientDocumentsGQL](_templates_gqltemplates_.md#const-createclientdocumentsgql)
* [createFragments](_templates_gqltemplates_.md#const-createfragments)
* [createMutation](_templates_gqltemplates_.md#const-createmutation)
* [createQueries](_templates_gqltemplates_.md#const-createqueries)
* [deleteMutation](_templates_gqltemplates_.md#const-deletemutation)
* [expandedFragment](_templates_gqltemplates_.md#const-expandedfragment)
* [findOneQuery](_templates_gqltemplates_.md#const-findonequery)
* [findQuery](_templates_gqltemplates_.md#const-findquery)
* [fragment](_templates_gqltemplates_.md#const-fragment)
* [subscription](_templates_gqltemplates_.md#const-subscription)
* [updateMutation](_templates_gqltemplates_.md#const-updatemutation)

## Functions

### `Const` createClientDocumentsGQL

▸ **createClientDocumentsGQL**(`inputContext`: ModelDefinition[]): *object*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:203](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L203)*

**Parameters:**

Name | Type |
------ | ------ |
`inputContext` | ModelDefinition[] |

**Returns:** *object*

* **fragments**: *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]* = createFragments(inputContext)

* **mutations**: *any[]* = createMutations(inputContext)

* **queries**: *any[]* = createQueries(inputContext)

* **subscriptions**: *any[]* = createSubscriptions(inputContext)

___

### `Const` createFragments

▸ **createFragments**(`types`: ModelDefinition[]): *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:96](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]*

___

### `Const` createMutation

▸ **createMutation**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:51](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*

___

### `Const` createQueries

▸ **createQueries**(`types`: ModelDefinition[]): *any[]*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:111](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *any[]*

___

### `Const` deleteMutation

▸ **deleteMutation**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:75](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*

___

### `Const` expandedFragment

▸ **expandedFragment**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:15](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*

___

### `Const` findOneQuery

▸ **findOneQuery**(`t`: ModelDefinition): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:24](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | ModelDefinition |

**Returns:** *string*

___

### `Const` findQuery

▸ **findQuery**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:34](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*

___

### `Const` fragment

▸ **fragment**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:6](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*

___

### `Const` subscription

▸ **subscription**(`t`: GraphQLObjectType, `fieldName`: string, `inputTypeField`: string): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:87](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |
`fieldName` | string |
`inputTypeField` | string |

**Returns:** *string*

___

### `Const` updateMutation

▸ **updateMutation**(`t`: GraphQLObjectType): *string*

*Defined in [graphback-codegen-client/src/templates/gqlTemplates.ts:63](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-codegen-client/src/templates/gqlTemplates.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | GraphQLObjectType |

**Returns:** *string*
