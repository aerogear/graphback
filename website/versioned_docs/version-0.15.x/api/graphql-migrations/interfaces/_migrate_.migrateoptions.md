---
id: "_migrate_.migrateoptions"
title: "MigrateOptions"
sidebar_label: "MigrateOptions"
---

## Hierarchy

* **MigrateOptions**

## Index

### Properties

* [dbColumnPrefix](_migrate_.migrateoptions.md#optional-dbcolumnprefix)
* [dbSchemaName](_migrate_.migrateoptions.md#optional-dbschemaname)
* [dbTablePrefix](_migrate_.migrateoptions.md#optional-dbtableprefix)
* [debug](_migrate_.migrateoptions.md#optional-debug)
* [mapListToJson](_migrate_.migrateoptions.md#optional-maplisttojson)
* [operationFilter](_migrate_.migrateoptions.md#optional-operationfilter)
* [plugins](_migrate_.migrateoptions.md#optional-plugins)
* [removeDirectivesFromSchema](_migrate_.migrateoptions.md#optional-removedirectivesfromschema)
* [scalarMap](_migrate_.migrateoptions.md#optional-scalarmap)
* [updateComments](_migrate_.migrateoptions.md#optional-updatecomments)

## Properties

### `Optional` dbColumnPrefix

• **dbColumnPrefix**? : *string*

*Defined in [migrate.ts:23](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L23)*

Column name prefix: `<prefix><columnName>`.

___

### `Optional` dbSchemaName

• **dbSchemaName**? : *string*

*Defined in [migrate.ts:15](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L15)*

Table schema: `<schemaName>.<tableName>`.

___

### `Optional` dbTablePrefix

• **dbTablePrefix**? : *string*

*Defined in [migrate.ts:19](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L19)*

Table name prefix: `<prefix><tableName>`.

___

### `Optional` debug

• **debug**? : *boolean*

*Defined in [migrate.ts:43](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L43)*

Display debug information

___

### `Optional` mapListToJson

• **mapListToJson**? : *boolean*

*Defined in [migrate.ts:35](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L35)*

Map scalar/enum lists to json column type by default.

___

### `Optional` operationFilter

• **operationFilter**? : *[MigrateOperationFilter](_plugin_migrateoperationfilter_.migrateoperationfilter.md)*

*Defined in [migrate.ts:54](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L54)*

Method that can be used to filter out operations that we do not want to execute.
For example if we want to prevent deletion of the tables filter can remove `table.drop` operations
from array

___

### `Optional` plugins

• **plugins**? : *[MigratePlugin](_plugin_migrateplugin_.migrateplugin.md)[]*

*Defined in [migrate.ts:39](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L39)*

List of graphql-migrations plugins

___

### `Optional` removeDirectivesFromSchema

• **removeDirectivesFromSchema**? : *boolean*

*Defined in [migrate.ts:47](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L47)*

Remove directives from the GraphQLSchema

___

### `Optional` scalarMap

• **scalarMap**? : *[ScalarMap](../modules/_abstract_generateabstractdatabase_.md#scalarmap) | undefined*

*Defined in [migrate.ts:31](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L31)*

Custom Scalar mapping

___

### `Optional` updateComments

• **updateComments**? : *boolean*

*Defined in [migrate.ts:27](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphql-migrations/src/migrate.ts#L27)*

Overwrite table and column comments (not supported in some databases).
