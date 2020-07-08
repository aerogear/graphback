---
id: filters
title: GraphQL Migrations Filters
sidebar_label: Operation Filter
---

# Filtering out operations

It is possible to write custom hooks that can be used to filter out undesirable database operations such as those that could lead to data loss from being executed. The filter is an interface defining a function that takes take the operation and returns `true` to execute the operation and false otherwise. By default, GraphQL Migrations does not apply any filter. 

```ts
export interface MigrateOperationFilter {
  filter(operations: Operation[]): Operation[];
};
```

For example, if we want to prevent deletion of the tables and columns we can write the following filter to remove `table.drop` and `column.drop` operations from array:

```ts
/**
 * Suppress table and column deletion operations that are not going to cause data loss when field was removed accidentially.
 */
export const removeDeletionOperations: MigrateOperationFilter = {
  filter: (operations: Operation[]) => {
    return operations.filter((op: Operation) => op.type !== 'table.drop' && op.type !== 'column.drop'
  }
};
```

The `removeDeletionOperations` filter can then be used in the `migrateDB` method as follows:

```ts
....

migrateDB(dbConfig, schema, {
  operationFilter: removeDeletionOperations
})

....
```

GraphQL Migrations has you covered and provides a [`removeNonSafeOperationsFilter`](https://github.com/aerogear/graphback/blob/master/packages/graphql-migrations/src/plugin/MigrateOperationFilter.ts) to avoid doing non safe operations such as table deletion and renaming. 
