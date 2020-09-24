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

*Defined in [packages/graphback-datasync/src/util.ts:121](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](_util_.conflictmetadata.md) |

**Returns:** *any*

___

###  resolveUpdate

▸ **resolveUpdate**(`conflict`: [ConflictMetadata](_util_.conflictmetadata.md)): *any*

*Defined in [packages/graphback-datasync/src/util.ts:120](https://github.com/aerogear/graphback/blob/63664df15/packages/graphback-datasync/src/util.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`conflict` | [ConflictMetadata](_util_.conflictmetadata.md) |

**Returns:** *any*
