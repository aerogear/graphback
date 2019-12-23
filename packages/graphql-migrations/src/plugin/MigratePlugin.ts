import { Transaction } from 'knex'
import { OperationType } from '../diff/Operation'

export type WriteCallback = (op: any, transaction: Transaction) => any

export interface WriteParams {
  tap: (
    type: OperationType,
    event: 'before' | 'after',
    callback: WriteCallback,
  ) => void
}

/**
 * Interface for all migration plugins
 */
export interface MigratePlugin {
  write(params: WriteParams): boolean;
}
