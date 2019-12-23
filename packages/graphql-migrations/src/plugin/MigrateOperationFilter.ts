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
 * Suppress table deletion
 */
export const removeDeleteOperationsFilter: MigrateOperationFilter = {
    filter: (operations: Operation[]) => {
        return operations.filter((op: Operation) => op.type !== 'table.drop')
    }
};

