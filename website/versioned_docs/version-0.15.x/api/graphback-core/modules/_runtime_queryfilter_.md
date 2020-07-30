---
id: "_runtime_queryfilter_"
title: "runtime/QueryFilter"
sidebar_label: "runtime/QueryFilter"
---

## Index

### Type aliases

* [BooleanInput](_runtime_queryfilter_.md#booleaninput)
* [DateTimeInput](_runtime_queryfilter_.md#datetimeinput)
* [FloatInput](_runtime_queryfilter_.md#floatinput)
* [IdInput](_runtime_queryfilter_.md#idinput)
* [IntInput](_runtime_queryfilter_.md#intinput)
* [Maybe](_runtime_queryfilter_.md#maybe)
* [QueryFilter](_runtime_queryfilter_.md#queryfilter)
* [Scalars](_runtime_queryfilter_.md#scalars)
* [StringInput](_runtime_queryfilter_.md#stringinput)

## Type aliases

###  BooleanInput

Ƭ **BooleanInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:17](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L17)*

#### Type declaration:

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Boolean"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Boolean"]›*

___

###  DateTimeInput

Ƭ **DateTimeInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:67](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L67)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["DateTime"]›*

___

###  FloatInput

Ƭ **FloatInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:22](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L22)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Float"]›*

___

###  IdInput

Ƭ **IdInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:33](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L33)*

#### Type declaration:

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["ID"]›*

___

###  IntInput

Ƭ **IntInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:43](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L43)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Int"]›*

___

###  Maybe

Ƭ **Maybe**: *T | null*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:15](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L15)*

___

###  QueryFilter

Ƭ **QueryFilter**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:81](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L81)*

Query filter used in Graphback services and data providers

#### Type declaration:

___

###  Scalars

Ƭ **Scalars**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:6](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L6)*

Filter mapping for scalars that exit

#### Type declaration:

* **Boolean**: *boolean*

* **DateTime**: *any*

* **Float**: *number*

* **ID**: *string*

* **Int**: *number*

* **String**: *string*

___

###  StringInput

Ƭ **StringInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:54](https://github.com/aerogear/graphback/blob/b39280e7/packages/graphback-core/src/runtime/QueryFilter.ts#L54)*

#### Type declaration:

* **contains**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **endsWith**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*

* **startsWith**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["String"]›*
