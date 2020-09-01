---
id: "_util_.conflictresolutionstrategy"
title: "ConflictResolutionStrategy"
sidebar_label: "ConflictResolutionStrategy"
---

Interface for implementing conflict resolution strategies

## Hierarchy

* **ConflictResolutionStrategy**

## Index

### Methods

* [resolveDelete](_util_.conflictresolutionstrategy.md#resolvedelete)
* [resolveUpdate](_util_.conflictresolutionstrategy.md#resolveupdate)

## Methods

###  resolveDelete

▸ **resolveDelete**(`conflict`: [ConflictMetadata](_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:109](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/util.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](_util_.conflictmetadata.md) |

**Returns:** *any*

___

###  resolveUpdate

▸ **resolveUpdate**(`conflict`: [ConflictMetadata](_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:108](https://github.com/aerogear/graphback/blob/bc616b51/packages/graphback-datasync/src/util.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](_util_.conflictmetadata.md) |

**Returns:** *any*
