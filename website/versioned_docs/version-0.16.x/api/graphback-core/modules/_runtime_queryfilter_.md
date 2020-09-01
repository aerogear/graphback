---
id: "_runtime_queryfilter_"
title: "runtime/QueryFilter"
sidebar_label: "runtime/QueryFilter"
---

## Index

### Type aliases

* [BooleanInput](_runtime_queryfilter_.md#booleaninput)
* [FloatInput](_runtime_queryfilter_.md#floatinput)
* [GraphbackDateInput](_runtime_queryfilter_.md#graphbackdateinput)
* [GraphbackDateTimeInput](_runtime_queryfilter_.md#graphbackdatetimeinput)
* [GraphbackObjectIdInput](_runtime_queryfilter_.md#graphbackobjectidinput)
* [GraphbackTimeInput](_runtime_queryfilter_.md#graphbacktimeinput)
* [GraphbackTimestampInput](_runtime_queryfilter_.md#graphbacktimestampinput)
* [IdInput](_runtime_queryfilter_.md#idinput)
* [IntInput](_runtime_queryfilter_.md#intinput)
* [Maybe](_runtime_queryfilter_.md#maybe)
* [QueryFilter](_runtime_queryfilter_.md#queryfilter)
* [Scalars](_runtime_queryfilter_.md#scalars)
* [StringInput](_runtime_queryfilter_.md#stringinput)

### Variables

* [FILTER_SUPPORTED_SCALARS](_runtime_queryfilter_.md#const-filter_supported_scalars)

## Type aliases

###  BooleanInput

Ƭ **BooleanInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:41](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L41)*

#### Type declaration:

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Boolean"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["Boolean"]›*

___

###  FloatInput

Ƭ **FloatInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:46](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L46)*

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

###  GraphbackDateInput

Ƭ **GraphbackDateInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:91](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L91)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDate"]›*

___

###  GraphbackDateTimeInput

Ƭ **GraphbackDateTimeInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:102](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L102)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackDateTime"]›*

___

###  GraphbackObjectIdInput

Ƭ **GraphbackObjectIdInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:113](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L113)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackObjectID"]›*

___

###  GraphbackTimeInput

Ƭ **GraphbackTimeInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:124](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L124)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTime"]›*

___

###  GraphbackTimestampInput

Ƭ **GraphbackTimestampInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:135](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L135)*

#### Type declaration:

* **between**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"][]›*

* **eq**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

* **ge**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

* **gt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

* **in**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"][]›*

* **le**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

* **lt**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

* **ne**? : *[Maybe](_runtime_queryfilter_.md#maybe)‹Scalars["GraphbackTimestamp"]›*

___

###  IdInput

Ƭ **IdInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:57](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L57)*

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

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:67](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L67)*

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

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:39](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L39)*

___

###  QueryFilter

Ƭ **QueryFilter**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:151](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L151)*

Query filter used in Graphback services and data providers

#### Type declaration:

___

###  Scalars

Ƭ **Scalars**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:6](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L6)*

Filter mapping for scalars that exit

#### Type declaration:

* **Boolean**: *boolean*

* **Float**: *number*

* **GraphbackDate**: *Date*

* **GraphbackDateTime**: *Date*

* **GraphbackJSON**: *any*

* **GraphbackJSONObject**(): *object*

* **GraphbackObjectID**: *ObjectID | string*

* **GraphbackTime**: *string*

* **GraphbackTimestamp**: *number*

* **ID**: *string*

* **Int**: *number*

* **String**: *string*

___

###  StringInput

Ƭ **StringInput**: *object*

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:78](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L78)*

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

## Variables

### `Const` FILTER_SUPPORTED_SCALARS

• **FILTER_SUPPORTED_SCALARS**: *string[]* = [
  'ID',
  'String',
  'Boolean',
  'Int',
  'Float',
  'GraphbackObjectID',
  'GraphbackTimestamp',
  'GraphbackTime',
  'GraphbackDate',
  'GraphbackDateTime',
  'Timestamp',
  'Time',
  'Date',
  'DateTime'
]

*Defined in [packages/graphback-core/src/runtime/QueryFilter.ts:22](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-core/src/runtime/QueryFilter.ts#L22)*
