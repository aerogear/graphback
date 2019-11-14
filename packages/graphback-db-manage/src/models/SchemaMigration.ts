export interface SchemaMigration {
  id?: number
  applied_at?: Date
  changes?: string
  model?: string
  sql_up?: string
  sql_down?: string
}
