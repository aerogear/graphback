---
id: "_util_.globalconflictconfig"
title: "GlobalConflictConfig"
sidebar_label: "GlobalConflictConfig"
---

Interface for global configuration of conflicts

## Hierarchy

* [DataSyncModelConflictConfig](_util_.datasyncmodelconflictconfig.md)

  ↳ **GlobalConflictConfig**

## Index

### Properties

* [conflictResolution](_util_.globalconflictconfig.md#optional-conflictresolution)
* [deltaTTL](_util_.globalconflictconfig.md#optional-deltattl)
* [enabled](_util_.globalconflictconfig.md#optional-enabled)
* [models](_util_.globalconflictconfig.md#optional-models)

## Properties

### `Optional` conflictResolution

• **conflictResolution**? : *[ConflictResolutionStrategy](_util_.conflictresolutionstrategy.md)*

*Inherited from [GlobalConflictConfig](_util_.globalconflictconfig.md).[conflictResolution](_util_.globalconflictconfig.md#optional-conflictresolution)*

*Defined in [packages/graphback-datasync/src/util.ts:102](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L102)*

One of the conflict resolutions strategies:
- ThrowOnConflict,
- ClientSideWins,
- ServerSideWins

___

### `Optional` deltaTTL

• **deltaTTL**? : *number*

*Inherited from [GlobalConflictConfig](_util_.globalconflictconfig.md).[deltaTTL](_util_.globalconflictconfig.md#optional-deltattl)*

*Defined in [packages/graphback-datasync/src/util.ts:106](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L106)*

Value in seconds used to delete old history entries wth diffs that may no longer be needed.

___

### `Optional` enabled

• **enabled**? : *boolean*

*Inherited from [GlobalConflictConfig](_util_.globalconflictconfig.md).[enabled](_util_.globalconflictconfig.md#optional-enabled)*

*Defined in [packages/graphback-datasync/src/util.ts:95](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L95)*

Flag that enables conflict resolution

___

### `Optional` models

• **models**? : *[DataSyncModelConfigMap](_util_.datasyncmodelconfigmap.md)*

*Defined in [packages/graphback-datasync/src/util.ts:43](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L43)*
