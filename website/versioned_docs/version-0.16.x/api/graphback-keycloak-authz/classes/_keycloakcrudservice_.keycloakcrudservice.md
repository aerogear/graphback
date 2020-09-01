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
* [model](_keycloakcrudservice_.keycloakcrudservice.md#private-model)
* [proxiedService](_keycloakcrudservice_.keycloakcrudservice.md#protected-proxiedservice)

### Methods

* [batchLoadData](_keycloakcrudservice_.keycloakcrudservice.md#batchloaddata)
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

\+ **new KeycloakCrudService**(`model`: ModelDefinition, `__namedParameters`: object): *[KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md)*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:38](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L38)*

**Parameters:**

▪ **model**: *ModelDefinition*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`authConfig` | [CrudServiceAuthConfig](../modules/_keycloakconfig_.md#crudserviceauthconfig) |
`service` | GraphbackCRUDService‹any, any› |

**Returns:** *[KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md)*

## Properties

### `Private` authConfig

• **authConfig**: *[CrudServiceAuthConfig](../modules/_keycloakconfig_.md#crudserviceauthconfig)*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:37](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L37)*

___

### `Private` model

• **model**: *ModelDefinition*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:38](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L38)*

___

### `Protected` proxiedService

• **proxiedService**: *GraphbackCRUDService*

*Inherited from [KeycloakCrudService](_keycloakcrudservice_.keycloakcrudservice.md).[proxiedService](_keycloakcrudservice_.keycloakcrudservice.md#protected-proxiedservice)*

Defined in packages/graphback-core/types/runtime/GraphbackProxyService.d.ts:12

## Methods

###  batchLoadData

▸ **batchLoadData**(`relationField`: string, `id`: string | number, `filter`: QueryFilter, `context`: GraphbackContext, `info?`: GraphQLResolveInfo): *any*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:160](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`relationField` | string |
`id` | string &#124; number |
`filter` | QueryFilter |
`context` | GraphbackContext |
`info?` | GraphQLResolveInfo |

**Returns:** *any*

___

###  create

▸ **create**(`data`: Type, `context?`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:46](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  delete

▸ **delete**(`data`: Type, `context?`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:72](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  findBy

▸ **findBy**(`args`: FindByArgs, `context?`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) | any, `info?`: GraphQLResolveInfo, `path?`: string): *Promise‹ResultList‹Type››*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:101](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | FindByArgs |
`context?` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) &#124; any |
`info?` | GraphQLResolveInfo |
`path?` | string |

**Returns:** *Promise‹ResultList‹Type››*

___

###  findOne

▸ **findOne**(`args`: any, `context`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:83](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`context` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*

___

###  subscribeToCreate

▸ **subscribeToCreate**(`filter?`: QueryFilter, `context?`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md)): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:127](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |
`context?` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToDelete

▸ **subscribeToDelete**(`filter?`: QueryFilter, `context?`: GraphbackContext): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:149](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |
`context?` | GraphbackContext |

**Returns:** *AsyncIterator‹Type›*

___

###  subscribeToUpdate

▸ **subscribeToUpdate**(`filter?`: QueryFilter, `context?`: GraphbackContext): *AsyncIterator‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:138](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`filter?` | QueryFilter |
`context?` | GraphbackContext |

**Returns:** *AsyncIterator‹Type›*

___

###  update

▸ **update**(`data`: Type, `context?`: [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md), `info?`: GraphQLResolveInfo): *Promise‹Type›*

*Overrides void*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakCrudService.ts:59](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/KeycloakCrudService.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Type |
`context?` | [GraphbackKeycloakContext](../interfaces/_keycloakcrudservice_.graphbackkeycloakcontext.md) |
`info?` | GraphQLResolveInfo |

**Returns:** *Promise‹Type›*
