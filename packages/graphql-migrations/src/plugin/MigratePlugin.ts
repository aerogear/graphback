import { OperationType } from '../diff/Operation'
import { Transaction } from 'knex'

export type WriteCallback = (op: any, transaction: Transaction) => any

export interface WriteParams {
  tap: (
    type: OperationType,
    event: 'before' | 'after',
    callback: WriteCallback,
  ) => void
}

export abstract class MigratePlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public write (params: WriteParams): void {
    // Re-implement
  }
}
