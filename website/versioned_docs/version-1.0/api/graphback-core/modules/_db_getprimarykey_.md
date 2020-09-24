---
id: "_db_getprimarykey_"
title: "db/getPrimaryKey"
sidebar_label: "db/getPrimaryKey"
---

## Index

### Functions

* [getPrimaryKey](_db_getprimarykey_.md#getprimarykey)

## Functions

###  getPrimaryKey

▸ **getPrimaryKey**(`graphqlType`: GraphQLObjectType): *GraphQLField‹any, any›*

*Defined in [packages/graphback-core/src/db/getPrimaryKey.ts:11](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-core/src/db/getPrimaryKey.ts#L11)*

Returns the primary key field of a GraphQL object.
First looks for the existence of a `@id` field annotation,
otherwise tries to find an `id: ID` field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`graphqlType` | GraphQLObjectType |   |

**Returns:** *GraphQLField‹any, any›*
