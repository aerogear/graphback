import { SchemaMigration } from './SchemaMigration';

/**
 * Interface for fetching, creating and applying migrations
 *
 * @export
 * @interface MigrationProvider
 */
export interface MigrationProvider {
  getMigrations(): Promise<SchemaMigration[]>;
  applyMigration(migration: SchemaMigration): Promise<void>;
  createMigration(migration: SchemaMigration): Promise<void>;
}
