import { SchemaMigration } from '../migrations/SchemaMigration';

export interface MigrationProvider {
  getMigrations(): Promise<SchemaMigration[]>;
  applyMigration(migration: SchemaMigration): Promise<void>;
  createMigration(migration: SchemaMigration): Promise<void>;
}
