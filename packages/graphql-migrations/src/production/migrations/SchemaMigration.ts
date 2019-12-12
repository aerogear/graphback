import { ModelChange } from '../changes/ChangeTypes';

/**
 * Model mapped to the schema_migrations table in the database
 *
 * @export
 * @interface SchemaMigration
 */
export interface SchemaMigration {
  id?: number
  applied_at?: Date
  changes?: string
  model?: string
  sql_up?: string
  sql_down?: string
}
