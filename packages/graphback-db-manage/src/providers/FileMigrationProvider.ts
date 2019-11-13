import { MigrationProvider } from './MigrationProvider';
import { SchemaMigration } from '../models/SchemaMigration';
import * as knex from 'knex';
import { readdirSync } from 'fs';

export interface FileMigrationProviderOptions {
  migrationsDir: string
}

export class FileMigrationProvider implements MigrationProvider {
  private migrationsDir: string;
  constructor(options: FileMigrationProviderOptions) {
    this.migrationsDir = options.migrationsDir;
  }

  public getMigrations(): Promise<SchemaMigration[]> {
    const migrationsD = readdirSync(this.migrationsDir);

    return Promise.resolve([]);
  }
}
