import { Change } from '@graphql-inspector/core';
import { ModelChange, ModelChangeType } from '../changes/ChangeTypes';

export const mapModelChanges = (changes: Change[]): ModelChange[] => {
  return changes.filter((change: Change) => {
    return !!ModelChangeType[change.type]
  }).map((change: Change) => {
    const [type, field] = change.path.split('.');

    return {
      type: ModelChangeType[change.type],
      path: {
        type,
        field
      }
    }
  });
}
