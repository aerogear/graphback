import { SchemaMigration } from './models';

export interface MetadataProvider {
  createMetadataTables(): Promise<void>;
  getMigrations(): Promise<SchemaMigration[]>;
  createMigration(migration: SchemaMigration): Promise<void>;
}

