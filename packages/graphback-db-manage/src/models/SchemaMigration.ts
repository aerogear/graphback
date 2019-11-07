export interface SchemaMigration {
  id?: string
  applied?: boolean
  changes?: string
  model: string
  sql_up?: string
  sql_down?: string
}
