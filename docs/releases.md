---
id: releases
title: Releases
---

## What's new in Graphback

This file contains changes and migration steps for the Graphback project. 
Please follow individual releases for more information.

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
```

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
