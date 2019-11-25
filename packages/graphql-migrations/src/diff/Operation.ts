export type OperationType =
  'table.create' |
  'table.rename' |
  'table.comment.set' |
  'table.drop' |
  'table.index.create' |
  'table.index.drop' |
  'table.primary.set' |
  'table.unique.create' |
  'table.unique.drop' |
  'table.foreign.create' |
  'table.foreign.drop' |
  'column.create' |
  'column.rename' |
  'column.alter' |
  'column.drop'

export interface Operation {
  type: OperationType
  priority: number
}

export interface TableCreateOperation extends Operation {
  type: 'table.create'
  table: string
}

export interface TableRenameOperation extends Operation {
  type: 'table.rename'
  fromName: string
  toName: string
}

export interface TableCommentSetOperation extends Operation {
  type: 'table.comment.set'
  table: string
  comment: string | null
}

export interface TableDropOperation extends Operation {
  type: 'table.drop'
  table: string
}

export interface TableIndexCreateOperation extends Operation {
  type: 'table.index.create'
  table: string
  columns: string[]
  indexName: string | null
  indexType: string | null
}

export interface TableIndexDropOperation extends Operation {
  type: 'table.index.drop'
  table: string
  columns: string[]
  indexName: string | null
}

export interface TablePrimarySetOperation extends Operation {
  type: 'table.primary.set'
  table: string
  columns: string[] | null
  indexName: string | null
}

export interface TableUniqueCreateOperation extends Operation {
  type: 'table.unique.create'
  table: string
  columns: string[]
  indexName: string | null
}

export interface TableUniqueDropOperation extends Operation {
  type: 'table.unique.drop'
  table: string
  columns: string[]
  indexName: string | null
}

export interface TableForeignCreateOperation extends Operation {
  type: 'table.foreign.create'
  table: string
  column: string
  referenceTable: string
  referenceColumn: string
}

export interface TableForeignDropOperation extends Operation {
  type: 'table.foreign.drop'
  table: string
  column: string
}

export interface ColumnCreateOperation extends Operation {
  type: 'column.create'
  table: string
  column: string
  columnType: string
  args: any[]
  comment: string | null
  nullable: boolean
  defaultValue: any
}

export interface ColumnAlterOperation extends Operation {
  type: 'column.alter'
  table: string
  column: string
  columnType: string
  args: any[]
  comment: string | null
  nullable: boolean
  defaultValue: any
}

export interface ColumnRenameOperation extends Operation {
  type: 'column.rename'
  table: string
  fromName: string
  toName: string
}

export interface ColumnDropOperation extends Operation {
  type: 'column.drop'
  table: string
  column: string
}
