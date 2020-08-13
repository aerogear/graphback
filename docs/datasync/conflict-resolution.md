---
id: conflict-resolution
title: Conflict Resolution strategies
sidebar_label: Conflict Resolution strategies
---

A conflict resolution strategy is a JavaScript Object with two properties: `resolveUpdate` and `resolveDelete`, and is used to resolve conflicts during Update and Delete Mutations respectively. Graphback has two built-in conflict resolution strategies that come with it:

### ClientWins

This strategy ensures that updates always resolve to whatever the client had sent, even in the event of a conflict. If the corresponding object has been deleted in the database, it is restored when the client tries to update it. For delete conflicts, the corresponding object is always deleted, regardless of if it had been updated since the client last fetched it.


### ServerSideWins

This strategy ensures that in the event of a update conflict, the client's update will never overwrite the any field that has changed since the client last fetched it. If the object has been deleted in the database, the client will be notified of it by way of a `ConflictError`. For delete conflicts, the client is informed of the conflict via a `ConflictError`.


### Custom Conflict Strategy

A custom conflict resolution strategy can be created by implementing [ConflictResolutionStrategy](../api/graphback-datasync/interfaces/_util_.conflictresolutionstrategy.md). As an example, take the implementation of the `ClientSideWins` strategy:

```typescript
export const ClientSideWins: ConflictResolutionStrategy = {
  resolveUpdate(conflict: ConflictMetadata): any {
    const { serverData, clientDiff } = conflict

    const resolved = Object.assign(serverData, clientDiff);

    if (serverData[DataSyncFieldNames.deleted] === true) {
      resolved[DataSyncFieldNames.deleted] = false;
    }

    return resolved;
  },
  resolveDelete(conflict: ConflictMetadata): any {
    const { serverData, clientData } = conflict;

    if (serverData[DataSyncFieldNames.deleted] === true) {
      throw new ConflictError(conflict);
    }

    const resolved = Object.assign(serverData, { [DataSyncFieldNames.deleted]: true });

    return resolved
  }
}
```

#### `resolveUpdate`


```typescript
const { serverData, clientDiff } = conflict

const resolved = Object.assign(serverData, clientDiff);

if (serverData[DataSyncFieldNames.deleted] === true) {
    resolved[DataSyncFieldNames.deleted] = false;
}

return resolved;
```

In the above block, it can be seen that the resolved object's fields are always set to what the client updated in the event of an update conflict. It can also be seen that if the object has been deleted, it will be restored, along with the updates.


#### `resolveDelete`

```typescript
const { serverData, clientData } = conflict;

if (serverData[DataSyncFieldNames.deleted] === true) {
    throw new ConflictError(conflict);
}

const resolved = Object.assign(serverData, { [DataSyncFieldNames.deleted]: true });

return resolved
```

In the above block, it can be seen that in the event of a delete conflict, the object is always deleted.