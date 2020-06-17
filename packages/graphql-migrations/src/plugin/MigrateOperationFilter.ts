import { Operation } from '../diff/Operation';


/**
 * Method that can be used to filter out operations that we do not want to execute.
 * For example if we want to prevent deletion of the tables filter can remove `table.drop` operations
 * from array
 */
export interface MigrateOperationFilter {
  filter(operations: Operation[]): Operation[];
};

/**
 * Suppress table deletion and renaming for operations that are not going to cause
 * data loss when field was removed accidentially.
 */
export const removeNonSafeOperationsFilter: MigrateOperationFilter = {

  filter: (operations: Operation[]) => {
    return operations.filter((op: Operation) => {
      if (op.type === 'table.drop' ||
                op.type === 'table.rename' ||
                op.type === 'column.rename') {
        return false;
      }

      return true;
    })
  }
};

