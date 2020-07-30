---
id: "_keycloakcrudservice_.keycloakcrudservice"
title: "KeycloakCrudService"
sidebar_label: "KeycloakCrudService"
---

This custom CRUD Service shows another potential way to add auth

This is actually quite nice and clean but it does not allow for field level auth.
It's still a possibility that we could go with though!

## Type parameters

▪ **Type**

## Hierarchy

* GraphbackProxyService‹Type›

  ↳ **KeycloakCrudService**

## Implements

* GraphbackCRUDService‹Type›

## Index

### Constructors

* [constructor](_keycloakcrudservice_.keycloakcrudservice.md#constructor)

### Properties

* [authConfig](_keycloakcrudservice_.keycloakcrudservice.md#private-authconfig)
* [proxiedService](_keycloakcrudservice_.keycloakcrudservice.md#protected-proxiedservice)

### Methods

* [batchLoadData](_keycloakcrudservice_.keycloakcrudservice.md#batchloaddata)
* [checkAuthRulesForInput](_keycloakcrudservice_.keycloakcrudservice.md#private-checkauthrulesforinput)
* [checkAuthRulesForSelections](_keycloakcrudservice_.keycloakcrudservice.md#private-checkauthrulesforselections)
* [create](_keycloakcrudservice_.keycloakcrudservice.md#create)
* [delete](_keycloakcrudservice_.keycloakcrudservice.md#delete)
* [findBy](_keycloakcrudservice_.keycloakcrudservice.md#findby)
* [findOne](_keycloakcrudservice_.keycloakcrudservice.md#findone)
* [subscribeToCreate](_keycloakcrudservice_.keycloakcrudservice.md#subscribetocreate)
* [subscribeToDelete](_keycloakcrudservice_.keycloakcrudservice.md#subscribetodelete)
* [subscribeToUpdate](_keycloakcrudservice_.keycloakcrudservice.md#subscribetoupdate)
* [update](_keycloakcrudservice_.keycloakcrudservice.md#update)

## Constructors

###  constructor

\+ **new KeycloakCrudService**(`__namedParameters`: object): *[KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md)*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L31)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`authConfig` | object |
`service` | GraphbackCRUDService‹any, any› |

**Returns:** *[KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md)*

## Properties

### `Private` authConfig

• **authConfig**: *[CrudServiceAuthConfig](../modules/_keycloakconfig_.md#crudserviceauthconfig)*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L31)*

___

### `Protected` proxiedService

• **proxiedService**: *GraphbackCRUDService*

*Inherited from [KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md).[proxiedService](_keycloakcrudservice_.keycloakcrudservice.md#protected-proxiedservice)*

Defined in packages/graphback-core/types/runtime/GraphbackProxyService.d.ts:11

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: any, `context`: GraphbackContext | KeycloakContext | any): *any*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:141](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | any |
`context` | GraphbackContext &#124; KeycloakContext &#124; any |

**Returns:** *any*

___

### `Private` checkAuthRulesForInput

▸ **checkAuthRulesForInput**(`context`: any, `inputKeys`: string[]): *void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:155](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L155)*

Checks if user is allowed to create/update particular field

**Parameters:**

Name | Type |
------ | ------ |
`context` | any |
`inputKeys` | string[] |

**Returns:** *void*

___

### `Private` checkAuthRulesForSelections

▸ **checkAuthRulesForSelections**(`context`: any): *void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:171](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L171)*

Checks if user is allowed to request particular field

**Parameters:**

Name | Type |
------ | ------ |
`context` | any |

**Returns:** *void*

___

###  create

▸ **create**(`data`: Type, `context`: GraphbackContext | KeycloakContext | any): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:38](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext &#124; KeycloakContext &#124; any |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context`: GraphbackContext | KeycloakContext | any): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:63](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext &#124; KeycloakContext &#124; any |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`filter`: QueryFilter‹Type›, `context`: GraphbackContext | KeycloakContext | any | any, `page?`: GraphbackPage, `orderBy?`: GraphbackOrderBy): *Promise‹ResultList‹Type››*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:87](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | QueryFilter‹Type› |
`context` | GraphbackContext &#124; KeycloakContext &#124; any &#124; any |
`page?` | GraphbackPage |
`orderBy?` | GraphbackOrderBy |

**Returns:** *Promise‹ResultList‹Type››*

___

###  findOne

▸ **findOne**(`args`: any, `context`: GraphbackContext | KeycloakContext | any): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:74](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`context` | GraphbackContext &#124; KeycloakContext &#124; any |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:108](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:130](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: any, `context?`: any): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:119](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | any |
`context?` | any |

**Returns:** *AsyncIterator‹Type›*

___

###  update

▸ **update**(`data`: Type, `context`: GraphbackContext | KeycloakContext | any): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:51](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context` | GraphbackContext &#124; KeycloakContext &#124; any |

**Returns:** *Promise‹Type›*
