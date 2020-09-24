---
id: "_migrate_"
title: "migrate"
sidebar_label: "migrate"
---

## Index

### Interfaces

* [MigrateOptions](../interfaces/_migrate_.migrateoptions.md)

### Functions

* [migrateDB](_migrate_.md#migratedb)

### Object literals

* [defaultOptions](_migrate_.md#const-defaultoptions)

## Functions

###  migrateDB

▸ **migrateDB**(`config`: Config, `schema`: GraphQLSchema | string, `options`: [MigrateOptions](../interfaces/_migrate_.migrateoptions.md)): *Promise‹[MigrationResults](../interfaces/_diff_operation_.migrationresults.md)›*

*Defined in [migrate.ts:69](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L69)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`config` | Config | - |
`schema` | GraphQLSchema &#124; string | - |
`options` | [MigrateOptions](../interfaces/_migrate_.migrateoptions.md) | {} |

**Returns:** *Promise‹[MigrationResults](../interfaces/_diff_operation_.migrationresults.md)›*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [migrate.ts:57](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L57)*

###  dbColumnPrefix

• **dbColumnPrefix**: *string* = ""

*Defined in [migrate.ts:60](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L60)*

###  dbSchemaName

• **dbSchemaName**: *string* = "public"

*Defined in [migrate.ts:58](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L58)*

###  dbTablePrefix

• **dbTablePrefix**: *string* = ""

*Defined in [migrate.ts:59](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L59)*

###  debug

• **debug**: *false* = false

*Defined in [migrate.ts:65](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L65)*

###  mapListToJson

• **mapListToJson**: *true* = true

*Defined in [migrate.ts:63](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L63)*

###  plugins

• **plugins**: *undefined[]* = []

*Defined in [migrate.ts:64](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L64)*

###  removeDirectivesFromSchema

• **removeDirectivesFromSchema**: *true* = true

*Defined in [migrate.ts:66](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L66)*

###  scalarMap

• **scalarMap**: *undefined* = undefined

*Defined in [migrate.ts:62](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L62)*

###  updateComments

• **updateComments**: *false* = false

*Defined in [migrate.ts:61](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/migrate.ts#L61)*
