---
id: releases
title: Releases
---

## What's new in GraphBack

This file contains changes and migration steps for GraphBack project. 
Please follow indidivudal releases for more information.

## 0.7.0 (12th August, 2019)
### Graphback
#### Features
- Added new `@disableGen` directive that allows user to disable CRUD operation for 
single type

### Templates
#### Features
- Added new GraphQL-js starter template, that uses GraphQL.js library.

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
for all resolver types that need to generated. Please refer to documentation for more information
- Added ability for custom Queries/Mutations/Subscriptions. Users can generate empty  resolver stubs for their implementation.

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
