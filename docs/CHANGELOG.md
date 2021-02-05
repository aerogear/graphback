---
id: releases
title: Release Notes
---

## 1.1.1 (2021-02-06)

#### Bug Fixes

* [#2261](https://github.com/aerogear/graphback/pull/2261) fix: import format was throwing an error ([@craicoverflow](https://github.com/craicoverflow))

## 1.1.0 (2020-10-06)

#### Bug Fixes
* `graphback-codegen-schema`, `graphback-core`, `graphback-datasync`, `graphback-runtime-knex`, `graphql-serve`
  * [#2171](https://github.com/aerogear/graphback/pull/2171) fix(codegen-schema): remove auto primary key from create input ([@craicoverflow](https://github.com/craicoverflow))
* `graphback-codegen-client`
  * [#2139](https://github.com/aerogear/graphback/pull/2139) fix: unable to generate subscription query unless mutation operation in model is set to `true` ([@RinkiyaKeDad](https://github.com/RinkiyaKeDad)
* `codegen-schema`
  * [#2205](https://github.com/aerogear/graphback/pull/2205) fix(codegen-schema): map String list to String list in input type ([@craicoverflow](https://github.com/craicoverflow))

#### Committers: 2
- Arsh Sharma ([@RinkiyaKeDad](https://github.com/RinkiyaKeDad))
- ssd71 [@ssd71](https://github.com/ssd71)
- mudit Choudhary ([@Muditxofficial](https://github.com/Muditxofficial))
- Enda Phelan ([@craicoverflow](https://github.com/craicoverflow)

## 1.0.1 (2020-09-25)

#### Features

* Added ability to override package name in plugin config ([#2077](https://github.com/aerogear/graphback/pull/2077), fixed by [4cfd68c](https://github.com/aerogear/graphback/pull/2077/commits/4cfd68c8b3aeec44df610525686eedd7f1920ecb))

#### Bug Fixes

* Logical `or` filter selector was not mapped correctly in `graphback-runtime-mongo` ([#2034](https://github.com/aerogear/graphback/pull/2034), fixed by [1ebe7e9](https://github.com/aerogear/graphback/pull/2034/commits/1ebe7e9bc8d3a61f0b3ef65b588881d16b7ae63f))
* Logical `or` filter selector was not mapped correctly in `graphback-runtime-knex` ([#2034](https://github.com/aerogear/graphback/pull/2034), fixed by [6d43f28](https://github.com/aerogear/graphback/commit/6d43f288865a2c8c0d441e486a156301ca6cc42a))
* Logical `or` predicate was not applied correctly in `createInMemoryPredicateFilter` ([#2034](https://github.com/aerogear/graphback/pull/2034), fixed by [01f9912](https://github.com/aerogear/graphback/commit/01f99121a9462e5a277657359094ab131e6f809c))
* GraphQL Migrations did not read auto-incrementing info from database column ([#2017](https://github.com/aerogear/graphback/pull/2071), fixed by [83a80cd](https://github.com/aerogear/graphback/commit/83a80cdbb1104da7b36acdfa54b37a871c3ff1a0))
* Prevent creation of empty `Subscription`, `Query`, `Mutation` resolver objects ([#2073](https://github.com/aerogear/graphback/pull/2073), fixed by [97e8267](https://github.com/aerogear/graphback/commit/97e82677257b54783916c3062ed6f0e74f25c038))
* Fix `TypeError: Cannot read property 'page' of undefined` error in CRUDService ([#2095](https://github.com/aerogear/graphback/pull/2095) fixed by [5143fb6](https://github.com/aerogear/graphback/commit/5143fb6c6a76d20f44b3e79ab25c6922408dd54a))
* It was not possible to map a `WHERE X IS/IS NOT NULL` query in the Knex query mapper ([#2095](https://github.com/aerogear/graphback/pull/2095) fixed by [d10e918](https://github.com/aerogear/graphback/commit/d10e918714a85c8c6f6ebb4260e9aff0b6b99ffa))
* Prevent creation of empty `Subscription`, `Query`, `Mutation` resolver objects ([#2073](https://github.com/aerogear/graphback/pull/2073), fixed by [97e826](https://github.com/aerogear/graphback/commit/97e82677257b54783916c3062ed6f0e74f25c038))
* Configure relationship auth rule with field instead of database key ([#2101](https://github.com/aerogear/graphback/pull/2073), fixed by [525bc9a](https://github.com/aerogear/graphback/commit/525bc9a641fa7cb1818a0727a675564e6fa12dda))
* Fix `Could not find a declaration file for module 'bson'` error ([#2104](https://github.com/aerogear/graphback/pull/2104), fixed by [4f9ce7c](https://github.com/aerogear/graphback/commit/4f9ce7c2d6c494b33f447e1b4d6a47fbd880f353))
* Add missing interface ([#2019](https://github.com/aerogear/graphback/pull/2109), fixed by [f46e920](https://github.com/aerogear/graphback/commit/f46e9200def565b0b0e34ccc13f7efa50f346550))
* Generate schema subscription fields when mutations are disabled ([#2114](https://github.com/aerogear/graphback/2114), fixed by [212eb7a](https://github.com/aerogear/graphback/commit/212eb7a3e718eb102c226c237ce2448a2aa26898))
* Don't create `Query`, `Mutation`, `Subscription` empty resolver objects ([#2122](https://github.com/aerogear/graphback/pull/2122), fixed by [faf172d](https://github.com/aerogear/graphback/commit/faf172d0dc30c3533dd5f2377f28ea20762baf02))

### Breaking Changes

* Refactored the Knex Query Mapper ([#2034](https://github.com/aerogear/graphback/pull/2034), fixed by [6d43f28](https://github.com/aerogear/graphback/commit/6d43f288865a2c8c0d441e486a156301ca6cc42a))

## 1.0.0

**INVALID RELEASE**