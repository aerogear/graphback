---
id: releases
title: Releases
---

## What's new in GraphBack

This file contains changes and migration steps for GraphBack project. 
Please follow indidivudal releases for more information.

Note - Graphback is still not ready to be used in production.

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