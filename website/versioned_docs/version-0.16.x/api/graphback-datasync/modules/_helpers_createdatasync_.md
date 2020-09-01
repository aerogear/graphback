---
id: "_helpers_createdatasync_"
title: "helpers/createDataSync"
sidebar_label: "helpers/createDataSync"
---

## Index

### Functions

* [createDataSyncAPI](_helpers_createdatasync_.md#createdatasyncapi)

## Functions

###  createDataSyncAPI

▸ **createDataSyncAPI**(`model`: string | GraphQLSchema, `createDataSyncConfig`: object): *GraphbackAPI*

*Defined in [packages/graphback-datasync/src/helpers/createDataSync.ts:11](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/helpers/createDataSync.ts#L11)*

**Parameters:**

▪ **model**: *string | GraphQLSchema*

▪ **createDataSyncConfig**: *object*

Name | Type |
------ | ------ |
`conflictConfig?` | [GlobalConflictConfig](../interfaces/_util_.globalconflictconfig.md) |
`db` | Db |
`graphbackAPIConfig?` | DataSyncGraphbackAPIConfig |

**Returns:** *GraphbackAPI*
