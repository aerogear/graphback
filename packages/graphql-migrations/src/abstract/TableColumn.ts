export type TableColumnType =
  'integer' |
  'bigInteger' |
  'text' |
  'string' |
  'float' |
  'decimal' |
  'boolean' |
  'date' |
  'datetime' |
  'time' |
  'timestamp' |
  'binary' |
  'enum' |
  'json' |
  'jsonb' |
  'uuid'

export interface ForeignKey {
  type: string | undefined
  field: string | undefined
  tableName: string | undefined
  columnName: string | undefined
}

export interface TableColumn {
  name: string
  comment: string | undefined
  annotations: any
  type: string
  args: any[]
  nullable: boolean
  foreign: ForeignKey | undefined
  defaultValue: any,
  isPrimaryKey: boolean
  autoIncrementable: boolean
}
