import Knex, { Config, CreateTableBuilder, TableBuilder } from 'knex'
// eslint-disable-next-line import/no-duplicates
import * as Operations from '../diff/Operation'
// eslint-disable-next-line import/no-duplicates
import { Operation, OperationType } from '../diff/Operation'
import { MigratePlugin, WriteCallback } from '../plugin/MigratePlugin'
import { sortOps } from '../util/sortOps'

const CREATE_TABLE_CHILD_OPS: OperationType[] = [
  'table.comment.set',
  'table.index.create',
  'table.unique.create',
  'table.primary.set',
  'column.create',
]

const ALTER_TABLE_CHILD_OPS: OperationType[] = [
  ...CREATE_TABLE_CHILD_OPS,
  'column.rename',
  'column.alter',
  'column.drop',
  'table.foreign.drop',
  'table.index.drop',
  'table.unique.drop',
]

/**
 * @param {Operation[]} operations
 * @param {Config} config Knex configuration
 * @param {string} schemaName Table schema prefix: `<schemaName>.<tableName>`
 * @param {string} tablePrefix Table name prefix: `<prefix><tableName>`
 * @param {string} columnPrefix Column name prefix: `<prefix><columnName>`
 */
export async function write (
  operations: Operation[],
  config: Config,
  schemaName = 'public',
  tablePrefix = '',
  columnPrefix = '',
  plugins: MigratePlugin[] = [],
) {
  const writer = new Writer(
    operations,
    config,
    schemaName,
    tablePrefix,
    columnPrefix,
    plugins,
  )
  return writer.write()
}

class Writer {
  private operations: Operation[]
  private schemaName: string
  private tablePrefix: string
  private columnPrefix: string
  private plugins: MigratePlugin[]
  private knex: Knex
  private hooks: { [key: string]: WriteCallback[] } = {}
  // @ts-ignore
  private trx: Knex.Transaction

  constructor (
    operations: Operation[],
    config: Config,
    schemaName = 'public',
    tablePrefix = '',
    columnPrefix = '',
    plugins: MigratePlugin[],
  ) {
    this.operations = operations.slice().sort(sortOps)
    this.schemaName = schemaName
    this.tablePrefix = tablePrefix
    this.columnPrefix = columnPrefix
    this.plugins = plugins
    this.knex = Knex(config)
  }

  public async write () {
    await this.applyPlugins()

    await this.knex.transaction(async (trx) => {
      this.trx = trx
      let op: Operation | undefined
      while ((op = this.operations.shift())) {
        switch (op.type) {
        case 'table.create':
          await this.createTable(op as Operations.TableCreateOperation)
          break
        case 'table.rename':
          await this.callHook(op, 'before')
          const trop = (op as Operations.TableRenameOperation)
          await this.trx.schema.withSchema(this.schemaName)
            .renameTable(this.getTableName(trop.fromName), this.getTableName(trop.toName))
          await this.callHook(op, 'after')
          break
        case 'table.drop':
          await this.callHook(op, 'before')
          await this.dropTable(op as Operations.TableDropOperation)
          await this.callHook(op, 'after')
          break
        case 'table.foreign.create':
          const tfop = (op as Operations.TableForeignCreateOperation)
          await this.trx.schema.withSchema(this.schemaName).alterTable(tfop.table, (table) => {
            table.foreign(this.getColumnName(tfop.column))
              .references(this.getColumnName(tfop.referenceColumn))
              .inTable(this.getTableName(tfop.referenceTable))
          })
          break
        default:
          this.operations.splice(0, 0, op)
          await this.alterTable((op as any).table)
        }
      }
    })

    await this.knex.destroy()
  }

  private getTableName (name: string) {
    return `${this.tablePrefix}${name}`
  }

  private getColumnName (name: string) {
    return `${this.columnPrefix}${name}`
  }

  private getColumnNames (names: string[]) {
    return names.map((name) => this.getColumnName(name))
  }

  private removeOperation (op: Operation) {
    const index = this.operations.indexOf(op)
    if (index !== -1) { this.operations.splice(index, 1) }
  }

  private async applyPlugins () {
    this.hooks = {}
    for (const plugin of this.plugins) {
      plugin.write({
        tap: (type, event, callback) => {
          const key = `${type}.${event}`
          const list = this.hooks[key] = this.hooks[key] || []
          list.push(callback)
        },
      })
    }
  }

  private async callHook (op: Operation, event: 'before' | 'after') {
    const list = this.hooks[`${op.type}.${event}`]
    if (list) {
      for (const callback of list) {
        await callback(op, this.trx)
      }
    }
  }

  private async createTable (op: Operations.TableCreateOperation) {
    await this.callHook(op, 'before')
    const childOps: Operation[] = this.operations.filter(
      (child) => CREATE_TABLE_CHILD_OPS.includes(child.type) &&
      (child as any).table === op.table,
    )
    for (const childOp of childOps) {
      await this.callHook(childOp, 'before')
    }
    await this.trx.schema.withSchema(this.schemaName).createTable(this.getTableName(op.table), async (table) => {
      for (const childOp of childOps) {
        switch (childOp.type) {
        case 'column.create':
          this.createColumn(childOp as Operations.ColumnCreateOperation, table)
          break
        case 'table.comment.set':
          table.comment((childOp as Operations.TableCommentSetOperation).comment || '')
          break
        case 'table.index.create':
          const tiop = (childOp as Operations.TableIndexCreateOperation)
          table.index(this.getColumnNames(tiop.columns), tiop.indexName || undefined, tiop.indexType || undefined)
          break
        case 'table.unique.create':
          const tuop = (childOp as Operations.TableUniqueCreateOperation)
          table.unique(this.getColumnNames(tuop.columns), tuop.indexName || undefined)
          break
        case 'table.primary.set':
          const tpop = (childOp as Operations.TablePrimarySetOperation)
          if (tpop.columns) {
            // @ts-ignore
            table.primary(this.getColumnNames(tpop.columns), tpop.indexName)
          }
          break
        }
        this.removeOperation(childOp)
      }
    })
    for (const childOp of childOps) {
      await this.callHook(childOp, 'after')
    }
    await this.callHook(op, 'after')
  }

  private createColumn (op: Operations.ColumnCreateOperation, table: CreateTableBuilder) {
    if (op.columnType in table) {
      // @ts-ignore
      let col: Knex.ColumnBuilder = table[op.columnType](
        this.getColumnName(op.column),
        ...this.getColumnTypeArgs(op),
      )
      if (op.comment) {
        col = col.comment(op.comment)
      }
      if (op.nullable) {
        col = col.nullable()
      } else {
        col = col.notNullable()
      }
      if (typeof op.defaultValue !== 'undefined') {
        col = col.defaultTo(op.defaultValue)
      }
      return col
    } else {
      throw new Error(`Table ${op.table} column ${op.column}: Unsupported column type ${op.columnType}`)
    }
  }

  private async alterTable (tableName: string) {
    const allChildOps = this.operations.filter(
      (child) => ALTER_TABLE_CHILD_OPS.includes(child.type) &&
      (child as any).table === tableName,
    )
    const childOps: Operations.Operation[] = []
    for (const childOp of allChildOps) {
      await this.callHook(childOp, 'before')

      let add = true

      if (childOp.type === 'column.alter') {
        const aop = childOp as Operations.ColumnAlterOperation
        if (aop.columnType === 'enum' && (aop.args.length < 2 || !aop.args[1].useNative)) {
          // Prepared statement no supported here
          const constraintName = this.knex.raw(`${tableName}_${aop.column}_check`)
          await this.trx.raw(`ALTER TABLE "?"."?" DROP CONSTRAINT "?", ADD CONSTRAINT "?" CHECK (? IN (?)) `, [
            this.knex.raw(this.schemaName),
            this.knex.raw(tableName),
            constraintName,
            constraintName,
            this.knex.raw(aop.column),
            this.knex.raw(aop.args[0].map((s: string) => `'${s.replace(`'`, `\\'`)}'`).join(', ')),
          ])
          this.removeOperation(childOp)
          add = false
        }
      }

      if (add) {
        childOps.push(childOp)
      }
    }
    await this.trx.schema.withSchema(this.schemaName).alterTable(this.getTableName(tableName), async (table) => {
      for (const childOp of childOps) {
        switch (childOp.type) {
        case 'table.comment.set':
          table.comment((childOp as Operations.TableCommentSetOperation).comment || '')
          break
        case 'table.foreign.drop':
          const tfdop = (childOp as Operations.TableForeignDropOperation)
          table.dropForeign([this.getColumnName(tfdop.column)])
          break
        case 'table.index.create':
          const tiop = (childOp as Operations.TableIndexCreateOperation)
          table.index(this.getColumnNames(tiop.columns), tiop.indexName || undefined, tiop.indexType || undefined)
          break
        case 'table.index.drop':
          const tidop = (childOp as Operations.TableIndexDropOperation)
          table.dropIndex(this.getColumnNames(tidop.columns), tidop.indexName || undefined)
          break
        case 'table.unique.create':
          const tuop = (childOp as Operations.TableUniqueCreateOperation)
          table.unique(this.getColumnNames(tuop.columns), tuop.indexName || undefined)
          break
        case 'table.unique.drop':
          const tudop = (childOp as Operations.TableUniqueDropOperation)
          table.dropUnique(this.getColumnNames(tudop.columns), tudop.indexName || undefined)
          break
        case 'table.primary.set':
          const tpop = (childOp as Operations.TablePrimarySetOperation)
          if (tpop.columns) {
            // @ts-ignore
            table.primary(this.getColumnNames(tpop.columns), tpop.indexName)
          } else {
            // @ts-ignore
            table.dropPrimary(tpop.indexName)
          }
          break
        case 'column.create':
          this.createColumn(childOp as Operations.ColumnCreateOperation, table)
          break
        case 'column.rename':
          const crop = (childOp as Operations.ColumnRenameOperation)
          table.renameColumn(this.getColumnName(crop.fromName), this.getColumnName(crop.toName))
          break
        case 'column.alter':
          this.alterColumn(table, (childOp as Operations.ColumnAlterOperation))
          break
        case 'column.drop':
          table.dropColumn(this.getColumnName((childOp as Operations.ColumnDropOperation).column))
          break
        }
        this.removeOperation(childOp)
      }
    })
    for (const childOp of childOps) {
      await this.callHook(childOp, 'after')
    }
  }

  private alterColumn (table: TableBuilder, op: Operations.ColumnAlterOperation) {
    // @ts-ignore
    let col: Knex.ColumnBuilder = table[op.columnType](
      op.column,
      ...this.getColumnTypeArgs(op),
    )
    if (op.comment) {
      col = col.comment(op.comment)
    }
    if (op.nullable) {
      col = col.nullable()
    } else {
      col = col.notNullable()
    }
    if (typeof op.defaultValue !== 'undefined') {
      col = col.defaultTo(op.defaultValue)
    }
    col = col.alter()
    return col
  }

  private async dropTable (op: Operations.TableDropOperation) {
    if (['pg', 'mysql', 'mysql2'].includes(this.knex.client.config.client)) {
      await this.trx.raw(`DROP TABLE ?.? CASCADE`, [this.trx.raw(this.schemaName), this.trx.raw(op.table)])
    } else {
      await this.trx.schema.withSchema(this.schemaName).dropTable(this.getTableName(op.table))
    }
  }

  private getColumnTypeArgs (op: Operations.ColumnCreateOperation | Operations.ColumnAlterOperation) {
    let args: any[] = op.args
    const dbType: string = this.knex.client.config.client
    if (op.columnType === 'timestamp' && args.length) {
      if (dbType === 'pg') {
        args = [!args[0]]
      } else if (dbType === 'mssql') {
        args = [{ useTz: args[0] }]
      } else {
        args = []
      }
    }
    return args
  }
}
