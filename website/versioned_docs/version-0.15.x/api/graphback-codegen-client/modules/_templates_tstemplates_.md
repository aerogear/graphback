---
id: "_templates_tstemplates_"
title: "templates/tsTemplates"
sidebar_label: "templates/tsTemplates"
---

## Index

### Functions

* [createClientDocumentsTS](_templates_tstemplates_.md#const-createclientdocumentsts)
* [createFragmentsTS](_templates_tstemplates_.md#const-createfragmentsts)
* [createMutationsTS](_templates_tstemplates_.md#const-createmutationsts)
* [createQueriesTS](_templates_tstemplates_.md#const-createqueriests)
* [createSubscriptionsTS](_templates_tstemplates_.md#const-createsubscriptionsts)

## Functions

### `Const` createClientDocumentsTS

▸ **createClientDocumentsTS**(`inputContext`: ModelDefinition[]): *object*

*Defined in [graphback-codegen-client/src/templates/tsTemplates.ts:194](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-client/src/templates/tsTemplates.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`inputContext` | ModelDefinition[] |

**Returns:** *object*

* **fragments**: *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]* = createFragmentsTS(inputContext)

* **mutations**: *any[]* = createMutationsTS(inputContext)

* **queries**: *any[]* = createQueriesTS(inputContext)

* **subscriptions**: *any[]* = createSubscriptionsTS(inputContext)

___

### `Const` createFragmentsTS

▸ **createFragmentsTS**(`types`: ModelDefinition[]): *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]*

*Defined in [graphback-codegen-client/src/templates/tsTemplates.ts:85](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-client/src/templates/tsTemplates.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *[ClientTemplate](../interfaces/_templates_clienttemplates_.clienttemplate.md)[]*

___

### `Const` createMutationsTS

▸ **createMutationsTS**(`types`: ModelDefinition[]): *any[]*

*Defined in [graphback-codegen-client/src/templates/tsTemplates.ts:126](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-client/src/templates/tsTemplates.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *any[]*

___

### `Const` createQueriesTS

▸ **createQueriesTS**(`types`: ModelDefinition[]): *any[]*

*Defined in [graphback-codegen-client/src/templates/tsTemplates.ts:102](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-client/src/templates/tsTemplates.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *any[]*

___

### `Const` createSubscriptionsTS

▸ **createSubscriptionsTS**(`types`: ModelDefinition[]): *any[]*

*Defined in [graphback-codegen-client/src/templates/tsTemplates.ts:156](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-codegen-client/src/templates/tsTemplates.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`types` | ModelDefinition[] |

**Returns:** *any[]*
