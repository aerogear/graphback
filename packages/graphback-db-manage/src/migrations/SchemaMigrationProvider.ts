import { InputModelTypeContext } from '@graphback/core';
import { GraphbackChange } from '../changes/ChangeTypes';
import { SchemaMigration } from '../models';

export interface SchemaMigrationProvider {
  addTable(t: InputModelTypeContext): string;
  alterTable(t: InputModelTypeContext, c: GraphbackChange[]): string;
  createMetadataTables(): Promise<void>;
  getMigrations(): Promise<SchemaMigration[]>;
  createMigration(migration: SchemaMigration): Promise<void>;
  applyMigration(migration: SchemaMigration): Promise<void>;
}
