---
id: "_runtime_createinmemoryfilterpredicate_"
title: "runtime/createInMemoryFilterPredicate"
sidebar_label: "runtime/createInMemoryFilterPredicate"
---

## Index

### Functions

* [createInMemoryFilterPredicate](_runtime_createinmemoryfilterpredicate_.md#createinmemoryfilterpredicate)

## Functions

###  createInMemoryFilterPredicate

▸ **createInMemoryFilterPredicate**‹**T**›(`filter`: [QueryFilter](_runtime_queryfilter_.md#queryfilter)): *function*

*Defined in [packages/graphback-core/src/runtime/createInMemoryFilterPredicate.ts:116](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/createInMemoryFilterPredicate.ts#L116)*

Dynamically creates a subscription filter predicate using the filter object values

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filter` | [QueryFilter](_runtime_queryfilter_.md#queryfilter) | subscription filter input object  |

**Returns:** *function*

▸ (`input`: Partial‹T›): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`input` | Partial‹T› |
