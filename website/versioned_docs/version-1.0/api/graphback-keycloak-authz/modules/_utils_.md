---
id: "_utils_"
title: "utils"
sidebar_label: "utils"
---

## Index

### Classes

* [UnauthorizedError](../classes/_utils_.unauthorizederror.md)

### Functions

* [checkAuthRulesForInput](_utils_.md#checkauthrulesforinput)
* [checkAuthRulesForSelections](_utils_.md#checkauthrulesforselections)
* [getEmptyServiceConfig](_utils_.md#getemptyserviceconfig)

## Functions

###  checkAuthRulesForInput

▸ **checkAuthRulesForInput**(`context`: GraphbackContext, `authConfig`: [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig), `inputKeys`: string[]): *void*

*Defined in [packages/graphback-keycloak-authz/src/utils.ts:20](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/utils.ts#L20)*

Checks if user is allowed to create/update particular field

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |
`authConfig` | [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig) |
`inputKeys` | string[] |

**Returns:** *void*

___

###  checkAuthRulesForSelections

▸ **checkAuthRulesForSelections**(`context`: GraphbackContext, `authConfig`: [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig), `selectedFields?`: string[]): *void*

*Defined in [packages/graphback-keycloak-authz/src/utils.ts:36](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/utils.ts#L36)*

Checks if user is allowed to request particular field

**Parameters:**

Name | Type |
------ | ------ |
`context` | GraphbackContext |
`authConfig` | [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig) |
`selectedFields?` | string[] |

**Returns:** *void*

___

###  getEmptyServiceConfig

▸ **getEmptyServiceConfig**(): *[CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig)*

*Defined in [packages/graphback-keycloak-authz/src/utils.ts:8](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/utils.ts#L8)*

**Returns:** *[CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig)*
