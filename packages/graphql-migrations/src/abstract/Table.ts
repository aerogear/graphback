import { TableColumn } from './TableColumn'

export interface Table {
  name: string
  comment: string | undefined
  annotations: any
  columns: TableColumn[]
  columnMap: Map<string, TableColumn>
  indexes: TableIndex[]
  primaries: TablePrimary[]
  uniques: TableUnique[]
}

export interface TableIndex {
  columns: string[]
  name: string | undefined
  type: string | undefined
}

export interface TablePrimary {
  columns: string[]
  name: string | undefined
}

export interface TableUnique {
  columns: string[]
  name: string | undefined
}
