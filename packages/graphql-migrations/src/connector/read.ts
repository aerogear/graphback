import * as Knex from 'knex'
import { AbstractDatabase } from '../abstract/AbstractDatabase'
import { Table } from '../abstract/Table'
import { TableColumn } from '../abstract/TableColumn'
import getCheckConstraints from '../util/getCheckConstraints'
import getColumnComments from '../util/getColumnComments'
import getForeignKeys from '../util/getForeignKeys'
import getIndexes from '../util/getIndexes'
import getPrimaryKey from '../util/getPrimaryKey'
import getTypeAlias from '../util/getTypeAlias'
import getUniques from '../util/getUniques'
import listTables from '../util/listTables'
import transformDefaultValue from '../util/transformDefaultValue'

/**
 * @param {Config} config Knex configuration
 * @param {string} schemaName Table and column prefix: `<schemaName>.<tableName>`
 * @param {string} tablePrefix Table name prefix: `<prefix><tableName>`
 * @param {string} columnPrefix Column name prefix: `<prefix><columnName>`
 */
export function read(
  config: Knex.Config,
  schemaName: string = 'public',
  tablePrefix: string = '',
  columnPrefix: string = '',
): Promise<AbstractDatabase> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const reader = new Reader(config, schemaName, tablePrefix, columnPrefix)

  return reader.read()
}

// eslint-disable-next-line @typescript-eslint/tslint/config
class Reader {
  public config: Knex.Config
  public schemaName: string
  public tablePrefix: string
  public columnPrefix: string
  public knex: Knex
  public database: AbstractDatabase

  public constructor(
    config: Knex.Config,
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

  public async read() {
    const tables: { name: string, comment: string }[] = await listTables(this.knex, this.schemaName)
    for (const { name: tableName, comment } of tables) {
      const name = this.getTableName(tableName)
      if (!name) { continue }
      const table: Table = {
        name,
        comment,
        annotations: {},
        columns: [],
        columnMap: new Map(),
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
      const columnInfo: { [key: string]: Knex.ColumnInfo } = await this.knex(tableName)
        .withSchema(this.schemaName)
        .columnInfo() as any;
      // Primary key
      const primaries = await getPrimaryKey(this.knex, tableName, this.schemaName)

      // eslint-disable-next-line no-restricted-syntax
      for (const key in columnInfo) {
        if (columnInfo[key]) {
          const columnName = this.getColumnName(key)
          if (!columnName) { continue }
          const info = columnInfo[key];
          const {args, type} = getTypeAlias(info.type, info.maxLength);
          const foreign = foreignKeys.find((k: any) => k.column === key);
          const isPrimaryKey  = primaries.some((primary:  {column: string, indexName: string }) => primary.column === columnName);
          const column: TableColumn = {
            name: columnName,
            isPrimaryKey,
            autoIncrementable: type === "increments" || type === "bigIncrements", // TODO
            comment: this.getComment(columnComments, key),
            annotations: {},
            args,
            type,
            nullable: info.nullable && !isPrimaryKey,
            defaultValue: transformDefaultValue(info.defaultValue),
            foreign: foreign ? {
              type: undefined,
              field: undefined,
              tableName: this.getTableName(foreign.foreignTable),
              columnName: this.getColumnName(foreign.foreignColumn),
            } : undefined,
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

      // Index
      const indexes = await getIndexes(this.knex, tableName, this.schemaName)
      table.indexes = indexes.filter(
        (i: any) => i.columnNames.length > 1 ||
          // Not already the primary key
          !primaries.find((p: any) => p.column === i.columnNames[0]),
      ).map((i: any) => ({
        name: i.indexName,
        columns: this.getColumnNames(i.columnNames),
        type: i.type,
      }))

      // Unique constraints
      const uniques = await getUniques(this.knex, tableName, this.schemaName)
      table.uniques = uniques.map((u: any) => ({
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

  private getTableName(name: string) {
    if (name.startsWith(this.tablePrefix)) {
      return name.substr(this.tablePrefix.length)
    }

    return undefined
  }

  private getColumnName(name: string) {
    if (name.startsWith(this.columnPrefix)) {
      return name.substr(this.columnPrefix.length)
    }

    return undefined
  }

  private getColumnNames(names: string[]): string [] {
    // @ts-ignore
    return names.map((name: string) => this.getColumnName(name)).filter((n: string) => !!n)
  }

  // tslint:disable-next-line: array-type
  private getComment(comments: { column: string, comment: string }[], column: string) {
    const row = comments.find((c: any) => c.column === column)
    if (row && !!row.comment) {
      return row.comment.replace(/'/g, `''`)
    }

    return undefined
  }
}
