---
id: "_util_parseannotationscompat_"
title: "util/parseAnnotationsCompat"
sidebar_label: "util/parseAnnotationsCompat"
---

## Index

### Functions

* [parseAnnotationsCompat](_util_parseannotationscompat_.md#parseannotationscompat)

## Functions

###  parseAnnotationsCompat

▸ **parseAnnotationsCompat**(`namespace`: string, `description`: string): *any*

*Defined in [util/parseAnnotationsCompat.ts:17](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/util/parseAnnotationsCompat.ts#L17)*

Wraps `parseMetadata` to return empty object instead of undefined if no annotation is found.

This is a compatibility function to ensure an empty object is r
returned when there is no annotationn as graphql-migrations assumes an empty object will be
returned and does not do any conditional checking for undefined annotation. This is because
`parseAnnotations` (deprecated) from grapqhl-metadata returns an empty object, but parseMetadata
returns undefined.

Do not use this for new features

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`namespace` | string | - |
`description` | string |   |

**Returns:** *any*
