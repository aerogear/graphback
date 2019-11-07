import { Change, ChangeType } from '@graphql-inspector/core';

export function invalidChanges(changes: Change[]) {
  return changes.map((c: Change) => {
    if (!isValidChangeType(c)) {
      return {
        type: c.type,
        message: c.message
      }
    }

    return undefined;
  });
}

function isValidChangeType(change: Change): boolean {
  return !!ChangeType[change.type];
}
