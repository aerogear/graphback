---
id: "_createkeycloakcrudservice_"
title: "createKeycloakCRUDService"
sidebar_label: "createKeycloakCRUDService"
---

## Index

### Functions

* [createKeycloakCRUDService](_createkeycloakcrudservice_.md#createkeycloakcrudservice)

## Functions

###  createKeycloakCRUDService

▸ **createKeycloakCRUDService**(`authConfigList`: [CrudServicesAuthConfig](_keycloakconfig_.md#crudservicesauthconfig), `serviceCreator`: ServiceCreator): *(Anonymous function)*

*Defined in [packages/graphback-keycloak-authz/src/createKeycloakCRUDService.ts:12](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-keycloak-authz/src/createKeycloakCRUDService.ts#L12)*

Creates a new KeycloakCrudService by wrapping original service.
This method can work with both CRUDService (default) and DataSyncService

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`authConfigList` | [CrudServicesAuthConfig](_keycloakconfig_.md#crudservicesauthconfig) | - |
`serviceCreator` | ServiceCreator | function that creates wrapper service  |

**Returns:** *(Anonymous function)*
