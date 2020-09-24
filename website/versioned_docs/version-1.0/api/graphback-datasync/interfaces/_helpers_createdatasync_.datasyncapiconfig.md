---
id: "_helpers_createdatasync_.datasyncapiconfig"
title: "DataSyncAPIConfig"
sidebar_label: "DataSyncAPIConfig"
---

Config to create a Graphback DataSync API

## Hierarchy

* **DataSyncAPIConfig**

## Index

### Properties

* [conflictConfig](_helpers_createdatasync_.datasyncapiconfig.md#optional-conflictconfig)
* [db](_helpers_createdatasync_.datasyncapiconfig.md#db)
* [graphbackAPIConfig](_helpers_createdatasync_.datasyncapiconfig.md#optional-graphbackapiconfig)

## Properties

### `Optional` conflictConfig

• **conflictConfig**? : *[GlobalConflictConfig](_util_.globalconflictconfig.md)*

*Defined in [packages/graphback-datasync/src/helpers/createDataSync.ts:22](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/helpers/createDataSync.ts#L22)*

Conflict configmap for the data models

___

###  db

• **db**: *Db*

*Defined in [packages/graphback-datasync/src/helpers/createDataSync.ts:18](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/helpers/createDataSync.ts#L18)*

MongoDB driver

___

### `Optional` graphbackAPIConfig

• **graphbackAPIConfig**? : *DataSyncGraphbackAPIConfig*

*Defined in [packages/graphback-datasync/src/helpers/createDataSync.ts:26](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/helpers/createDataSync.ts#L26)*

GraphbackAPI config
