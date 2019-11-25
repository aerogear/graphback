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
  type: string | null
  field: string | null
  tableName: string | null
  columnName: string | null
}

export interface TableColumn {
  name: string
  comment: string | null
  annotations: any
  type: string
  args: any[]
  nullable: boolean
  foreign: ForeignKey | null
  defaultValue: any
}
