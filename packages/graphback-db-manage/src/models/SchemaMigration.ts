export interface SchemaMigration {
  id: string
  applied_at?: Date
  changes?: string
  model: string
  sql_up?: string
  sql_down?: string
}
