---
id: "_keycloakconfig_"
title: "KeycloakConfig"
sidebar_label: "KeycloakConfig"
---

## Index

### Type aliases

* [AuthFilter](_keycloakconfig_.md#authfilter)
* [CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)
* [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig)
* [CrudServicesAuthConfig](_keycloakconfig_.md#crudservicesauthconfig)

## Type aliases

###  AuthFilter

Ƭ **AuthFilter**: *function*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakConfig.ts:66](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/KeycloakConfig.ts#L66)*

**`param`** filter object that can be extended to add extra query

**`param`** profile information hidden in token (req.kauth.grant.access_token.content)

**`returns`** filter - new filter field for your specific database

#### Type declaration:

▸ (`filter`: any, `profileInfo`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`filter` | any |
`profileInfo` | any |

___

###  CrudOperationAuthConfig

Ƭ **CrudOperationAuthConfig**: *object*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakConfig.ts:68](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/KeycloakConfig.ts#L68)*

#### Type declaration:

* **roles**: *string[]*

___

###  CrudServiceAuthConfig

Ƭ **CrudServiceAuthConfig**: *object*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakConfig.ts:5](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/KeycloakConfig.ts#L5)*

Operations supported by RBAC config

#### Type declaration:

* **create**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **delete**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **filterUsingAuthInfo**? : *[AuthFilter](_keycloakconfig_.md#authfilter)*

* **read**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **relations**(): *object*

* **returnFields**(): *object*

* **subCreate**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **subDelete**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **subUpdate**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **update**? : *[CrudOperationAuthConfig](_keycloakconfig_.md#crudoperationauthconfig)*

* **updateFields**(): *object*

___

###  CrudServicesAuthConfig

Ƭ **CrudServicesAuthConfig**: *object*

*Defined in [packages/graphback-keycloak-authz/src/KeycloakConfig.ts:72](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-keycloak-authz/src/KeycloakConfig.ts#L72)*

#### Type declaration:

* \[ **key**: *string*\]: [CrudServiceAuthConfig](_keycloakconfig_.md#crudserviceauthconfig)
