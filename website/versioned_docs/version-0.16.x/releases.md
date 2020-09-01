---
id: releases
title: Release Notes
---

## What's new in Graphback

This file contains changes and migration steps for the Graphback project. 
Please follow individual releases for more information.

# 0.16.0

### New Features

* Use any `knex` 0.20.x or 0.21.x version in your application ([d826b6f](https://github.com/aerogear/graphback/commit/d826b6fcb3ffb753140f5135d53c56c032cb2503)[#1903](https://github.com/aerogear/graphback/pull/1903))

* Ability to specify composite unique columns in GraphQL Migrations ([#1658](https://github.com/aerogear/graphback/issues/1658)), fixed by ([9c6f34a231e2645c34533d58ea4427ff8f8f634e](https://github.com/aerogear/graphback/commit/9c6f34a231e2645c34533d58ea4427ff8f8f634e))

* Requiring `_id: GraphbackObjectID` primary key for MongoDB ([#1769](https://github.com/aerogear/graphback/pull/1769)). 
  This fixes issues below related to primary key in MongoDB:
  - [#1731](https://github.com/aerogear/graphback/issues/1732), [#1626](https://github.com/aerogear/graphback/issues/1626) Ineffecient and wrong mapping of the `id` field
  - [#1625](https://github.com/aerogear/graphback/issues/1625) Filters on "id: ID" field not working
  
  > NOTE: If you are migrating from [0.15](#0150) or previous versions of Graphback, you may be required to update relationship fields so that their values (previous stored as `String`) are of type [`ObjectID`](https://docs.mongodb.com/manual/reference/method/ObjectId/).

* Add a `@transient` field annotation to ignore fields during input type creation and migrations [4076fa26](https://github.com/aerogear/graphback/commit/4076fa26ae9b770d5c38d6b21ebf8251578643b7)
  
#### DataSync

* Using a `_lastUpdatedAt` field with a proper `GraphbackTimestamp` scalar and other minor fixes ([#1771](https://github.com/aerogear/graphback/pull/1771)) including:

  - disabling conflicts in default configuration
  - adding a `limit` argument to `sync` Queries


### Bug Fixes

* Failure to map enum values in field directives ([#1767](https://github.com/aerogear/graphback/issues/1462)), fixed by ([a9ca21e1405dba14dab249af2f8d146ac2306803](https://github.com/aerogear/graphback/commit/a9ca21e1405dba14dab249af2f8d146ac2306803))

* invalid input syntax for type timestamp: "null" ([#1837](https://github.com/aerogear/graphback/issues/1837)), fixed by ([37cdc1d12410a1fafb27877b97b54ea308acecb1](https://github.com/aerogear/graphback/commit/37cdc1d12410a1fafb27877b97b54ea308acecb1))

* Do not remove directives on Object Types in generated schema ([#1767](https://github.com/aerogear/graphback/issues/1767)), fixed by ([22c7a1da62e2752a21db4e4552e970aa93ba37ae](https://github.com/aerogear/graphback/pull/1810/commits/22c7a1da62e2752a21db4e4552e970aa93ba37ae))

* Do not silently overrides createdAt/updatedAt custom fields when model contains @versioned annotation [#1597](https://github.com/aerogear/graphback/issues/1597) 

### Breaking Changes

* Use `GraphbackDateTime` scalar for generated createdAt updatedAt fields ([#1349](https://github.com/aerogear/graphback/issues/1349), fixed by [#1862](https://github.com/aerogear/graphback/pull/1862)) 

#### Disable filter input generation for unknown custom scalars

Graphback disabled generation of unknown custom scalars, except for `Timestamp`, `Time`, `Date`, `DateTime`, as we cannot reliably support scalars we do not know.

See [Graphback Scalars](https://graphback.dev/docs/model/scalars/) for the list of officially supported scalars.

* Replace `@db(skip: true)` field annotation with `@transient` [85d50f3c](https://github.com/aerogear/graphback/commit/85d50f3c332ee35c46fbe8e6c3e81d97ae60db7b)

#### Changed GraphbackCRUDService `findBy` method signature. This also applies to all services that implement this interface.

```patch
- findBy(filter: QueryFilter<Type>, context: GraphbackContext, page?: GraphbackPage, orderBy?: any): Promise<ResultList<Type>>;
+ findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>>;
```

**args**

`findBy` now accepts a new interface, `FindByArgs`, which wraps the `filter`, `page` and `orderBy` optional arguments.

```ts
await noteService.findBy({
  filter: {
    id: {
      gt: 100
    }
  },
  page: {
    offset: 0,
    limit: 10
  },
  orderBy: {
    field: 'id'
  }
})
```

**context (optional)**

The context parameter is now optional.

**info**

You can now optionally pass the `GraphQLResolveInfo` info object to the CRUD service, to perform extra optimizations like retrieving only the selected fields from the query.

```ts
await noteService.findBy(filter, context, info);
```

**path (optional)**

The root path of the query to get the selected fields from. For example, to get `id`, `title`, `description` fields from the following query, you would set the path to `items`.

```graphql
query findNotes {
  findNotes {
    items {
      id
      title
      description
    }
  }
} 
```

The path variable is optional, as it will automatically resolve to the root field of the entire query.

#### `context` parameter removed from `subscribeToCreate`, `subscribeToDelete`, `subscribeToUpdate` methods in GraphbackCRUDService.

This method was unused.

#### Removed `context` parameter from all GraphbackDataProvider methods. This also applies to all providers that implement this interface.

All CRUD methods in `GraphbackDataProvider` had a `context` parameter used to get the selected fields. 
These have been replaced with (optional) `selectedFields` - you can pass a string array of the fields you want to select from the database.

```ts
await noteProvider.findBy(filter, ['id', 'name']);
```

#### Changed GraphbackDataProvider `findBy` method signature. This also applies to all providers that implement this interface.

**args**

`findBy` now accepts a new interface, `FindByArgs`, which wraps the `filter`, `page` and `orderBy` optional arguments.

```ts
await noteService.findBy({
  filter: {
    id: {
      gt: 100
    }
  },
  page: {
    offset: 0,
    limit: 10
  },
  orderBy: {
    field: 'id'
  }
})
```

#### Remove resolver options from GraphbackContext

Resolver options (`context.graphback.options`) was removed from the context because the `count` aggregation and `selectedFields` extraction logic was moved to the CRUDService method.

### Removed graphback key from GraphbackContext

The `graphback.services` property has been removed from `GraphbackContext`, and `graphback` is now the service map property.

```patch
export interface GraphbackContext {
-  graphback: {
-    graphback: GraphbackServiceConfigMap
-  }
+  graphback: GraphbackServiceConfigMap
}
```

Now you can reach the Graphback service map by calling `context.graphback.Note.findBy(...)`.

#### CRUDService, DataSyncCRUDService now accepts a `ModelDefinition` as the first constructor parameter.

To instantiate a CRUDService you must pass the full `ModelDefinition` instead of the model name.

```ts
const myService = new CRUDService(modelDefinition, ...);
```

#### KeycloakCrudService now accepts a `ModelDefinition` as the first constructor parameter.

To instantiate a CRUDService you must pass the full `ModelDefinition` instead of the model name.

```ts
const myService = new KeycloakCrudService(modelDefinition, ...);
```

#### DataSyncProvider `sync` method signature has been changed

```patch
- sync(lastSync: Date, context: GraphbackContext, filter?: any, limit?: number): Promise<Type[]>;
+ sync(lastSync: Date, selectedFields?: string[], filter?: QueryFilter, limit?: number): Promise<Type[]>;
```

The `context` argument has been replaced with (optional) `selectedFields`.

#### `context` parameter is removed from the `create` method in `MongoDBDataProvider` and `DatasyncMongoDBDataProvider` providers.

This parameter did not do anything.

# 0.15.1

### Bug Fixes

* ensure field directives are mapped to the schema on relationship fields ([#1797](https://github.com/aerogear/graphback/pull/1797)) ([e8bf5c8](https://github.com/aerogear/graphback/commit/e8bf5c80633e51c3c9365a92f4f1ae6271ed6d2c))

# 0.15.0

#### New Features

* add in-memory subscription filtering ([#1748](https://github.com/aerogear/graphback/pull/1748)
* add support for common scalar types ([#1749](https://github.com/aerogear/graphback/pull/1749))

### Bug Fixes

* `create-graphback` was not correctly creating a fullstack application ([#1778](https://github.com/aerogear/graphback/pull/1778)) ([685aa4c](https://github.com/aerogear/graphback/commit/685aa4c8a359111d87a5e54079ee4be2922be5f6))
* throw an error if relationship annotation are missing ([#1766](https://github.com/aerogear/graphback/pull/1766)). This fixes [#1604](https://github.com/aerogear/graphback/issues/1604) where when no relationship annotation is defined, invalid input fields are added to input type.
   
# 0.14.1

### Bug Fixes

* allow model field on non-model types ([#1e64b3eb](https://github.com/aerogear/graphback/pull/1753)) ([2756b29a](https://github.com/aerogear/graphback/commit/1e64b3eb2a155d87091cffca206f2dbf3280a413))

# 0.14.0

## Migrating to 0.14.0

### Breaking Changes

Graphback 0.14 contains a lot of breaking changes that will improve and simplify your application code.

#### CRUD Mutation return types are nullable

Previously, the CRUD mutation resolvers did not allow returning null. These can now be null.

```patch
- createNote(input: CreateNoteInput!): Note!
+ createNote(input: CreateNoteInput!): Note
```

#### Changed annotation syntax

All annotations now use a uniform syntax format: `@annotation(foo 'bar')` that is similar to GraphQL Directives

Examples:

```
@oneToMany field: 'note'
```

becomes: 

```
@oneToMany(field: 'note')
```

```
@db.type: 'timestamp'
```

becomes:

```
@db(type: 'timestamp')
```

#### Removed `@crud` annotation

The `@crud` model annotation has been removed. To specify CRUD configuration on your model use the `@model` annotation.

```
"""
@model
@crud.delete: false
@crud.update: true
"""
```

becomes:

```
"""
@model(delete: false, update: true)
"""
```

### @graphback/runtime package is removed

Runtime package should no longer be used in top level API.
All functionalities were moved to the @graphback/core package.

> NOTE: Users should never have runtime or core packages imported in their 
applications and interact with graphback package as aggregator

#### API code generation is no longer supported

In 0.14.0 Graphback now supports runtime generation of your schema, resolvers and services. 

Please manually remove your generated schema and resolver files.

Remove `@graphback/codegen-resolvers` from your `package.json`.

To use our runtime API, refer to the [Runtime API](./intro/serverless) documentation.

#### New runtime API

We have removed the complicated multi-step runtime API so that you can create your Graphback API in a couple of lines.

If you were already using the runtime API, replace this:

```ts
const runtimeEngine = new GraphbackRuntime(model, graphbackConfig);
const models = runtimeEngine.getDataSourceModels();
const services = createKnexPGCRUDRuntimeServices(models, model, db, pubSub);
const runtime = runtimeEngine.buildRuntime(services);
```

With this:

```ts
import { buildGraphbackAPI } from 'graphback'
import { createKnexDbProvider, createCRUDService } from '@graphback/runtime-knex'
import { PubSub } from 'graphql-subscriptions'

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  serviceCreator: createCRUDService({
    pubSub: new PubSub()
  }),
  dataProviderCreator: createKnexDbProvider(dbConfig)
});
```

For more advanced usage, refer to the [Runtime API](./intro/serverless) documentation.

#### Client code generation now generates all GraphQL documents into one file

1. Replace `outputPath` with `outputFile` in your client config 
2. Delete previously generated client documents and rerun generate command
3. Be sure to correct your documents path in your codegen config if you use GraphQL-Code-Generator

#### `@db.primary` is removed, use `@id` instead

We have replaced the `@db.primary` annotation with `@id`.

#### `@db.default` is removed, use `@default` instead

We have replaced the `@db.default` annotation with `@default`.
Now you can provide default values like this:
```
"""
@default(value: 'default value')
"""
```

instead of 
```
"""
@db.default 'default value'
"""
```

#### Removed `graphback db` CLI command to migrate database

We have removed the `graphback db` command. Database migrations can be only executed from the codebase when application is started.

See [Database Migrations](./db/migrations#API) on how to use the code-based migrations in your API.


#### Removed `graphback init` CLI command

We have removed the `graphback init` command, this has been replaced by a newly added micro-cli `create-graphback`. 

#### Removed helper method to create CRUD services

Previously you would have done this to create your context and a CRUD service for every model:

```ts
const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub)
```

Now you can create your services and data providers with like this:

```ts
import { buildGraphbackAPI } from 'graphback'
import { createKnexDbProvider, createCRUDService } from '@graphback/runtime-knex'
import { PubSub } from 'graphql-subscriptions'

const { typeDefs, resolvers, services } = buildGraphbackAPI(modelDefs, {
  serviceCreator: createCRUDService({
    pubSub: new PubSub()
  }),
  dataProviderCreator: createKnexDbProvider(dbConfig)
});
```

For more advanced usage, refer to the [Runtime API](./intro/serverless) documentation.

#### Removed `graphback openapi` CLI command.

We have removed the `graphback openapi` CLI command, but you can still use [OpenAPI-to-GraphQL](https://github.com/IBM/openapi-to-graphql) to create a GraphQL schema from your OpenAPI specification.

#### `graphl-config` is not supported in `graphql-serve`

To use `graphql-serve` now you must use a model file:

```bash
gqlserve serve ./path/to/models/*.graphql --port 8080
```

#### SchemaCRUDPlugin only has a single configuration option

We have removed the `fileName` and `format` options from `SchemaCRUDPlugin`. These can be inferred from the `outputPath`:

```ts
const schemaPlugin = new SchemaCRUDPlugin({
  outputPath: './path/to/my/schema.js'
});
```

### Remove `format` option from ClientCRUDPlugin

The format option has been removed as you can specify the file extension in `outputFile`.

### Deprecated

- `PgKnexDBDataProvider` has been deprecated in favour of `KnexDBDataProvider`.

##### New Features

- All client documents are now generated in a single file. The file's path is specified by the `outputFile` field in client config
- `outputPath` in client config has been removed
- Added new templates to graphback init commands. All templates now giving ability to add client side application.
- Added a new, simpler runtime API
- GraphbackPluginEngine accepts now object instead of arguments.
`new GraphbackPluginEngine({schema})`
- Provide full path to schema in the `SchemaCRUDPlugin` config option `outputPath`
- Support relationships with non-model GraphQL types.
- Create a new Graphback project using `create-graphback`

# 0.13.0

Invalid release

# 0.12.0

##### New Features

* Add fragment only mode ([c1297e21](https://github.com/aerogear/graphback/commit/c1297e21a482f7db2e3c987b7623e5fd5cd1fe03)) 
* **cli:**  add mongodb template option ([ce304da8](https://github.com/aerogear/graphback/commit/ce304da808aa8302d8e8f778a2ac9f18ace31ab3))
*  add mongo-runtime template ([6b313bf8](https://github.com/aerogear/graphback/commit/6b313bf8c2e96d433cfd48cb5d918ef9b1f5b660))

##### Bug Fixes

*  Print schema with directives ([#1147](https://github.com/aerogear/graphback/pull/1147)) ([2c72ddb0](https://github.com/aerogear/graphback/commit/2c72ddb03058a6b5c478fe28067325aebd172d5e))
*  Mongo batching for types ([7ea4b6d4](https://github.com/aerogear/graphback/commit/7ea4b6d4297ce6764496095acb937209c3395989))
*  Mongo batching with string as key ([#1130](https://github.com/aerogear/graphback/pull/1130)) ([e49d03a8](https://github.com/aerogear/graphback/commit/e49d03a8d9bde8ce7b33978bc227afa6a9b73f5a))
*  Add additional assign for the crud modifiers ([660d2a53](https://github.com/aerogear/graphback/commit/660d2a53b6ca21debb469122044ad7e29d9720b7))
*  Problem with CRUD config being global ([fc138d27](https://github.com/aerogear/graphback/commit/fc138d27b3b072ca64a34bde61ab935626833589))
*  check for undefined ID value ([34021a20](https://github.com/aerogear/graphback/commit/34021a203ac1f1a44a5bf98547eed64208400b92))
*  throw error when no ID is supplied ([1256f71d](https://github.com/aerogear/graphback/commit/1256f71d26f9486f95fbd5b64f9a879db8e25e9d))
*  accept globs and array of globs for model option in config ([#1067](https://github.com/aerogear/graphback/pull/1067)) ([2756b29a](https://github.com/aerogear/graphback/commit/2756b29adb3696a99b499574299fc9b2f35e0d36))
*  Fix Pagination in Knex Provider ([df469dc8](https://github.com/aerogear/graphback/commit/df469dc8a73e99cc9b3b40b2330c3de7466b6886))
*  Fix pagination in MongoDB provider ([7a8618e0](https://github.com/aerogear/graphback/commit/7a8618e08201769fc397562e6f90192123bec743))
*  Add pagination to findBy queries ([f0b8e1d5](https://github.com/aerogear/graphback/commit/f0b8e1d527c64834d3640dd842a17dc3baa4135b))
*  Update LayeredRuntimeResolverCreator to use pagination in findall ([b1a22846](https://github.com/aerogear/graphback/commit/b1a228466e3f254e4fbf9044d0f2053ef1939866))
*  Update CRUD services to use pagination in findall ([33527825](https://github.com/aerogear/graphback/commit/3352782588761dc6cf00a792673a47572129835e))
* **resolvers:**  export generated code ([eea38a5d](https://github.com/aerogear/graphback/commit/eea38a5df848b310be884039e3e51ac5eb51a81e))

# 0.11.4

##### Bug Fixes

*  don't generate blank model file ([ca29103e](https://github.com/aerogear/graphback/commit/ca29103e236800462bf110775c3f243adc363b44))
*  remove generation of dbmigrations config in `graphback config` ([f0b8ed4](https://github.com/aerogear/graphback/commit/f0b8ed45af536e4157c9a3d2bc74b18369eac488))

# 0.11.1

- Fixed issue where root query type needed to properly created final schema.
- Remove serve from graphback-cli

# 0.11.0

New features:

- [`graphql-serve`](https://github.com/aerogear/graphback/tree/master/packages/graphql-serve) - a fully functional GraphQL server based on Graphback and Apollo Server.
- MongoDB support.
- Pagination support.

Other new features and changes documented in blog post: 
https://medium.com/@wtr/graphback-plugin-based-realtime-database-generator-78f4f608b81e

Breaking changes:

- BREAKING: `@oneToMany` and `@oneToOne` annotations are required to map relationships.
- BREAKING: Configuration format changed from `graphback.json` to `graphqlrc.yml`
- BREAKING: CRUDService api was changed to support per entity model
- BREAKING: CRUDService api was changed to support per entity model
- BREAKING: Runtime API was changed. Graphback package exports now GraphbackRuntime class to create runtime layer.
- BREAKING: @model annotation is required for type to use generation
- BREAKING: Removed GraphbackBackend and related interfaces.

- BREAKING: Removed Production migrations engine

- BREAKING: Removed directives for CRUD operations
Graphback no longer uses GraphQL directives for controling generation of the CRUD operations.
Users should use annotations

```
type Note @delete {
  ...
}
```

now becomes:

```
"""
@crud.delete
"""
type Note @delete {
  ...
}
```

# 0.10.2

### graphql-migrations

It's now possible to create database relationships from the `1:M` side of your data model!

```gql
type User {
  id: ID!
  messages: [Message]
}
```openapi

This creates a `userId` foreign key column in the `message` table. Visit the [relationships documentation](../relationships#OneToMany) for more examples.

# 0.10.1

### Graphback-Codegen-Client

- Generate relationship variables in mutations, fragment, subscriptions, queries.

# 0.10.0

BREAKING changes for CLI/ and runtime.

### Graphback

- Added runtime layer

Runtime layer gives developers ability to run GraphQL server basing on input model 
without code generation. All resolvers are created at runtime giving developers ability to update applications 
on the fly. For more information please check official documentation for runtime layer.

- Deprecating graphback as way to interact with the Graphback ecosystem

Graphback package offers multiple helpers however to fully configure all generators and other capabilities
developers can use individual packages:

```
@graphback/codegen-client
@graphback/codegen-resolvers
@graphback/codegen-schema
@graphback/core
@graphback/runtime
graphql-migrations
```

### GraphQL-Migrations

- Added a new library [`graphql-migrations`](https://github.com/aerogear/graphback/tree/master/packages/graphql-migrations) for executing database migrations.

- `migrateDB` directly compares the input model with the current database and uses the generated diff to update the database structure. This mode does not generate any migration metadata.

- `migrateDBUsingSchema` updates the database by comparing the input model with the previous model. This mode generates migration metadata which is persisted to the local filesystem and to the database.

# 0.9.1

### Templates

Removed REST template from official list of templates

# 0.9.0

### Graphback-cli

#### Breaking changes

Templates rely on `graphback.json` file. Please rename your `config.json` to `graphback.json` and add additional configuration entries

```json
  "folders": {
    "model": "./model",
      "resolvers": "./src/resolvers/",
      "schema":  "./src/schema",
      "client": "./client/src/graphql"

  }
```
### Graphback-CLI
#### Features

- `graphback openapi` command provides a way to migrate OpenAPI definition to GraphQL schema

### Graphback

#### Features

- Support for Interfaces in GraphQL schema
GraphQL Schema now supports interfaces that can be used to ensure consistency of the data.
Example:

```graphql
interface Searchable {
  searchPreviewText: String!
}

interface Item {
  price: Int!
}

type Movie implements Searchable & Item {
  directory: String!
  searchPreviewText: String!
  price: Int!
}
```

> NOTE: Interfaces will not be taken into consideration when generating resolvers and database

## 0.8.3 (29th August, 2019)
### Templates
#### Fixes
- Removed redis-subscriptions and use im-memory graphql-subscriptions instead.

### Graphback-cli
#### Fixes
- Removed redis dependency from docker-compose.

## 0.8.2 (28th August, 2019)
### Graphback-cli
#### Fixes

- Fixed instructions for missing watch command and replaced it with develop
- Fixed issue with not cleaning template and dist folders 
- Disabled the GraphQL-JS template due to invalid resolver format. 

## 0.8.1 (28th August, 2019)
### Graphback
#### Fixes

- Fixed npm release missing template files

## 0.8.0 (28th August, 2019)
### Graphback
#### Features
- Added ability to generate client side queries according to data model.
  
### Graphback-cli
#### Fixes
- Removed dependency from docker when using sqlite3, changed redis subscriptions
to inmemory subscriptions.

### Templates
#### Fixes
- Changed scripts of templates.

## 0.7.2 (20th August, 2019)
### Graphback-cli
#### Fixes
- Removed watch command from cli which caused a lot of bugs.

## 0.7.1 (20th August, 2019)
### Graphback
#### Fixes
- Fixed problem with creating tables for Int type

## 0.7.0 (12th August, 2019)
### Graphback
#### Features
- Added new `@disableGen` directive that allows user to disable CRUD operation for 
single type

### Templates
#### Features
- Added new GraphQL-js starter template, that uses GraphQL.js library.
- Added ability to use custom templates

```
graphback init name --templateUrl=https://github.com/aerogear/modern-appdev-workshop
```

## 0.6.0 (7th August, 2019)

### Graphback-cli
#### Features

- Added support for SQLite database inside CLI
- Added new Tasks model template

#### Fixes

- Configuration in template works now with different databases that are supported by knex library

## 0.5.0 (1st August, 2019)
### Graphback
#### Features
- Added ability to perform CRUD generation based on configuration flags
The generation will now be based on config.json file that will contain properties 
for all resolver types that need to generate. Please refer to the documentation for more information
- Added ability for custom Queries/Mutations/Subscriptions. Users can generate empty resolver stubs for their implementation.

#### Fixes
- Modularized resolver output into separate files(based on types) instead of a single one. Also added custom resolvers.
  
### Graphback-cli
#### Fixes
- Changed resolvers output format from a single resolver file to multiple files. Also added custom resolvers in generate

### Templates
#### Fixes
- Dropped generated folder and change structure for template accordingly. Generated content will be now inside `src` folder instead.


## 0.4.0 (25 July, 2019)
### Templates
#### Features

Added Sofa (https://github.com/Urigo/SOFA/) template that allows generating restful API along with GraphQL one. 

## 0.3.2 (24 July, 2019)
### Graphback
#### Features
- Added relationship support to schema and resolvers.

## 0.3.1 (17 July, 2019)
### Graphback
#### Fixes
- Strict typing in resolvers.
### Templates
#### Fixes
- Added ts config and check compilation.

## 0.3.0 (16 July, 2019)
### Graphback
#### Fixes
- Revamp core to use visitor pattern
- Generate schema with opinionated schema patterns
- Edited resolvers implementations(working)

#### Deprecations
- removed dependency of `graphql-codegen` version `0.18.2`

### Graphback-cli
#### Features
- added `db` and `watch` command
#### Fixes
- added more options in `init` command, to inject config 

## 0.2.0 (12 June, 2019)
### Graphback
#### Features
- Initial `schema` and `resolvers` generation
### Graphback-cli
#### Features
- added `init` and `generate` command
