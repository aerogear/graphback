import { Operation, OperationType } from '../diff/Operation';


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

const UNSAFE_OPERATIONS: OperationType[] = ['table.drop', 'column.drop', 'table.rename', 'column.rename'];

export const removeNonSafeOperationsFilter: MigrateOperationFilter = {
  filter: (operations: Operation[]) => operations.filter((op: Operation) => !UNSAFE_OPERATIONS.includes(op.type))
};
