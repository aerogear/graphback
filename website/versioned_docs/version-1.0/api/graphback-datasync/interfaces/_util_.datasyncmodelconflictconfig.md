---
id: "_util_.datasyncmodelconflictconfig"
title: "DataSyncModelConflictConfig"
sidebar_label: "DataSyncModelConflictConfig"
---

Interface for specifying conflict configuration of a model

## Hierarchy

* **DataSyncModelConflictConfig**

  ↳ [GlobalConflictConfig](_util_.globalconflictconfig.md)

## Index

### Properties

* [conflictResolution](_util_.datasyncmodelconflictconfig.md#optional-conflictresolution)
* [deltaTTL](_util_.datasyncmodelconflictconfig.md#optional-deltattl)
* [enabled](_util_.datasyncmodelconflictconfig.md#optional-enabled)

## Properties

### `Optional` conflictResolution

• **conflictResolution**? : *[ConflictResolutionStrategy](_util_.conflictresolutionstrategy.md)*

*Defined in [packages/graphback-datasync/src/util.ts:102](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L102)*

One of the conflict resolutions strategies:
- ThrowOnConflict,
- ClientSideWins,
- ServerSideWins

___

### `Optional` deltaTTL

• **deltaTTL**? : *number*

*Defined in [packages/graphback-datasync/src/util.ts:106](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L106)*

Value in seconds used to delete old history entries wth diffs that may no longer be needed.

___

### `Optional` enabled

• **enabled**? : *boolean*

*Defined in [packages/graphback-datasync/src/util.ts:95](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L95)*

Flag that enables conflict resolution
