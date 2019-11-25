import { Table } from './Table'

export interface AbstractDatabase {
  tables: Table[]
  tableMap: Map<string, Table>
}
