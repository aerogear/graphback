import { TableColumn } from './TableColumn'

export interface Table {
  name: string
  comment: string | null
  annotations: any
  columns: TableColumn[]
  columnMap: Map<string, TableColumn>
  indexes: TableIndex[]
  primaries: TablePrimary[]
  uniques: TableUnique[]
}

export interface TableIndex {
  columns: string[]
  name: string | null
  type: string | null
}

export interface TablePrimary {
  columns: string[]
  name: string | null
}

export interface TableUnique {
  columns: string[]
  name: string | null
}
