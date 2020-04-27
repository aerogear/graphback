---

title: Releases
id: releases
---

## What's new in Graphback

This file contains changes and migration steps for Graphback project. 
Please follow indidividual releases for more information.

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
