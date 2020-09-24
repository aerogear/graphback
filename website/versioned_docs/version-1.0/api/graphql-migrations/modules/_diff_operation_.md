---
id: "_diff_operation_"
title: "diff/Operation"
sidebar_label: "diff/Operation"
---

## Index

### Interfaces

* [ColumnAlterOperation](../interfaces/_diff_operation_.columnalteroperation.md)
* [ColumnCreateOperation](../interfaces/_diff_operation_.columncreateoperation.md)
* [ColumnDropOperation](../interfaces/_diff_operation_.columndropoperation.md)
* [ColumnRenameOperation](../interfaces/_diff_operation_.columnrenameoperation.md)
* [MigrationResults](../interfaces/_diff_operation_.migrationresults.md)
* [Operation](../interfaces/_diff_operation_.operation.md)
* [TableCommentSetOperation](../interfaces/_diff_operation_.tablecommentsetoperation.md)
* [TableCreateOperation](../interfaces/_diff_operation_.tablecreateoperation.md)
* [TableDropOperation](../interfaces/_diff_operation_.tabledropoperation.md)
* [TableForeignCreateOperation](../interfaces/_diff_operation_.tableforeigncreateoperation.md)
* [TableForeignDropOperation](../interfaces/_diff_operation_.tableforeigndropoperation.md)
* [TableIndexCreateOperation](../interfaces/_diff_operation_.tableindexcreateoperation.md)
* [TableIndexDropOperation](../interfaces/_diff_operation_.tableindexdropoperation.md)
* [TablePrimaryDropOperation](../interfaces/_diff_operation_.tableprimarydropoperation.md)
* [TablePrimarySetOperation](../interfaces/_diff_operation_.tableprimarysetoperation.md)
* [TableRenameOperation](../interfaces/_diff_operation_.tablerenameoperation.md)
* [TableUniqueCreateOperation](../interfaces/_diff_operation_.tableuniquecreateoperation.md)
* [TableUniqueDropOperation](../interfaces/_diff_operation_.tableuniquedropoperation.md)

### Type aliases

* [OperationType](_diff_operation_.md#operationtype)

## Type aliases

###  OperationType

Ƭ **OperationType**: *"table.create" | "table.rename" | "table.comment.set" | "table.drop" | "table.index.create" | "table.index.drop" | "table.primary.set" | "table.primary.drop" | "table.unique.create" | "table.unique.drop" | "table.foreign.create" | "table.foreign.drop" | "column.create" | "column.rename" | "column.alter" | "column.drop"*

*Defined in [diff/Operation.ts:3](https://github.com/aerogear/graphback/blob/63664df15/packages/graphql-migrations/src/diff/Operation.ts#L3)*
