import Knex, { Config, ColumnInfo } from 'knex'
import { AbstractDatabase } from '../abstract/AbstractDatabase'
import { Table } from '../abstract/Table'
import { TableColumn } from '../abstract/TableColumn'
import listTables from '../util/listTables'
import getTypeAlias from '../util/getTypeAlias'
import getColumnComments from '../util/getColumnComments'
import transformDefaultValue from '../util/transformDefaultValue'
import getPrimaryKey from '../util/getPrimaryKey'
import getForeignKeys from '../util/getForeignKeys'
import getIndexes from '../util/getIndexes'
import getUniques from '../util/getUniques'
import getCheckConstraints from '../util/getCheckConstraints'

/**
 * @param {Config} config Knex configuration
 * @param {string} schemaName Table and column prefix: `<schemaName>.<tableName>`
 * @param {string} tablePrefix Table name prefix: `<prefix><tableName>`
 * @param {string} columnPrefix Column name prefix: `<prefix><columnName>`
 */
export function read (
  config: Config,
  schemaName = 'public',
  tablePrefix = '',
  columnPrefix = '',
): Promise<AbstractDatabase> {
  const reader = new Reader(config, schemaName, tablePrefix, columnPrefix)
  return reader.read()
}

class Reader {
  public config: Config
  public schemaName: string
  public tablePrefix: string
  public columnPrefix: string
  public knex: Knex
  public database: AbstractDatabase

  constructor (
    config: Config,
    schemaName: string,
    tablePrefix: string,
    columnPrefix: string,
  ) {
    this.config = config
    this.schemaName = schemaName
    this.tablePrefix = tablePrefix
    this.columnPrefix = columnPrefix
    this.knex = Knex(config)
    this.database = {
      tables: [],
      tableMap: new Map(),
    }
  }

  public async read () {
    const tables: Array<{ name: string, comment: string }> = await listTables(this.knex, this.schemaName)
    for (const { name: tableName, comment } of tables) {
      const name = this.getTableName(tableName)
      if (!name) { continue }
      const table: Table = {
        name,
        comment,
        annotations: {},
        columns: [],
        columnMap: new Map(),
        primaries: [],
        indexes: [],
        uniques: [],
      }
      this.database.tables.push(table)
      this.database.tableMap.set(name, table)

      // Foreign keys
      const foreignKeys = await getForeignKeys(this.knex, tableName, this.schemaName)

      const checkContraints = await getCheckConstraints(this.knex, tableName, this.schemaName)

      // Columns
      const columnComments = await getColumnComments(this.knex, tableName, this.schemaName)
      const columnInfo: { [key: string]: ColumnInfo } = await this.knex(tableName)
        .withSchema(this.schemaName)
        .columnInfo() as any
      for (const key in columnInfo) {
        if (columnInfo[key]) {
          const columnName = this.getColumnName(key)
          if (!columnName) { continue }
          const info = columnInfo[key]
          const foreign = foreignKeys.find((k) => k.column === key)
          const column: TableColumn = {
            name: columnName,
            comment: this.getComment(columnComments, key),
            annotations: {},
            ...getTypeAlias(info.type, info.maxLength),
            nullable: info.nullable,
            defaultValue: transformDefaultValue(info.defaultValue),
            foreign: foreign ? {
              type: null,
              field: null,
              tableName: this.getTableName(foreign.foreignTable),
              columnName: this.getColumnName(foreign.foreignColumn),
            } : null,
          }

          const checkContraint = checkContraints.find((c: any) => c.columnNames.includes(columnName))
          if (checkContraint && checkContraint.values) {
            column.type = 'enum'
            column.args = [checkContraint.values]
          }

          table.columns.push(column)
          table.columnMap.set(key, column)
        }
      }

      // Primary key
      const primaries = await getPrimaryKey(this.knex, tableName, this.schemaName)
      table.primaries = primaries.map((p) => ({
        columns: this.getColumnNames([p.column]),
        name: p.indexName,
      }))

      // Index
      const indexes = await getIndexes(this.knex, tableName, this.schemaName)
      table.indexes = indexes.filter(
        (i) => i.columnNames.length > 1 ||
          // Not already the primary key
          !primaries.find((p) => p.column === i.columnNames[0]),
      ).map((i) => ({
        name: i.indexName,
        columns: this.getColumnNames(i.columnNames),
        type: i.type,
      }))

      // Unique constraints
      const uniques = await getUniques(this.knex, tableName, this.schemaName)
      table.uniques = uniques.map((u) => ({
        columns: this.getColumnNames(u.columnNames),
        name: u.indexName,
      }))

      // Deduplicate unique index
      for (const unique of table.uniques) {
        for (let i = 0; i < table.indexes.length; i++) {
          if (unique.name === table.indexes[i].name) {
            table.indexes.splice(i, 1)
            break
          }
        }
      }
    }

    await this.knex.destroy()

    return this.database
  }

  private getTableName (name: string) {
    if (name.startsWith(this.tablePrefix)) {
      return name.substr(this.tablePrefix.length)
    }
    return null
  }

  private getColumnName (name: string) {
    if (name.startsWith(this.columnPrefix)) {
      return name.substr(this.columnPrefix.length)
    }
    return null
  }

  private getColumnNames (names: string[]): string [] {
    // @ts-ignore
    return names.map((name) => this.getColumnName(name)).filter((n) => !!n)
  }

  private getComment (comments: Array<{ column: string, comment: string }>, column: string) {
    const row = comments.find((c) => c.column === column)
    if (row && row.comment != null) {
      return row.comment.replace(/'/g, `''`)
    }
    return null
  }
}
